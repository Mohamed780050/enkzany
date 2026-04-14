"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp.email({
          email,
          password,
          name,
        }, {
          onSuccess: () => {
            router.push("/dashboard");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message || "حدث خطأ أثناء إنشاء الحساب");
          },
        });
        if (signUpError) {
          setError(signUpError.message || "حدث خطأ أثناء إنشاء الحساب");
        }
      } else {
        const { error: signInError } = await signIn.email({
          email,
          password,
        }, {
          onSuccess: () => {
            router.push("/dashboard");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
          },
        });
        if (signInError) {
          setError(signInError.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
        }
      }
    } catch {
      setError("حدث خطأ غير متوقع. حاول مرة أخرى.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      {error && (
        <div className="flex items-center gap-3 rounded-2xl bg-destructive/10 p-4 text-destructive border border-destructive/20 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <div className="space-y-5">
        {isSignUp && (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground/80 font-bold mr-1">
              الاسم الكامل
            </Label>
            <div className="relative group">
              <User
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                size={18}
              />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="أدخل اسمك الكامل"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
              />
            </div>
          </div>
        )}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
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
            {!isSignUp && (
              <Link
                href="/forgot-password"
                title="forgot-password"
                className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                نسيت كلمة المرور؟
              </Link>
            )}
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 pr-12 rounded-2xl border-border bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
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
            {isSignUp ? "جاري إنشاء الحساب..." : "جاري تسجيل الدخول..."}
          </>
        ) : isSignUp ? (
          "إنشاء حساب جديد"
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
            {isSignUp ? "لديك حساب بالفعل؟" : "ليس لديك حساب؟"}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError(null);
        }}
        className="h-12 w-full rounded-2xl text-md font-bold border-2 hover:bg-primary/5 transition-all"
      >
        {isSignUp ? "تسجيل الدخول بحساب موجود" : "إنشاء حساب جديد"}
      </Button>
    </form>
  );
}
