"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export default function CustomInput({ className, value, onChange, ...props }: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputValue = value?.toString() || ""

  return (
    <div className="relative">
      <input
        {...props}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn("w-full bg-transparent border-0 outline-none text-zinc-100 placeholder:text-zinc-400", className)}
      />
      <div
        className={cn(
          "absolute bottom-0 h-px bg-white/40 transition-all duration-300",
          isFocused || inputValue ? "opacity-100" : "opacity-20",
        )}
        style={{
          width: isFocused ? "100%" : inputValue ? `${Math.min(inputValue.length * 8 + 20, 100)}%` : "0%",
        }}
      />
    </div>
  )
}
