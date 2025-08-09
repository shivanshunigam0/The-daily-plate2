import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getMessById } from "@/data/messes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, MapPin } from "lucide-react"
import { MenuItemCard } from "@/components/menu-item-card"
import { StickyMobileCTA } from "@/components/sticky-mobile-cta"

interface PageProps {
  params: { id: string }
}

export function generateStaticParams() {
  // Pre-render some example mess pages
  return []
}

export function generateMetadata({ params }: PageProps) {
  const mess = getMessById(params.id)
  if (!mess) return {}
  return {
    title: `${mess.name} — Menu & Specials`,
    description: `Explore ${mess.name} mess menu: Breakfast, Lunch, Snacks, Dinner. Location: ${mess.location}.`,
    alternates: { canonical: `https://dailyplate.example.com/mess/${mess.id}` },
    openGraph: {
      images: [
        {
          url: mess.photo || "/placeholder.svg?height=630&width=1200",
          width: 1200,
          height: 630,
          alt: `${mess.name} mess photo`,
        },
      ],
    },
  }
}

export default function MessDetailPage({ params }: PageProps) {
  const mess = getMessById(params.id)
  if (!mess) notFound()

  const tabs = ["Breakfast", "Lunch", "Snacks", "Dinner"] as const

  return (
    <>
      <section className="container px-4 py-8 md:py-12">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div>
            <Image
              src={mess.photo || "/placeholder.svg?height=220&width=300&query=mess-exterior" || "/placeholder.svg"}
              alt={`${mess.name} exterior`}
              width={300}
              height={220}
              className="h-auto w-full rounded-2xl object-cover shadow"
            />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">{mess.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{mess.location}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${mess.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                <Phone className="h-4 w-4" />
                Call Mess
              </a>
              <Link
                href={
                  mess.mapUrl || `https://www.google.com/maps?q=${encodeURIComponent(mess.name + " " + mess.location)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Rating: <span className="font-medium">{mess.rating.toFixed(1)}</span> •{" "}
              {mess.vegetarianOnly ? "Vegetarian" : "Veg & Non-Veg"}
            </p>
          </div>
        </div>
      </section>

      <section id="menu" className="container px-4 pb-24 md:pb-16">
        <Tabs defaultValue="Breakfast" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            {tabs.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((t) => {
            const items = mess.menu[t] || []
            return (
              <TabsContent key={t} value={t} className="mt-6">
                {items.length === 0 ? (
                  <p className="text-muted-foreground">No items listed for {t}.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </section>

      <StickyMobileCTA phone={mess.phone} menuAnchorId="menu" />
    </>
  )
}
