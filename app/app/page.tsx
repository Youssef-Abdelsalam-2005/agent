"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { displayFont, sansFont } from "@/components/fonts";
import TopNav from "@/components/top-nav";
import LeftRail from "@/components/left-rail";
import RecentItems from "@/components/recent-items";
import PageTransition from "@/components/page-transition";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

function TimeGreeting() {
  const [greeting, setGreeting] = useState("Good evening");
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const hour = new Date().getHours();
    let newGreeting = "Hello";

    if (hour >= 0 && hour < 5) {
      newGreeting = "Burning the midnight oil?";
    } else if (hour >= 5 && hour < 7) {
      newGreeting = "Early bird catches the worm!";
    } else if (hour >= 7 && hour < 10) {
      newGreeting = "Rise and shine!";
    } else if (hour >= 10 && hour < 12) {
      newGreeting = "Good morning";
    } else if (hour >= 12 && hour < 14) {
      newGreeting = "Lunch break hero!";
    } else if (hour >= 14 && hour < 17) {
      newGreeting = "Good afternoon";
    } else if (hour >= 17 && hour < 19) {
      newGreeting = "Evening vibes";
    } else if (hour >= 19 && hour < 22) {
      newGreeting = "Winding down?";
    } else if (hour >= 22 && hour < 24) {
      newGreeting = "Up late";
    }

    setGreeting(newGreeting);
  }, []);

  return (
    <h1
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] text-zinc-100",
        "font-display"
      )}
    >
      {greeting + " " + user?.firstName}
    </h1>
  );
}

export default function AppHomePage() {
  return (
    <div
      className={cn(
        "relative min-h-svh overflow-hidden bg-[#0b0f14] text-zinc-200 antialiased",
        sansFont.variable,
        displayFont.variable
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
          background:
            "radial-gradient(closest-side, rgba(157, 89, 255, 0.35), rgba(0,0,0,0))",
        }}
        animate={{ y: [0, 12, 0], opacity: [0.9, 1, 0.9] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-[70vmin] w-[90vmin] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(219, 94, 72, 0.28), rgba(0,0,0,0))",
        }}
        animate={{ y: [0, -10, 0], opacity: [0.9, 1, 0.9] }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <PageTransition>
        <main className="relative z-10 px-6 pt-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <TimeGreeting />
            </div>
            <div className="w-full">
              <RecentItems />
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
