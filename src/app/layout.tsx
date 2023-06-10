import './globals.css'
import { Recursive } from 'next/font/google' // automatically optimize your fonts (including custom fonts) and remove external network requests for improved privacy and performance.
import NavBar from './Nav/NavBar'
const recursive = Recursive({ subsets: ['latin']})

export const metadata = {
  title: 'RobTheRich',
  description: "practice nextjs app modeled after robinhood's web dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <nav>
          <NavBar />
        </nav>
        {children}
      </body>
    </html>
  )
}
