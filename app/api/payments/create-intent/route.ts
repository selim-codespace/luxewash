import { NextResponse } from 'next/server'
import { createBookingIntent } from '@/actions/booking-actions'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { amount, serviceId, date, time } = body

    if (!amount || !serviceId || !date || !time) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const { clientSecret } = await createBookingIntent({
      amount,
      serviceId,
      customerId: session.user.id,
      date,
      time,
    })

    return NextResponse.json({ clientSecret })
  } catch (error: unknown) {
    console.error('[STRIPE_INTENT_ERROR]', error)
    return new NextResponse((error as Error).message || 'Internal Error', { status: 500 })
  }
}
