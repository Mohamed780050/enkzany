"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  History,
  Building2,
  Bell,
  CreditCard,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "لوحة التحكم" },
  { href: "/dashboard/history", icon: History, label: "سجل التحديثات" },
  { href: "/dashboard/profile", icon: Building2, label: "ملف المستشفى" },
  { href: "/dashboard/notifications", icon: Bell, label: "الإشعارات" },
  { href: "/dashboard/subscription", icon: CreditCard, label: "الاشتراك" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 flex-col bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="font-bold text-2xl tracking-tight text-white flex gap-2 items-center">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-primary font-bold">
            إن
          </div>
          إنقذني
        </div>
      </div>

      <div className="px-6 py-6 border-b border-sidebar-border/50">
        <div className="font-bold text-lg text-white mb-1">
          مستشفى دمنهور العام
        </div>
        <div className="inline-flex items-center rounded-full border border-sky-400 bg-sky-900/30 px-2.5 py-0.5 text-xs font-semibold text-sky-200">
          مستشفى حكومي
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 px-4 py-6">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/dashboard");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white text-primary shadow-sm"
                  : "text-white/80 hover:bg-sidebar-accent hover:text-white",
              )}
            >
              <item.icon
                size={20}
                className={cn(isActive ? "text-primary" : "text-white/70")}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm font-medium text-white/80 hover:bg-destructive hover:text-white transition-colors"
          >
            <LogOut size={20} />
            تسجيل الخروج
          </button>
        </form>
      </div>
    </aside>
  );
}
