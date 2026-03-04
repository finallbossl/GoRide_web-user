import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/context/AuthContext'

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-cta selection:text-white">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
