import { User, Bell, Search, Menu, Activity } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border/50 bg-white/80 backdrop-blur-md px-8 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 md:hidden leading-none">
          <button
            onClick={onMenuClick}
            className="p-2 -mr-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
            <Activity size={18} />
          </div>
        </div>
        <h1 className="hidden md:block font-extrabold text-xl text-foreground tracking-tight">
          لوحة التحكم
        </h1>

        <div className="hidden lg:flex items-center bg-zinc-100 rounded-full px-4 py-2 w-80 border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all group">
          <Search
            size={18}
            className="text-muted-foreground group-focus-within:text-primary"
          />
          <input
            type="text"
            placeholder="بحث عن مريض أو سجل..."
            className="bg-transparent border-none focus:ring-0 text-sm w-full px-2 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-full hover:bg-zinc-100 text-muted-foreground relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-border mx-2" />

        <div className="flex items-center gap-3 group cursor-pointer p-1 pr-3 rounded-full hover:bg-zinc-100 transition-all border border-transparent hover:border-border/40">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shadow-inner">
            <User size={20} />
          </div>
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-bold text-foreground leading-none">
              مدير النظام
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              مشغل الخدمة
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
