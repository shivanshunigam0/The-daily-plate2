"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted)
    return (
      <Button variant="ghost" size="icon" className="rounded-xl" aria-label="Toggle theme">
        <Sun className="h-4 w-4" />
      </Button>
    )
  const isDark = theme === "dark"
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-xl"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
