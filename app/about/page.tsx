import AboutPageClient from "./AboutPageClient"

export const metadata = {
  title: "About Us",
  description: "Learn how The Daily Plate helps college students discover mess menus with ease.",
  alternates: { canonical: "https://dailyplate.example.com/about" },
}

export default function AboutPage() {
  return <AboutPageClient />
}
