import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/context/AuthContext'
import ChatWidget from '@/components/common/ChatWidget'
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'GoRide Premium | Elite Motorcycle Journeys & Rentals',
  description: 'Experience the ultimate freedom with Vietnam\'s most exclusive motorcycle rental fleet. GoRide Premium offers state-of-the-art vehicles, 24/7 concierge support, and seamless digital booking.',
  keywords: 'luxury motorcycle rental, premium bike hire vietnam, elite travel quy nhon, goride premium',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${outfit.variable} scroll-smooth`}>
      <body className="antialiased font-sans selection:bg-cta selection:text-white">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  )
}
