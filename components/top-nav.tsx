"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TopNav({
  className = "",
}: {
  className?: string;
} = {}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-end px-6 py-4",
        className
      )}
    >
      <div className="pointer-events-auto flex items-center gap-6">
        {/* Unlock pill */}
        <motion.a
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900/60 px-2.5 py-1 text-sm text-zinc-200 ring-1 ring-white/10 backdrop-blur hover:bg-zinc-900/70"
          whileHover={{ y: -1 }}
        >
          <span className="relative inline-flex h-6 w-6 items-center justify-center">
            <Image
              src="/stylized-orange-figure.png"
              alt="User avatar"
              fill
              className="rounded-full object-cover"
            />
          </span>
          <span className="text-[13px]">{"Unlock features"}</span>
        </motion.a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="#"
            className="text-zinc-300 hover:text-zinc-100 transition-colors"
          >
            {"Everything"}
          </Link>
          <Link href="/" className="text-zinc-100" aria-current="page">
            <span className="relative">
              {"Spaces"}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded bg-gradient-to-r from-fuchsia-400/80 via-pink-400/80 to-sky-400/80" />
            </span>
          </Link>
          <Link
            href="#"
            className="text-zinc-300 hover:text-zinc-100 transition-colors"
          >
            {"Serendipity"}
          </Link>
        </nav>

        {/* Auth moved to landing page */}
      </div>
    </div>
  );
}
