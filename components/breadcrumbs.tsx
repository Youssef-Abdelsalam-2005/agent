"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export default function Breadcrumbs() {
  const pathname = usePathname()

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = [{ name: "Spaces", href: "/" }]

    if (segments.length > 0) {
      segments.forEach((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const name = segment.charAt(0).toUpperCase() + segment.slice(1)
        breadcrumbs.push({ name, href })
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="size-3" />}
          <Link
            href={crumb.href}
            className={index === breadcrumbs.length - 1 ? "text-zinc-100" : "hover:text-zinc-200"}
          >
            {crumb.name}
          </Link>
        </div>
      ))}
    </nav>
  )
}
