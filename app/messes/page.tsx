import { MessFilters } from "@/components/mess-filters"
import { MessCard } from "@/components/mess-card"
import { getAllMesses } from "@/data/messes"

export const metadata = {
  title: "All Messes — Filter and Sort",
  description: "Browse all messes with instant filters for location, meal type, vegetarian, and rating.",
  alternates: { canonical: "https://dailyplate.example.com/messes" },
}

export default function MessesPage() {
  // Initial server render uses all messes; filtering happens client-side instantly.
  const messes = getAllMesses()
  return (
    <section className="container px-4 py-10 md:py-16">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Messes Near Campus</h1>
        <p className="text-muted-foreground">
          Filter by location, meal type, vegetarian, and rating. Sort by rating or name.
        </p>
      </div>

      <MessFilters />

      <div id="results" className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {messes.map((m) => (
          <MessCard key={m.id} mess={m} />
        ))}
      </div>
    </section>
  )
}
