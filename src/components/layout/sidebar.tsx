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
  Activity,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "الرئيسية" },
  { href: "/dashboard/history", icon: History, label: "سجل التحديثات" },
  { href: "/dashboard/profile", icon: Building2, label: "ملف المستشفى" },
  { href: "/dashboard/notifications", icon: Bell, label: "الإشعارات" },
  { href: "/dashboard/subscription", icon: CreditCard, label: "الاشتراك" },
];

export function Sidebar({ onAction }: { onAction?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-white border-l border-border shadow-sm">
      <div className="flex h-20 items-center px-6 border-b border-border/50">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Activity size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-primary">
            إنقذني
          </span>
        </Link>
      </div>

      <div className="px-5 py-6">
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/5 mb-6">
          <div className="font-bold text-foreground mb-1 line-clamp-1">
            مستشفى دمنهور العام
          </div>
          <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
            مستشفى حكومي
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== "/dashboard");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onAction}
                className={cn(
                  "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/10"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className={cn(
                      isActive
                        ? "text-white"
                        : "text-muted-foreground group-hover:text-primary transition-colors",
                    )}
                  />
                  {item.label}
                </div>
                {isActive && (
                  <ChevronLeft size={16} className="text-white/60" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-5 border-t border-border/50">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-all group"
          >
            <LogOut
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            تسجيل الخروج
          </button>
        </form>
      </div>
    </aside>
  );
}
