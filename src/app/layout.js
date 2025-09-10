import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MindSpace - Neural Wellness Platform',
  description: 'Your AI-powered mental health companion for neural wellness and mindful living.',
  icons: {
    icon: '/webbg.png',
    shortcut: '/webbg.png',
    apple: '/webbg.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/webbg.png" type="image/png" />
        <link rel="shortcut icon" href="/webbg.png" type="image/png" />
        <link rel="apple-touch-icon" href="/webbg.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}