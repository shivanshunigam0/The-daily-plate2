export type MealName = "Breakfast" | "Lunch" | "Snacks" | "Dinner"

export interface MenuItem {
  id: string
  name: string
  price?: number
  isSpecial?: boolean
  vegetarian: boolean
}

export interface Mess {
  id: string
  name: string
  address: string
  location: string
  phone: string
  mapUrl?: string
  photo?: string
  vegetarianOnly: boolean
  rating: number
  menu: Partial<Record<MealName, MenuItem[]>>
}

// In-memory dataset (demo). Replace with a database for production.
let messes: Mess[] = [
  {
    id: "sunrise-hostel",
    name: "Sunrise Hostel Mess",
    address: "12 College Rd, North Campus",
    location: "North Campus",
    phone: "+15551230001",
    mapUrl: "https://www.google.com/maps?q=Sunrise+Hostel+Mess",
    photo: "/placeholder.svg?height=260&width=400",
    vegetarianOnly: false,
    rating: 4.5,
    menu: {
      Breakfast: [
        { id: "b1", name: "Masala Dosa", vegetarian: true, isSpecial: true, price: 40 },
        { id: "b2", name: "Idli Sambar", vegetarian: true, price: 30 },
      ],
      Lunch: [
        { id: "l1", name: "Paneer Butter Masala", vegetarian: true, isSpecial: true, price: 80 },
        { id: "l2", name: "Dal Tadka", vegetarian: true, price: 50 },
      ],
      Snacks: [
        { id: "s1", name: "Samosa", vegetarian: true, price: 15 },
        { id: "s2", name: "Veg Sandwich", vegetarian: true, price: 35 },
      ],
      Dinner: [
        { id: "d1", name: "Veg Biryani", vegetarian: true, isSpecial: true, price: 90 },
        { id: "d2", name: "Chicken Curry", vegetarian: false, price: 110 },
      ],
    },
  },
  {
    id: "green-leaf",
    name: "Green Leaf Mess",
    address: "5 Central Ave, East Campus",
    location: "East Campus",
    phone: "+15551230002",
    photo: "/placeholder.svg?height=260&width=400",
    vegetarianOnly: true,
    rating: 4.2,
    menu: {
      Breakfast: [
        { id: "gb1", name: "Poha", vegetarian: true, price: 25 },
        { id: "gb2", name: "Upma", vegetarian: true, isSpecial: true, price: 25 },
      ],
      Lunch: [{ id: "gl1", name: "Veg Thali", vegetarian: true, price: 70 }],
      Dinner: [{ id: "gd1", name: "Palak Paneer", vegetarian: true, price: 85 }],
    },
  },
  {
    id: "hostel-block-a",
    name: "Hostel Block A Mess",
    address: "Block A, South Campus",
    location: "South Campus",
    phone: "+15551230003",
    photo: "/placeholder.svg?height=260&width=400",
    vegetarianOnly: false,
    rating: 4.0,
    menu: {
      Breakfast: [{ id: "hb1", name: "Aloo Paratha", vegetarian: true, price: 35 }],
      Lunch: [{ id: "hb2", name: "Egg Curry", vegetarian: false, price: 70 }],
      Snacks: [{ id: "hb3", name: "Maggi", vegetarian: true, isSpecial: true, price: 25 }],
      Dinner: [{ id: "hb4", name: "Rajma Rice", vegetarian: true, price: 60 }],
    },
  },
  {
    id: "city-cafe-mess",
    name: "City Cafe Mess",
    address: "Main Street, West Campus",
    location: "West Campus",
    phone: "+15551230004",
    photo: "/placeholder.svg?height=260&width=400",
    vegetarianOnly: false,
    rating: 4.6,
    menu: {
      Breakfast: [{ id: "cc1", name: "Chole Bhature", vegetarian: true, isSpecial: true, price: 55 }],
      Lunch: [{ id: "cc2", name: "Butter Chicken", vegetarian: false, price: 120 }],
      Snacks: [{ id: "cc3", name: "Paneer Tikka Wrap", vegetarian: true, price: 50 }],
      Dinner: [{ id: "cc4", name: "Veg Pulao", vegetarian: true, price: 70 }],
    },
  },
  {
    id: "campus-delights",
    name: "Campus Delights Mess",
    address: "Opp. Library, Central Campus",
    location: "Central Campus",
    phone: "+15551230005",
    photo: "/placeholder.svg?height=260&width=400",
    vegetarianOnly: false,
    rating: 4.3,
    menu: {
      Breakfast: [{ id: "cd1", name: "Pancakes", vegetarian: true, price: 45 }],
      Lunch: [{ id: "cd2", name: "Veg Korma", vegetarian: true, price: 80 }],
      Snacks: [{ id: "cd3", name: "Fries", vegetarian: true, price: 30 }],
      Dinner: [{ id: "cd4", name: "Grilled Fish", vegetarian: false, price: 140 }],
    },
  },
  {
    id: "hostel-block-c",
    name: "Hostel Block C Mess",
    address: "Block C, North Campus",
    location: "North Campus",
    phone: "+15551230006",
    photo: "/placeholder.svg?height=260&width=400",
    vegetarianOnly: true,
    rating: 3.9,
    menu: {
      Breakfast: [{ id: "hc1", name: "Idiyappam", vegetarian: true, price: 40 }],
      Lunch: [{ id: "hc2", name: "Veg Pulao", vegetarian: true, price: 70 }],
      Dinner: [{ id: "hc3", name: "Dal Makhani", vegetarian: true, isSpecial: true, price: 85 }],
    },
  },
]

export function getAllMesses() {
  return messes
}

export function getFeaturedMesses() {
  return messes.slice(0, 5)
}

export function getMessById(id: string) {
  return messes.find((m) => m.id === id)
}

export function getDailyHighlights() {
  // Collect current specials
  const items = [] as { messId: string; messName: string; name: string; meal?: string; isSpecial?: boolean }[]
  for (const m of messes) {
    for (const key of ["Breakfast", "Lunch", "Snacks", "Dinner"] as const) {
      const list = m.menu[key] || []
      for (const it of list) {
        if (it.isSpecial) {
          items.push({ messId: m.id, messName: m.name, name: it.name, meal: key, isSpecial: true })
        }
      }
    }
  }
  // If none marked, pick a few
  if (items.length === 0) {
    for (const m of messes.slice(0, 3)) {
      const any = m.menu.Breakfast?.[0] || m.menu.Lunch?.[0] || m.menu.Dinner?.[0]
      if (any) items.push({ messId: m.id, messName: m.name, name: any.name, meal: "Lunch", isSpecial: false })
    }
  }
  return items
}

export function addMess(input: {
  name: string
  address: string
  location: string
  phone: string
  mapUrl?: string
  photo?: string
  vegetarianOnly?: boolean
  menu: Partial<Record<MealName, MenuItem[]>>
}) {
  const slug =
    input.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 6)
  const mess: Mess = {
    id: slug,
    name: input.name,
    address: input.address,
    location: input.location,
    phone: input.phone,
    mapUrl: input.mapUrl,
    photo: input.photo,
    vegetarianOnly: Boolean(input.vegetarianOnly),
    rating: 4.0,
    menu: input.menu,
  }
  messes = [mess, ...messes]
  return mess
}
