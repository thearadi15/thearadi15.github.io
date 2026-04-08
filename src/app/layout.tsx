import type { Metadata } from 'next'
import '../styles/globals.css'
export const metadata: Metadata = {
  title: 'z3r0ru135.me | Digital Universe',
  description: 'Cybersecurity researcher, software engineer & digital explorer.',
  themeColor: '#060609',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
