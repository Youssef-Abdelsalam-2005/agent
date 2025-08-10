"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";
import Logo from "./logo";

export default function LandingNav({
  className = "",
}: { className?: string } = {}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-20 px-6 py-4",
        className
      )}
    >
      <div className="pointer-events-auto mx-auto max-w-6xl flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 text-zinc-100">
          <span className="relative inline-flex items-center justify-center overflow-hidden rounded-full">
            <Logo />
          </span>
          <span className="text-md tracking-wide text-zinc-200">Nemo</span>
        </Link>

        {/* Auth nav links styled like TopNav links */}
        <nav className="hidden md:flex items-center gap-6 text-md">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-zinc-100 cursor-pointer">
                <span className="relative">
                  {"Sign up"}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded bg-gradient-to-r from-fuchsia-400/80 via-pink-400/80 to-sky-400/80" />
                </span>
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Link href="/app" className="text-zinc-100">
                <span className="relative">
                  {"App"}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded bg-gradient-to-r from-fuchsia-400/80 via-pink-400/80 to-sky-400/80" />
                </span>
              </Link>
              <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
                <button className="text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer">
                  Sign out
                </button>
              </SignOutButton>
            </motion.div>
          </SignedIn>
        </nav>
      </div>
    </div>
  );
}
