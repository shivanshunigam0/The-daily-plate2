"use server"

import { revalidatePath } from "next/cache"
import { addMess } from "@/data/messes"

export async function addMessAction(input: {
  name: string
  address: string
  location: string
  phone: string
  mapUrl?: string
  photo?: string
  vegetarianOnly?: boolean
  menuText: {
    Breakfast: string
    Lunch: string
    Snacks: string
    Dinner: string
  }
}) {
  // Parse text into items
  function parseItems(text: string) {
    return text
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((label, idx) => ({
        id: `${Date.now()}-${idx}`,
        name: label,
        price: undefined as number | undefined,
        isSpecial: idx === 0 && Math.random() > 0.5, // Occasionally mark the first item special
        vegetarian: true,
      }))
  }

  const mess = addMess({
    name: input.name,
    address: input.address,
    location: input.location,
    phone: input.phone,
    mapUrl: input.mapUrl,
    photo: input.photo,
    vegetarianOnly: Boolean(input.vegetarianOnly),
    menu: {
      Breakfast: parseItems(input.menuText.Breakfast || ""),
      Lunch: parseItems(input.menuText.Lunch || ""),
      Snacks: parseItems(input.menuText.Snacks || ""),
      Dinner: parseItems(input.menuText.Dinner || ""),
    },
  })

  revalidatePath("/messes")
  return { id: mess.id }
}
