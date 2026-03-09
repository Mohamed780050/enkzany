import { User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile menu button could go here */}
        <div className="font-bold text-xl text-primary md:hidden">إنقذني</div>
        <div className="hidden md:block font-bold text-lg text-primary">
          لوحة التحكم
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-accent cursor-pointer transition-colors">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User size={18} />
          </div>
          <span className="text-sm font-bold hidden sm:inline-block">
            Admin ▾
          </span>
        </div>
      </div>
    </header>
  );
}
