"use client"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}

export default Providers
