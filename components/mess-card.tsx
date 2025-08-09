"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin } from "lucide-react"
import type { Mess } from "@/data/messes"
import { motion } from "framer-motion"

export function MessCard({ mess }: { mess: Mess }) {
  const phoneHref = `tel:${mess.phone}`
  const directionsHref =
    mess.mapUrl || `https://www.google.com/maps?q=${encodeURIComponent(mess.name + " " + mess.location)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl border bg-card shadow-sm hover:shadow-lg"
    >
      <Link href={`/mess/${mess.id}`} className="relative block">
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={mess.photo || "/placeholder.svg?height=260&width=400&query=mess-exterior"}
            alt={`${mess.name} mess`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold leading-tight">
              <Link href={`/mess/${mess.id}`} className="hover:underline">
                {mess.name}
              </Link>
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {mess.location}
            </p>
          </div>
          <div className="rounded-full bg-muted px-2 py-1 text-xs">{mess.rating.toFixed(1)}</div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <a
            href={phoneHref}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            <MapPin className="h-3.5 w-3.5" />
            Directions
          </a>
          <Link href={`/mess/${mess.id}`} className="ml-auto text-xs font-medium underline underline-offset-4">
            View Menu
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
