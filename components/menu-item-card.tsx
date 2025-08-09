"use client"

import { motion } from "framer-motion"
import type { MenuItem } from "@/data/messes"

export function MenuItemCard({ item = defaultItem }: { item?: MenuItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border bg-card p-4 shadow-sm ${item.isSpecial ? "ring-2 ring-amber-400/60 ring-offset-2" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">{item.name}</h3>
        {item.isSpecial && (
          <span className="animate-pulse rounded-full bg-amber-400/20 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-300">
            Today&apos;s Special
          </span>
        )}
      </div>
      {item.price ? (
        <p className="mt-1 text-xs text-muted-foreground">₹{item.price}</p>
      ) : (
        <p className="mt-1 text-xs text-muted-foreground">Price varies</p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">{item.vegetarian ? "Vegetarian" : "Non-Vegetarian"}</p>
    </motion.div>
  )
}

const defaultItem: MenuItem = {
  id: "sample",
  name: "Sample Item",
  vegetarian: true,
  isSpecial: false,
}
