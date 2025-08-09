import ContactPageClient from "./ContactPageClient"

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with The Daily Plate team. We’d love to hear your feedback and suggestions.",
  alternates: { canonical: "https://dailyplate.example.com/contact" },
}

export default function ContactPage() {
  return <ContactPageClient />
}
