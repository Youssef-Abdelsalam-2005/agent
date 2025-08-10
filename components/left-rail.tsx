"use client";

import { Home, Brain, Vault, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./logo";

const items = [
  { icon: Home, label: "Home", href: "/app" },
  { icon: Brain, label: "Agent", href: "/agent" },
  { icon: Vault, label: "Vault", href: "/vault" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function LeftRail() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Primary"
      className="fixed left-0 top-0 z-20 flex h-svh w-16 flex-col items-center justify-between py-6"
    >
      {/* Brand vertical */}
      <Link href={"/"}>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="size-6 rounded-full overflow-hidden flex items-center justify-center">
              <Logo />
            </div>
            <span
              className="rotate-180 [writing-mode:vertical-rl] text-sm tracking-wide text-zinc-400 select-none"
              aria-hidden="true"
            >
              {"Nemo"}
            </span>
          </div>
        </div>
      </Link>

      {/* Bottom icons */}
      <nav className="mb-2 flex flex-col items-center gap-5">
        {items.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "group relative inline-flex size-6 items-center justify-center transition-colors",
                isActive
                  ? "text-orange-400"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
              aria-label={label}
            >
              <Icon className="size-5 transition-transform group-hover:scale-110" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
