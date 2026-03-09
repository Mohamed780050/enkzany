"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Mail, Lock } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="p-8 space-y-6">
      {state?.message && (
        <div className="flex items-center gap-3 rounded-2xl bg-destructive/10 p-4 text-destructive border border-destructive/20 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{state.message}</p>
        </div>
      )}

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground/80 font-bold mr-1">
            البريد الإلكتروني
          </Label>
          <div className="relative group">
            <Mail
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@hospital.com"
              required
              className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
              defaultValue="admin@hospital.com"
            />
          </div>
          {state?.errors?.email && (
            <p className="text-xs text-destructive mt-1 mr-1 font-medium">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mr-1">
            <Label
              htmlFor="password"
              title="password"
              className="text-foreground/80 font-bold"
            >
              كلمة المرور
            </Label>
            <Link
              href="/forgot-password"
              title="forgot-password"
              className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
          <div className="relative group">
            <Lock
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={18}
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
              defaultValue="admin123"
            />
          </div>
          {state?.errors?.password && (
            <p className="text-xs text-destructive mt-1 mr-1 font-medium">
              {state.errors.password[0]}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="h-14 w-full rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
            جاري تسجيل الدخول...
          </>
        ) : (
          "تسجيل الدخول"
        )}
      </Button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-muted-foreground font-bold">
            أو الدخول التجريبي
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border bg-zinc-50 text-center space-y-1 group hover:border-primary/30 cursor-pointer transition-all">
          <div className="text-[10px] font-bold text-muted-foreground uppercase">
            دخول ممرض
          </div>
          <div className="text-xs font-black text-foreground group-hover:text-primary">
            بسرعة فائقة
          </div>
        </div>
        <div className="p-4 rounded-2xl border bg-zinc-50 text-center space-y-1 group hover:border-primary/30 cursor-pointer transition-all">
          <div className="text-[10px] font-bold text-muted-foreground uppercase">
            دخول مسئول
          </div>
          <div className="text-xs font-black text-foreground group-hover:text-primary">
            صلاحيات كاملة
          </div>
        </div>
      </div>
    </form>
  );
}
