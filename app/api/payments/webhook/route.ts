import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const params = await headers()
  const signature = params.get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: unknown) {
    console.error('[WEBHOOK_ERROR]', (error as Error).message)
    return new NextResponse(`Webhook Error: ${(error as Error).message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.PaymentIntent

  if (event.type === 'payment_intent.succeeded') {
    // A payment was successfully captured. Now we create the definitive booking record.
    try {
      // Create DB booking record referencing the metadata attached during intent creation
      const metadata = session.metadata
      
      if (!metadata?.serviceId || !metadata?.customerId) {
        throw new Error('Missing metadata on PaymentIntent')
      }

      await db.booking.create({
        data: {
          userId: metadata.customerId,
          carId: metadata.carId || 'placeholder-car-id', // Assuming carId should be passed or handled
          scheduledAt: new Date(`${metadata.scheduledDate}T${metadata.scheduledTime}:00`),
          totalPrice: session.amount / 100,
          status: 'CONFIRMED',
          stripePaymentIntentId: session.id,
          address: metadata.address || 'Address provided at checkout',
          services: {
            create: {
              serviceId: metadata.serviceId,
              price: session.amount / 100,
              quantity: 1
            }
          }
          // Other properties would normally be passed via separate metadata sync or retrieved from user session
        }
      })
      
      // Optionally fire confirmation email logic here
      console.log('✅ Booking successfully confirmed and paid:', session.id)

    } catch (e: unknown) {
      console.error('[WEBHOOK_DB_ERROR]', e)
      return new NextResponse('DB Update Failed', { status: 500 })
    }
  }

  return new NextResponse('OK', { status: 200 })
}
