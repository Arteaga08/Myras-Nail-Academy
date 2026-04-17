import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { StudentAuthProvider } from '@/context/StudentAuthContext'
import { ToastProvider } from '@/components/ui/Toast'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '600', '700'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Myra's Nail Academy — Admin",
  description: 'Panel de administración',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${dmSans.variable} h-full`}>
      <body className="h-full">
        <AuthProvider>
          <StudentAuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </StudentAuthProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
