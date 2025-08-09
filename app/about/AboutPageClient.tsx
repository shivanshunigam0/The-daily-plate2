"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPageClient() {
  const fade = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }
  return (
    <section className="container px-4 py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade}>
          <h1 className="text-3xl md:text-4xl font-bold">About The Daily Plate</h1>
          <p className="mt-4 text-muted-foreground">
            We are a student-first platform that makes finding campus mess menus fast, intuitive, and fun.
          </p>
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Our Mission</h2>
              <p className="text-muted-foreground">
                Empower students with transparent, real-time access to mess menus and specials around campus.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Our Vision</h2>
              <p className="text-muted-foreground">
                A connected food community where students make informed, healthy, and budget-friendly choices daily.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">How We Help</h2>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Instant search across multiple messes.</li>
                <li>Daily highlights and specials at a glance.</li>
                <li>Filters by location, meal type, vegetarian, and rating.</li>
              </ul>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          <Image
            src="/placeholder.svg?height=540&width=680"
            alt="Students collaborating on a food community project"
            width={680}
            height={540}
            className="rounded-3xl shadow-xl ring-1 ring-border"
          />
        </motion.div>
      </div>
    </section>
  )
}
