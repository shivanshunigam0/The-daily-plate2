"use client"

import { FreeMode, Autoplay, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import { getDailyHighlights } from "@/data/messes"
import { Badge } from "@/components/ui/badge"

export function HighlightsCarousel() {
  const highlights = getDailyHighlights()

  return (
    <Swiper
      modules={[FreeMode, Autoplay, A11y]}
      freeMode
      slidesPerView={2.2}
      spaceBetween={12}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 3.2, spaceBetween: 16 },
        768: { slidesPerView: 4.2, spaceBetween: 18 },
        1024: { slidesPerView: 5.2, spaceBetween: 20 },
      }}
      className="!pb-4"
    >
      {highlights.map((h) => (
        <SwiperSlide key={`${h.messId}-${h.name}`} className="!h-auto">
          <div className="h-full rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{h.name}</h3>
              {h.meal && (
                <Badge variant="secondary" className="rounded-full">
                  {h.meal}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{h.messName}</p>
            {h.isSpecial && <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">Today&apos;s Special</p>}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
