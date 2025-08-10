"use client"

import { SignIn } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

export default function SignInPage() {
  return (
    <div
      className={cn(
        "relative min-h-svh overflow-hidden bg-[#0b0f14] text-zinc-200 antialiased flex items-center justify-center px-4 py-24"
      )}
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 50% -20%, rgba(149, 76, 233, 0.14), rgba(11,15,20,0)), radial-gradient(1000px 500px at 50% 120%, rgba(219, 94, 72, 0.28), rgba(11,15,20,0))",
      }}
    >
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full max-w-[420px]",
            card: "bg-zinc-900/60 backdrop-blur ring-1 ring-white/10",
            headerTitle: "text-zinc-100",
            headerSubtitle: "text-zinc-400",
            formFieldInput: "bg-zinc-800/80 text-zinc-100 placeholder:text-zinc-500",
            footerActionText: "text-zinc-300",
            socialButtonsBlockButton: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100",
            primaryButton: "bg-orange-500 hover:bg-orange-500/90",
          },
        }}
        afterSignInUrl="/"
        afterSignUpUrl="/"
      />
    </div>
  )
}


