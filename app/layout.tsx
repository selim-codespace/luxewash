import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/layout/custom-cursor'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { ScrollProgress } from '@/components/layout/scroll-progress'
import { FloatingCTA } from '@/components/layout/floating-cta'
import { AIChatWidget } from '@/components/layout/ai-chat-widget'

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
  metadataBase: new URL('https://luxewash.com'),
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
    <html lang="en" suppressHydrationWarning className={cn(playfair.variable, dmSans.variable, jetbrainsMono.variable)}>
      <body className="antialiased font-body bg-void text-text-primary transition-colors duration-300">
        <div className="grain" />
        <Providers>
          <CustomCursor />
          <ScrollProgress />
          {children}
          <FloatingCTA />
          <AIChatWidget />
        </Providers>
      </body>
    </html>
  )
}