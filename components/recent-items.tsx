"use client"

import { useEffect, useState } from "react"
import { Clock, FileText, LinkIcon, File } from "lucide-react"
import Image from "next/image"

type RecentItem = {
  id: string
  name: string
  type: "image" | "pdf" | "other" | "link" | "document"
  url?: string
  uploadedAt: Date
  note?: string
  preview?: string
}

export default function RecentItems() {
  const [items, setItems] = useState<RecentItem[]>([])

  useEffect(() => {
    // Mock recent items with enhanced previews
    const mockItems: RecentItem[] = [
      {
        id: "1",
        name: "Project Proposal",
        type: "pdf",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 30),
        note: "Q4 planning document with budget breakdown",
      },
      {
        id: "2",
        name: "Design System",
        type: "image",
        url: "/placeholder.svg?height=400&width=600&text=Design+System+Mockup",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        note: "Updated component library mockups",
      },
      {
        id: "3",
        name: "Vercel AI SDK",
        type: "link",
        url: "https://sdk.vercel.ai",
        preview: "/placeholder.svg?height=200&width=400&text=Vercel+AI+SDK+Documentation",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
        note: "AI SDK documentation for reference",
      },
      {
        id: "4",
        name: "Meeting Notes",
        type: "document",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
        note: "Weekly team sync notes and action items",
      },
    ]
    setItems(mockItems)
  }, [])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center gap-2">
        <Clock className="size-4 text-zinc-400" />
        <h2 className="font-display text-md text-zinc-100">{"Recent uploads"}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur hover:bg-black/30 transition-all cursor-pointer"
          >
            <div className="aspect-square w-full bg-zinc-900/20 flex items-center justify-center">
              {item.type === "image" && item.url ? (
                <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              ) : item.type === "link" && item.preview ? (
                <div className="relative w-full h-full">
                  <Image src={item.preview || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <LinkIcon className="size-8 text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-400">
                  {item.type === "pdf" ? (
                    <FileText className="size-12" />
                  ) : item.type === "document" ? (
                    <File className="size-12" />
                  ) : (
                    <File className="size-12" />
                  )}
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-medium text-zinc-100 truncate">{item.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{formatTimeAgo(item.uploadedAt)}</p>
              {item.note && <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{item.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}
