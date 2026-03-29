import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['monospace'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | LuxeWash',
    default: 'Premium Car Wash & Detailing | LuxeWash',
  },
  description: 'A cinematic, ultra-premium digital experience for car washing & detailing services. We come to you.',
  openGraph: {
    title: 'Premium Car Wash & Detailing | LuxeWash',
    description: 'We come to you. Book your premium detailing session today.',
    url: 'https://luxewash.com',
    siteName: 'LuxeWash',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(playfair.variable, dmSans.variable, jetbrainsMono.variable)}>
      <body className="antialiased font-body bg-void text-text-primary">
        <div className="grain" />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
