"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Utensils, Plus, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const nav = [
  { href: "/messes", label: "Messes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Utensils className="h-5 w-5" />
            <span className="text-base">The Daily Plate</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm transition hover:opacity-80 ${
                pathname === n.href ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/add-mess">
            <Button className="hidden rounded-xl md:inline-flex" size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Mess
            </Button>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-8 grid gap-4">
                {nav.map((n) => (
                  <Link key={n.href} href={n.href} className="text-base" onClick={() => setOpen(false)}>
                    {n.label}
                  </Link>
                ))}
                <Link href="/add-mess" onClick={() => setOpen(false)}>
                  <Button className="mt-4 w-full rounded-xl">
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Mess
                  </Button>
                </Link>
                <a href="tel:+15551234567" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" /> Emergency Contact
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
