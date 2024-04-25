import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const popins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'To Do List App',
  description: 'To Do List App',
}

export default function RootLayout({
  children,
  header,
}: Readonly<{
  children: React.ReactNode
  header: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${popins.className} min-w-64 bg-secondary`}>
        {header}
        {children}
        <Toaster richColors closeButton position="top-center" theme="light" />
      </body>
    </html>
  )
}
