"use client"

import Link from "next/link"
import Image from "next/image"
import { Autoplay, Pagination, Navigation, EffectCoverflow, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"
import { getFeaturedMesses } from "@/data/messes"

export function FeaturedMessesCarousel() {
  const featured = getFeaturedMesses()

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectCoverflow, A11y]}
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="!pb-10"
    >
      {featured.map((m) => (
        <SwiperSlide key={m.id} className="!w-[280px] sm:!w-[320px]">
          <Link
            href={`/mess/${m.id}`}
            className="block overflow-hidden rounded-3xl border bg-card shadow hover:shadow-lg transition"
          >
            <div className="relative h-44 w-full">
              <Image
                src={m.photo || "/placeholder.svg?height=220&width=320&query=mess-exterior"}
                alt={`${m.name} exterior`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, 320px"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold">{m.name}</h3>
              <p className="text-xs text-muted-foreground">{m.location}</p>
              <p className="mt-1 text-xs">
                Rating: <span className="font-medium">{m.rating.toFixed(1)}</span>
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
