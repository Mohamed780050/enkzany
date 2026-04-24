"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SubscriptionSuccessPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <motion.div
        className="max-w-lg w-full text-center space-y-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        {/* Success Icon */}
        <motion.div
          className="mx-auto w-28 h-28 rounded-full bg-success/10 flex items-center justify-center border-4 border-success/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <CheckCircle2 className="w-14 h-14 text-success" strokeWidth={2.5} />
        </motion.div>

        {/* Text */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-black text-foreground">
            تم الاشتراك بنجاح! 🎉
          </h1>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed">
            شكراً لثقتك في &quot;إنقذني&quot;. تم تفعيل باقتك الجديدة ويمكنك
            الآن الاستمتاع بكافة المميزات المتاحة.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/dashboard">
            <Button className="h-16 rounded-2xl px-10 font-black text-xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-white gap-3">
              العودة للوحة التحكم
              <ArrowRight size={20} className="rotate-180" />
            </Button>
          </Link>
        </motion.div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 pt-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
