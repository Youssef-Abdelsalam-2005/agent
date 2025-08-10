"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { displayFont, sansFont } from "@/components/fonts"
import TopNav from "@/components/top-nav"
import LeftRail from "@/components/left-rail"
import RecentItems from "@/components/recent-items"
import PageTransition from "@/components/page-transition"
import Breadcrumbs from "@/components/breadcrumbs"
import { useState, useEffect } from "react"

function TimeGreeting() {
  const [greeting, setGreeting] = useState("Good evening")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 22 || hour < 6) {
      setGreeting("Up late")
    } else if (hour < 12) {
      setGreeting("Good morning")
    } else if (hour < 17) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [])

  return (
    <h1
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] text-zinc-100",
        "font-display",
      )}
    >
      {greeting + "."}
    </h1>
  )
}

export default function HomePage() {
  return (
    <div
      className={cn(
        "relative min-h-svh overflow-hidden bg-[#0b0f14] text-zinc-200 antialiased",
        sansFont.variable,
        displayFont.variable,
      )}
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 50% -20%, rgba(149, 76, 233, 0.14), rgba(11,15,20,0)), radial-gradient(1000px 500px at 50% 120%, rgba(219, 94, 72, 0.28), rgba(11,15,20,0))",
      }}
    >
      <TopNav />
      <LeftRail />

      {/* Ambient Orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[60vmin] w-[80vmin] rounded-full blur-[90px]"
        style={{
          background: "radial-gradient(closest-side, rgba(157, 89, 255, 0.35), rgba(0,0,0,0))",
        }}
        animate={{ y: [0, 12, 0], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-[70vmin] w-[90vmin] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(closest-side, rgba(219, 94, 72, 0.28), rgba(0,0,0,0))",
        }}
        animate={{ y: [0, -10, 0], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <PageTransition>
        <main className="relative z-10 px-6 pt-32">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs />
            <div className="mb-12">
              <TimeGreeting /> Youssef
            </div>
            <div className="w-full">
              <RecentItems />
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}
