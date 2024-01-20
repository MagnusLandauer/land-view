"use client"
import React from "react"
import AuthProvider from "./AuthProvider"
import { NextUIProvider } from "@nextui-org/react"
import ReactQueryClientProvider from "./ReactQueryClientProvider"

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <NextUIProvider>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </NextUIProvider>
    </AuthProvider>
  )
}

export default Providers
