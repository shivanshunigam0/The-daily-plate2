"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchBar({ defaultQuery = "" }: { defaultQuery?: string }) {
  const [q, setQ] = useState(defaultQuery)
  const router = useRouter()
  return (
    <div className="flex items-center gap-2">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search mess name or location..."
        aria-label="Search mess name or location"
        className="h-11 rounded-xl"
      />
      <Button className="h-11 rounded-xl" onClick={() => router.push(`/messes?search=${encodeURIComponent(q)}`)}>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  )
}
