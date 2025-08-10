"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { displayFont, sansFont } from "@/components/fonts";
import LandingNav from "@/components/landing-nav";
import { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

function TimeGreeting() {
  const [greeting, setGreeting] = useState("Good evening");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) {
      setGreeting("Up late");
    } else if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <h1
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] text-zinc-100",
        "font-display"
      )}
    >
      {greeting + "."}
    </h1>
  );
}

export default function HomePage() {
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
      <LandingNav />

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

      <main className="relative z-10 px-6 pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl tracking-tight text-zinc-100"
          >
            Build your second brain
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-zinc-300 text-lg max-w-2xl mx-auto"
          >
            Capture ideas, organize knowledge, and chat with an AI agent that
            understands your context.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <SignedIn>
              <button
                onClick={() => (window.location.href = "/app")}
                className="rounded-md bg-orange-500 px-6 py-3 text-white text-sm md:text-base font-medium shadow-sm hover:bg-orange-500/90 ring-1 ring-white/10 cursor-pointer"
              >
                Go to app
              </button>
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="rounded-md bg-orange-500 px-6 py-3 text-white text-sm md:text-base font-medium shadow-sm hover:bg-orange-500/90 ring-1 ring-white/10 cursor-pointer">
                  Get started
                </button>
              </SignUpButton>
            </SignedOut>
          </motion.div>
          {/* Features grid matching the reference layout */}
          <section className="mt-24 text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Knowledge vault */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-5 rounded-xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur"
              >
                <h3 className="text-zinc-100 font-semibold">Knowledge vault</h3>
                <p className="mt-2 text-zinc-400 text-sm">
                  Store notes, files, and links. Everything is searchable and
                  organized for retrieval.
                </p>
                <div className="mt-6 h-28 w-full rounded-lg bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-orange-400/10 ring-1 ring-white/10" />
              </motion.div>

              {/* Context-aware agent */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.05, duration: 0.5 }}
                className="md:col-span-7 rounded-xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur"
              >
                <h3 className="text-zinc-100 font-semibold">
                  Context-aware agent
                </h3>
                <p className="mt-2 text-zinc-400 text-sm">
                  Ask questions and get answers grounded in your own knowledge
                  base.
                </p>
                <div className="mt-6 h-28 w-full rounded-lg bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-orange-400/10 ring-1 ring-white/10" />
              </motion.div>

              {/* Flows & automations */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="md:col-span-8 rounded-xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur"
              >
                <h3 className="text-zinc-100 font-semibold">
                  Flows & automations
                </h3>
                <p className="mt-2 text-zinc-400 text-sm">
                  Automate the boring parts: capture, tag, and organize without
                  lifting a finger.
                </p>
                <div className="mt-6 h-28 w-full rounded-lg bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-orange-400/10 ring-1 ring-white/10" />
              </motion.div>

              {/* Why section (right rail) */}
              <motion.aside
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="md:col-span-4 md:row-span-2 rounded-xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur"
              >
                <h3 className="text-zinc-100 font-semibold">Why Nemo?</h3>
                <p className="mt-3 text-zinc-300 text-sm leading-relaxed">
                  Nemo is your thinking companion: capture notes, stash docs in
                  a personal vault, and chat with an agent that understands your
                  context. Revisit ideas, connect dots, and turn fragments into
                  finished work.
                </p>
              </motion.aside>
            </div>
          </section>

          {/* Visualize section */}
          <section className="mt-24 md:mt-32 text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6">
                <div className="relative h-56">
                  <div className="absolute inset-0 rounded-2xl border border-white/10 bg-zinc-900/40 ring-1 ring-white/10" />
                  <div className="absolute -top-6 -left-6 right-10 h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-orange-400/10 blur-[1px]" />
                  <div className="absolute -bottom-6 -right-6 left-10 h-40 rounded-2xl border border-white/10 bg-zinc-900/40" />
                </div>
              </div>
              <div className="md:col-span-6">
                <h3 className="text-zinc-100 text-2xl md:text-3xl font-semibold">
                  Visualize Your Connections
                </h3>
                <p className="mt-3 text-zinc-300 max-w-prose">
                  See how your ideas link together with our intuitive graph
                  view. Discover hidden patterns and create new insights from
                  your existing knowledge.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-24 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-zinc-400">
            <span>© 2024 Nemo. All rights reserved.</span>
            <nav className="flex items-center gap-6">
              <a href="#" className="hover:text-zinc-200">
                Privacy
              </a>
              <a href="#" className="hover:text-zinc-200">
                Terms
              </a>
              <a href="#" className="hover:text-zinc-200">
                Contact
              </a>
            </nav>
          </footer>
        </div>
      </main>

      {/* Signed-in app moved to /app */}
    </div>
  );
}
