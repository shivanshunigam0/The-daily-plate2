"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPageClient() {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    // Demo only: you can wire this to a server action or email service
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    setSubmitting(false)
  }

  return (
    <section className="container px-4 py-10 md:py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <Input placeholder="Your Name" aria-label="Your Name" required />
              <Input type="email" placeholder="Email Address" aria-label="Email Address" required />
              <Textarea rows={5} placeholder="Message" aria-label="Message" required />
              <Button type="submit" className="rounded-xl" disabled={submitting}>
                {submitting ? "Sending..." : sent ? "Sent!" : "Send Message"}
              </Button>
              <p className="text-xs text-muted-foreground">We typically reply within 1-2 business days.</p>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>The Daily Plate</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Email: hello@thedailyplate.app</p>
              <p>Support: support@thedailyplate.app</p>
              <p>Campus: North Campus, City University</p>
            </CardContent>
          </Card>
          <div className="aspect-video w-full overflow-hidden rounded-2xl shadow">
            <iframe
              title="The Daily Plate Location"
              src="https://www.google.com/maps?q=North%20Campus%20City%20University&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
