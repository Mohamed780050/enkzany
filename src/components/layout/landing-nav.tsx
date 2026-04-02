"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Menu, X } from "lucide-react";

export function LandingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#how-it-works", label: "كيف يعمل؟" },
    { href: "#features", label: "المميزات" },
    { href: "#faq", label: "الأسئلة الشائعة" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-24 h-24" />

         
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block">
            <Button className="rounded-full px-6 font-bold shadow-md hover:shadow-lg transition-all">
              تسجيل الدخول / Login
            </Button>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden text-muted-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-white border-b border-border/40 shadow-xl md:hidden transition-all duration-300 ease-in-out",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none",
        )}
      >
        <div className="flex flex-col p-6 gap-6 text-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <Button className="w-full rounded-full py-6 text-lg font-bold">
              تسجيل الدخول / Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
