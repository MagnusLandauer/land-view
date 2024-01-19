import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavMenu from "./NavMenu"
import AuthProvider from "./AuthProvider"
import ReactQueryClientProvider from "./ReactQueryClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Land View",
  description: "A country comparison tool",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`bg-slate-200 ${inter.className}`}>
          <ReactQueryClientProvider>
            <NavMenu />
            {children}
          </ReactQueryClientProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
