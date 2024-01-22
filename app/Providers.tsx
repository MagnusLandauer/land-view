"use client"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemeProvider } from "next-themes"

interface ProvidersProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemeProvider attribute="class" defaultTheme="dark">
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </NextThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}

export default Providers
