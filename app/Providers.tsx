"use client"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { createContext, useState } from "react"

interface ProvidersProps {
  children: React.ReactNode
}

interface Settings {
  temp_unit: "C" | "F"
  time_format: string
}

interface SettingsContextProps {
  settings: Settings
  setSettings: React.Dispatch<React.SetStateAction<Settings>>
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
)

const queryClient = new QueryClient()

const Providers = ({ children }: ProvidersProps) => {
  const [settings, setSettings] = useState<Settings>({
    temp_unit: "C",
    time_format: "24",
  })
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemeProvider attribute="class" defaultTheme="dark">
          <SettingsContext.Provider value={{ settings, setSettings }}>
            <QueryClientProvider client={queryClient}>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </SettingsContext.Provider>
        </NextThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}

export default Providers
