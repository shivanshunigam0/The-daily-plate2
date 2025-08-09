"use client"

import { Phone, BookOpen } from "lucide-react"

export function StickyMobileCTA({
  phone = "",
  menuAnchorId = "menu",
}: {
  phone?: string
  menuAnchorId?: string
}) {
  if (!phone) return null
  function scrollToMenu() {
    const el = document.getElementById(menuAnchorId)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 block border-t bg-background/95 p-3 shadow-2xl backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={`tel:${phone}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Phone className="h-4 w-4" />
          Call Mess
        </a>
        <button
          onClick={scrollToMenu}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold"
        >
          <BookOpen className="h-4 w-4" />
          View Menu
        </button>
      </div>
    </div>
  )
}
