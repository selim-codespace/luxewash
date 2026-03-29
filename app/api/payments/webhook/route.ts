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
  } catch (error: any) {
    console.error('[WEBHOOK_ERROR]', error.message)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
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
          serviceId: metadata.serviceId,
          scheduledDate: new Date(metadata.scheduledDate),
          scheduledTime: metadata.scheduledTime,
          totalPrice: session.amount / 100,
          status: 'CONFIRMED',
          paymentIntentId: session.id,
          // Other properties would normally be passed via separate metadata sync or retrieved from user session
        }
      })
      
      // Optionally fire confirmation email logic here
      console.log('✅ Booking successfully confirmed and paid:', session.id)

    } catch (e: any) {
      console.error('[WEBHOOK_DB_ERROR]', e)
      return new NextResponse('DB Update Failed', { status: 500 })
    }
  }

  return new NextResponse('OK', { status: 200 })
}
