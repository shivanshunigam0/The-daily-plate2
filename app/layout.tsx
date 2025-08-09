import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://dailyplate.example.com"),
  title: {
    default: "The Daily Plate | Find Your Mess Menu in Seconds",
    template: "%s | The Daily Plate",
  },
  description:
    "The Daily Plate is a food community for college students to discover mess menus nearby. Browse mess lists, daily highlights, and menus by meal.",
  keywords: ["Mess Menu", "College Food", "Daily Plate", "Campus Mess", "Student Meals", "Hostel Mess"],
  openGraph: {
    title: "The Daily Plate — Find Your Mess Menu in Seconds",
    description: "Discover mess menus around your college. Filters, highlights, specials, and more.",
    url: "https://dailyplate.example.com",
    siteName: "The Daily Plate",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "The Daily Plate — College Mess Menus and Highlights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Daily Plate — Find Your Mess Menu in Seconds",
    description: "Discover mess menus around your college. Filters, highlights, specials, and more.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://dailyplate.example.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // SEO: Next.js App Router uses the Metadata API to manage <head>, improving SEO and shareability. [^1]
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          {/* JSON-LD: Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "The Daily Plate",
                url: "https://dailyplate.example.com",
                logo: "https://dailyplate.example.com/placeholder.svg?height=128&width=128&query=the-daily-plate-logo",
                sameAs: ["https://instagram.com/thedailyplate", "https://twitter.com/thedailyplate"],
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
