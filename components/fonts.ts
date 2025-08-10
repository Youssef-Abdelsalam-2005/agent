import { Inter, Playfair_Display } from "next/font/google"

export const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

export const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["italic", "normal"],
})

export const fontClasses = `${sansFont.variable} ${displayFont.variable}`
