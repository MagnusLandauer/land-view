"use client"
import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { CgDarkMode } from "react-icons/cg"
import { Button } from "@nextui-org/react"

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div>
      <Button
        variant="light"
        color="default"
        size="sm"
        isIconOnly
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <CgDarkMode className="text-2xl" />
      </Button>
    </div>
  )
}

export default ThemeSwitcher
