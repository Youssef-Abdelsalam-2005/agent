"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function CreateSpaceButton() {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70 px-4 py-2 text-sm text-zinc-100 ring-1 ring-white/10 backdrop-blur"
    >
      <span className="relative inline-flex h-3 w-3 items-center justify-center">
        <span className="h-3 w-3 rounded-full bg-orange-500/90 shadow-[0_0_12px_rgba(255,115,64,0.8)]" />
      </span>
      <Link href="#" className="tracking-wide">
        {"CREATE A SPACE"}
      </Link>
    </motion.div>
  )
}
