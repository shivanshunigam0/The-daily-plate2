import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t bg-muted/30">
      <div className="container grid gap-8 px-4 py-10 md:grid-cols-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">The Daily Plate</h3>
          <p className="text-sm text-muted-foreground">
            Find mess menus across campus. Quick, fresh, and student-friendly.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/messes" className="hover:underline">
                Messes
              </Link>
            </li>
            <li>
              <Link href="/add-mess" className="hover:underline">
                Add Mess
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Email: hello@thedailyplate.app</li>
            <li>Support: support@thedailyplate.app</li>
            <li>North Campus, City University</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Follow</h4>
          <div className="flex gap-3">
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Daily Plate. All rights reserved.
      </div>
    </footer>
  )
}
