import Image from "next/image"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { FeaturedMessesCarousel } from "@/components/featured-messes-carousel"
import { HighlightsCarousel } from "@/components/highlights-carousel"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Find Your Mess Menu in Seconds",
  description:
    "Explore college mess menus nearby with The Daily Plate. Browse featured messes, daily highlights, and search instantly.",
  alternates: { canonical: "https://dailyplate.example.com/" },
}

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[-6rem] -z-10 transform-gpu blur-3xl"
        >
          <div
            className={cn(
              "mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-primary/30 to-emerald-300/30 opacity-40",
              "rotate-[30deg] rounded-[100%] blur-3xl",
            )}
          />
        </div>

        <div className="container px-4 py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Find Your Mess Menu in Seconds
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Discover nearby college mess menus. Save time, eat better, and never miss today&apos;s specials.
              </p>
              <div className="max-w-xl">
                <SearchBar />
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/messes"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Explore Messes
                </Link>
                <Link
                  href="/add-mess"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-input bg-background px-6 text-sm font-medium shadow-sm transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Add Your Mess
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=520&width=640"
                alt="Students enjoying meals in a college mess hall"
                width={640}
                height={520}
                className="rounded-3xl shadow-xl ring-1 ring-border"
                priority
              />
              <div className="absolute -bottom-6 -left-6 hidden rotate-2 rounded-2xl bg-background/80 p-4 shadow md:block">
                <p className="text-sm">Trending: Paneer Tikka Wraps, Masala Dosa, Veg Biryani</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-messes" className="py-10 md:py-16">
        <div className="container px-4">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 id="featured-messes" className="text-2xl md:text-3xl font-bold">
                Featured Messes Near You
              </h2>
              <p className="text-muted-foreground">Smooth coverflow carousel with swipe and autoplay.</p>
            </div>
            <Link href="/messes" className="text-sm font-medium underline underline-offset-4 hover:opacity-80">
              View all
            </Link>
          </div>
          <FeaturedMessesCarousel />
        </div>
      </section>

      <section aria-labelledby="daily-highlights" className="py-10 md:py-16 bg-muted/40">
        <div className="container px-4">
          <div className="mb-6">
            <h2 id="daily-highlights" className="text-2xl md:text-3xl font-bold">
              Daily Highlights
            </h2>
            <p className="text-muted-foreground">Popular breakfast, lunch, and dinner picks today.</p>
          </div>
          <HighlightsCarousel />
        </div>
      </section>
    </>
  )
}
