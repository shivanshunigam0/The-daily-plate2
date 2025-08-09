import AddMessClient from "./add-mess-client"

export const metadata = {
  title: "Add Mess",
  description: "Mess owners can add their mess details and menus to The Daily Plate.",
  alternates: { canonical: "https://dailyplate.example.com/add-mess" },
}

export default function AddMessPage() {
  return <AddMessClient />
}
