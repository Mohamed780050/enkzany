"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F4F8FB] text-foreground overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:h-full md:shrink-0 md:flex",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <Sidebar onAction={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 w-full overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
