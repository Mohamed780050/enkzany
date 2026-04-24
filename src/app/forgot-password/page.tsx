"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
      >
        <Card className="w-full max-w-[420px] mx-auto shadow-md border-t-4 border-t-primary rounded-xl bg-white">
        <CardHeader className="text-center pb-6">
          <h1 className="text-2xl font-bold text-primary mb-2">
            استعادة كلمة المرور
          </h1>
          <CardDescription>
            أدخل بريدك الإلكتروني لإرسال رابط التعيين
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!sent ? (
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني / Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  dir="ltr"
                  placeholder="admin@hospital.com"
                  className="text-left"
                />
              </div>
              <Button className="w-full h-12 text-lg font-bold" type="submit">
                إرسال رابط الاستعادة / Send Link
              </Button>
            </form>
          ) : (
            <div className="p-4 bg-success/10 text-success border border-success/20 rounded-lg text-center font-medium mb-6">
              تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني
            </div>
          )}

          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
