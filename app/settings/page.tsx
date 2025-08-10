"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { displayFont, sansFont } from "@/components/fonts";
import TopNav from "@/components/top-nav";
import LeftRail from "@/components/left-rail";
import PageTransition from "@/components/page-transition";
import Breadcrumbs from "@/components/breadcrumbs";
import SettingsContent from "@/components/settings-content";

export default function SettingsPage() {
  return (
    <div
      className={cn(
        "relative min-h-svh bg-[#0b0f14] text-zinc-200 antialiased",
        sansFont.variable,
        displayFont.variable
      )}
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 50% -20%, rgba(149, 76, 233, 0.08), rgba(11,15,20,0)), radial-gradient(1000px 500px at 50% 120%, rgba(27, 96, 192, 0.08), rgba(11,15,20,0))",
      }}
    >
      <TopNav />
      <LeftRail />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[40vmin] w-[60vmin] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(157, 89, 255, 0.15), rgba(0,0,0,0))",
        }}
        animate={{ y: [0, 8, 0], opacity: [0.7, 0.9, 0.7] }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <PageTransition>
        <main className="relative z-10 ml-16 h-svh pt-20">
          <div className="h-full px-6">
            <Breadcrumbs />
            <div className="h-[calc(100%-60px)] overflow-auto">
              <SettingsContent />
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
