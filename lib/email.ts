import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not defined')
}

export const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder')

const FROM_EMAIL = 'LuxeWash <noreply@luxewash.com>'

export async function sendBookingConfirmation(email: string, bookingRef: string, date: string, serviceName: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Booking Confirmed: ${serviceName} - ${bookingRef}`,
    html: `
      <div>
        <h1>Your booking is confirmed!</h1>
        <p>Reference: <strong>${bookingRef}</strong></p>
        <p>Date: ${date}</p>
        <p>Service: ${serviceName}</p>
        <p>Our detailer will arrive at your location within the 30-minute arrival window.</p>
        <br/>
        <p>The LuxeWash Team</p>
      </div>
    `,
  })
}

export async function sendWelcomeEmail(email: string, name: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Welcome to the Luxe Club',
    html: `
      <div>
        <h1>Welcome, ${name}.</h1>
        <p>Thank you for joining LuxeWash. The ultimate detailing experience awaits.</p>
      </div>
    `,
  })
}
