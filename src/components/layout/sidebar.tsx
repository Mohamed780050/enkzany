"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  History,
  Building2,
  Bell,
  CreditCard,
  LogOut,
  ChevronLeft,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { useSession, signOut } from "@/lib/auth-client";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: Home, label: "الرئيسية" },
  { href: "/dashboard/history", icon: History, label: "سجل التحديثات" },
  { href: "/dashboard/profile", icon: Building2, label: "ملف المستشفى" },
  { href: "/dashboard/notifications", icon: Bell, label: "الإشعارات" },
  { href: "/dashboard/subscription", icon: CreditCard, label: "الاشتراك" },
];

export function Sidebar({ onAction }: { onAction?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
    setIsLoggingOut(false);
  }

  return (
    <aside className="flex h-full w-full flex-col bg-white border-l border-border shadow-sm">
      <div className="flex h-28 justify-center items-center px-6 border-b border-border/50">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Logo className="w-28 h-28" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4">
        {session?.user && (
          <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10 mb-4">
            <div className="font-bold text-foreground mb-1 line-clamp-1 text-sm">
              {session.user.name}
            </div>
            <div className="text-xs text-muted-foreground line-clamp-1">
              {session.user.email}
            </div>
          </div>
        )}

        <nav className="space-y-0.5">
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
                  "group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200",
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

      <div className="p-4 border-t border-border/50 bg-white">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-all group disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <LogOut
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
          )}
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
