import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Webfit Solutions Limited | Software & Digital Solutions in New Zealand',
  description: 'Webfit Solutions is a 100% Kiwi-based software partner in Auckland, New Zealand. We build custom web, mobile and SaaS solutions that help Kiwi businesses grow — from strategy to launch.',
  keywords: ['Webfit Solutions', 'software development New Zealand', 'Auckland software company', 'web development NZ', 'custom software Kiwi', 'mobile app development Auckland', 'digital solutions New Zealand'],
  authors: [{ name: 'Webfit Solutions Limited' }],
  openGraph: {
    title: 'Webfit Solutions Limited | 100% Kiwi Software Partner',
    description: 'Custom software, web and mobile solutions built in New Zealand for real business needs.',
    url: 'https://webfitt.com',
    siteName: 'Webfit Solutions Limited',
    locale: 'en_NZ',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: '#0a66c2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
