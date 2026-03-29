'use server'

import { db } from '@/lib/db'
import { redis } from '@/lib/redis'
import { stripe } from '@/lib/stripe'
import { revalidatePath } from 'next/cache'

// Helper to generate 30-min time slots for a given day (e.g. 08:00 to 18:00)
function generateDaySlots() {
  const slots = []
  for (let h = 8; h <= 17; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`)
    slots.push(`${h.toString().padStart(2, '0')}:30`)
  }
  return slots
}

export async function getAvailableSlots(dateString: string) {
  // 1. Generate all possible slots
  const allSlots = generateDaySlots()
  
  // 2. Fetch existing bookings for this date
  const bookings = await db.booking.findMany({
    where: {
      scheduledDate: new Date(dateString),
      status: { notIn: ['CANCELLED'] }
    },
    select: {
      scheduledTime: true
    }
  })

  // 3. Convert booked times into a Set for fast lookup
  const bookedSet = new Set(bookings.map(b => b.scheduledTime))

  // 4. Also check Redis for slots that are currently "locked" (in-checkout process)
  // We'll scan keys like "slot_lock:{date}:{time}"
  const lockedKeysStream = redis.scanIterator({ match: `slot_lock:${dateString}:*` })
  const lockedSet = new Set<string>()
  for await (const key of lockedKeysStream) {
    const time = key.split(':').pop()
    if (time) lockedSet.add(time)
  }

  // 5. Filter out booked and locked slots
  const available = allSlots.filter(s => !bookedSet.has(s) && !lockedSet.has(s))

  return available
}

export async function lockSlot(dateString: string, time: string, customerId: string) {
  const key = `slot_lock:${dateString}:${time}`
  
  // Check if someone else already locked it
  const existing = await redis.get(key)
  if (existing && existing !== customerId) {
    throw new Error('Slot is currently being reserved by someone else.')
  }

  // Lock it for 10 minutes (600 seconds)
  await redis.setex(key, 600, customerId)
  return true
}

export async function createBookingIntent(data: {
  amount: number,
  serviceId: string,
  customerId: string,
  date: string,
  time: string,
}) {
  try {
    // 1. Verify standard slot lock is held by this customer (or acquire it)
    await lockSlot(data.date, data.time, data.customerId)

    // 2. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // convert to cents
      currency: 'usd',
      metadata: {
        serviceId: data.serviceId,
        customerId: data.customerId,
        scheduledDate: data.date,
        scheduledTime: data.time,
      },
      automatic_payment_methods: { enabled: true }
    })

    return { clientSecret: paymentIntent.client_secret }
  } catch (error: any) {
    console.error('Failed to create booking intent', error)
    throw new Error(error.message || 'Failed to initialize payment')
  }
}

export async function confirmBookingInDB(
  paymentIntentId: string, 
  bookingData: any
) {
  try {
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId)
    
    if (pi.status !== 'succeeded') {
      throw new Error('Payment not succeeded')
    }

    const booking = await db.booking.create({
      data: {
        userId: pi.metadata.customerId,
        serviceId: pi.metadata.serviceId,
        scheduledDate: new Date(pi.metadata.scheduledDate),
        scheduledTime: pi.metadata.scheduledTime,
        totalPrice: pi.amount / 100,
        status: 'CONFIRMED',
        paymentIntentId: paymentIntentId,
        address: bookingData.address,
        locationLat: bookingData.locationLat,
        locationLng: bookingData.locationLng,
        instructions: bookingData.instructions,
      }
    })

    // Optionally: remove the Redis lock now that it's permanently in DB
    await redis.del(`slot_lock:${pi.metadata.scheduledDate}:${pi.metadata.scheduledTime}`)
    
    revalidatePath('/booking')
    return { success: true, bookingId: booking.id }

  } catch (error) {
    console.error('DB Confirmation failed', error)
    return { success: false }
  }
}
