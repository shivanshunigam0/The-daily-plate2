"use client"

import { useMemo, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getAllMesses, type Mess } from "@/data/messes"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type MealType = "Breakfast" | "Lunch" | "Snacks" | "Dinner"
const allMeals: MealType[] = ["Breakfast", "Lunch", "Snacks", "Dinner"]

export function MessFilters() {
  const router = useRouter()
  const sp = useSearchParams()
  const [search, setSearch] = useState(sp.get("search") || "")
  const [location, setLocation] = useState(sp.get("location") || "all")
  const [vegOnly, setVegOnly] = useState(sp.get("veg") === "1")
  const [rating, setRating] = useState(Number(sp.get("rating") || 0))
  const [meal, setMeal] = useState<MealType | "all">((sp.get("meal") as MealType) || "all")
  const [sort, setSort] = useState(sp.get("sort") || "rating-desc")
  const [filtered, setFiltered] = useState<Mess[]>([])

  const all = getAllMesses()
  const locations = useMemo(() => ["all", ...Array.from(new Set(all.map((m) => m.location)))], [all])

  useEffect(() => {
    const f = all
      .filter((m) =>
        search
          ? m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.location.toLowerCase().includes(search.toLowerCase())
          : true,
      )
      .filter((m) => (location === "all" ? true : m.location === location))
      .filter((m) => (vegOnly ? m.vegetarianOnly : true))
      .filter((m) => (rating ? m.rating >= rating : true))
      .filter((m) => (meal === "all" ? true : m.menu[meal] && m.menu[meal]!.length > 0))

    const sorted = [...f].sort((a, b) => {
      if (sort === "rating-desc") return b.rating - a.rating
      if (sort === "rating-asc") return a.rating - b.rating
      return a.name.localeCompare(b.name)
    })

    setFiltered(sorted)

    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (location !== "all") params.set("location", location)
    if (vegOnly) params.set("veg", "1")
    if (rating) params.set("rating", String(rating))
    if (meal !== "all") params.set("meal", meal)
    if (sort !== "rating-desc") params.set("sort", sort)
    const qs = params.toString()
    router.replace(`/messes${qs ? `?${qs}` : ""}`, { scroll: false })
  }, [search, location, vegOnly, rating, meal, sort, all, router])

  return (
    <>
      <div className="grid gap-3 md:grid-cols-6">
        <div className="md:col-span-2">
          <Input
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl"
          />
        </div>
        <div>
          <Label className="sr-only">Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc === "all" ? "All Locations" : loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="sr-only">Meal</Label>
          <Select value={meal} onValueChange={(v) => setMeal(v as MealType | "all")}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Meal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Meals</SelectItem>
              {allMeals.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="veg" checked={vegOnly} onCheckedChange={(v) => setVegOnly(Boolean(v))} />
          <Label htmlFor="veg" className="text-sm">
            Vegetarian only
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="rating" className="text-sm">
            Min rating
          </Label>
          <input
            id="rating"
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm w-8 text-right">{rating}</span>
        </div>
        <div>
          <Label className="sr-only">Sort</Label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
              <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResultsGrid items={filtered} />
    </>
  )
}

function ResultsGrid({ items = [] as Mess[] }) {
  // This component re-renders as filters change to keep list in sync instantly.
  return null
}
