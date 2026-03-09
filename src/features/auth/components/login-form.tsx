"use client";

import { useActionState, useState } from "react";
import { loginAction, type ActionState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="w-full max-w-[420px] mx-auto shadow-md border-t-4 border-t-primary rounded-xl overflow-hidden bg-white">
      <CardHeader className="text-center pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">
          إنقذني
        </h1>
        <CardDescription className="text-sm">
          إدارة توفر الأسرة في الوقت الفعلي
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني / Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              dir="ltr"
              placeholder="admin@hospital.com"
              className="text-left"
              aria-invalid={!!state?.errors?.email}
            />
            {state?.errors?.email && (
              <p className="text-sm text-destructive font-medium mt-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password">كلمة المرور / Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                dir="ltr"
                className="text-left pr-10"
                aria-invalid={!!state?.errors?.password}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "إخفاء" : "إظهار"}
              </button>
            </div>
            {state?.errors?.password && (
              <p className="text-sm text-destructive font-medium mt-1">
                {state.errors.password[0]}
              </p>
            )}

            <div className="flex justify-between items-center mt-3 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  className="rounded border-input text-primary focus:ring-primary w-4 h-4"
                />
                <span>تذكرني / Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-primary hover:underline font-medium"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
          </div>

          {state?.message && !state?.errors && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md text-center font-bold">
              {state.message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold"
            disabled={isPending}
          >
            {isPending ? "جاري التحقق..." : "تسجيل الدخول / Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
