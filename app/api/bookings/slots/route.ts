import { NextResponse } from 'next/server'
import { getAvailableSlots } from '@/actions/booking-actions'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')

    if (!date) {
      return new NextResponse('Date is required', { status: 400 })
    }

    const slots = await getAvailableSlots(date)

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('[SLOTS_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
