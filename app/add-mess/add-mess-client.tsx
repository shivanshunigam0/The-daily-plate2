"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addMessAction } from "@/app/actions/add-mess"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  location: z.string().min(2, "Location is required"),
  phone: z.string().min(7, "Phone is required"),
  mapUrl: z.string().url("Enter a valid Google Maps link").optional().or(z.literal("")),
  photo: z.string().url("Enter a valid image URL").optional().or(z.literal("")),
  vegetarianOnly: z.enum(["yes", "no"]).default("no"),
  breakfast: z.string().optional(),
  lunch: z.string().optional(),
  snacks: z.string().optional(),
  dinner: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function AddMessClient() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) })

  async function onSubmit(values: FormValues) {
    setSubmitting(true)
    try {
      const res = await addMessAction({
        name: values.name,
        address: values.address,
        location: values.location,
        phone: values.phone,
        mapUrl: values.mapUrl || undefined,
        photo: values.photo || undefined,
        vegetarianOnly: values.vegetarianOnly === "yes",
        menuText: {
          Breakfast: values.breakfast || "",
          Lunch: values.lunch || "",
          Snacks: values.snacks || "",
          Dinner: values.dinner || "",
        },
      })
      if (res?.id) {
        router.push(`/mess/${res.id}`)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="container px-4 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Add Your Mess</h1>
      <p className="text-muted-foreground mb-8">
        Submit your mess details and daily menu. Use a Google Maps link for easy directions.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Mess Name</Label>
              <Input id="name" placeholder="Sunrise Hostels Mess" {...register("name")} />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Area / Location</Label>
              <Input id="location" placeholder="North Campus" {...register("location")} />
              {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 College Road, Block A" {...register("address")} />
              {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+1 555 123 4567" {...register("phone")} />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mapUrl">Google Maps Link</Label>
              <Input id="mapUrl" placeholder="https://maps.google.com/?q=Your+Mess" {...register("mapUrl")} />
              {errors.mapUrl && <p className="text-sm text-red-600">{errors.mapUrl.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="photo">Featured Image URL</Label>
              <Input id="photo" placeholder="https://..." {...register("photo")} />
              {errors.photo && <p className="text-sm text-red-600">{errors.photo.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label>Vegetarian Only?</Label>
              <Select defaultValue="no" onValueChange={(v) => setValue("vegetarianOnly", v as "yes" | "no")}>
                <SelectTrigger>
                  <SelectValue placeholder="No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Menu Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="breakfast">Breakfast (comma separated)</Label>
              <Textarea id="breakfast" rows={3} placeholder="Poha, Upma, Idli Sambar" {...register("breakfast")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lunch">Lunch (comma separated)</Label>
              <Textarea id="lunch" rows={3} placeholder="Dal Tadka, Rice, Roti, Paneer Curry" {...register("lunch")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="snacks">Evening Snacks (comma separated)</Label>
              <Textarea id="snacks" rows={3} placeholder="Samosa, Maggi, Sandwich" {...register("snacks")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dinner">Dinner (comma separated)</Label>
              <Textarea id="dinner" rows={3} placeholder="Veg Biryani, Raita, Roti" {...register("dinner")} />
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Button type="submit" size="lg" disabled={submitting} className="rounded-xl">
            {submitting ? "Submitting..." : "Submit Mess"}
          </Button>
        </div>
      </form>
    </section>
  )
}
