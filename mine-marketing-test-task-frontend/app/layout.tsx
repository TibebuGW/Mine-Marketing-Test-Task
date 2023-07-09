import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mine Marketing Test Task',
  description: 'Test Task by Tibebu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
