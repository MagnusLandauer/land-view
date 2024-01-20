import type { Metadata } from "next"
import { Miriam_Libre } from "next/font/google"
import "./globals.css"
import NavMenu from "./NavMenu"
import Providers from "./Providers"

const MiriamLibre = Miriam_Libre({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

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
    <html lang="en">
      <body
        className={`dark text-foreground bg-background min-h-screen ${MiriamLibre.className}`}
      >
        <Providers>
          <NavMenu />
          <div className="p-8">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
