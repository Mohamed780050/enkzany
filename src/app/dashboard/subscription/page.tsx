"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Star,
  ShieldCheck,
  Zap,
  MessageSquare,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { getSubscriptionPlan } from "@/features/hospital/actions";

const PRODUCT_SLUG_MAP: Record<string, string> = {
  "pdt_0NdPm0piqH5cyaIiwwWoc": "basic",
  "pdt_0NdPm92swvyHOFE7aOyRY": "professional",
  "pdt_0NdPmFhQBanoDwwcZ6MTC": "partners",
  "basic": "basic",
};

const plans = [
  {
    name: "خطة أساسية",
    slug: "basic",
    price: "20",
    icon: Zap,
    features: [
      "إدراج المستشفى في التطبيق",
      "تعديل الأسرة المتاحة",
      "تحديث فوري للقاعدة",
    ],
    missing: [
      "الأولوية في نتائج البحث",
      "تقارير تحليلية متقدمة",
      "دعم فني متخصص",
      "سجل كامل للصادرات",
    ],
  },
  {
    name: "خطة احترافية",
    slug: "professional",
    price: "40",
    icon: Star,
    features: [
      "كافة مميزات الخطة الأساسية",
      "الأولوية القصوى في البحث",
      "سجل تحديثات كامل ومفصل",
      "تصدير البيانات بصيغة CSV/PDF",
    ],
    missing: ["دعم فني 1:1", "تقارير الربع السنوية"],
    popular: true,
  },
  {
    name: "خطة الشركاء",
    slug: "partners",
    price: "70",
    icon: ShieldCheck,
    features: [
      "كافة مميزات الخطة الاحترافية",
      "تقارير تحليلية شاملة",
      "دعم فني مخصص ٢٤/٧",
      "لوحة تحكم إدارية متعددة",
      "تكامل مع أنظمة المستشفى",
    ],
    missing: [],
  },
];

export default function SubscriptionPage() {
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [currentPlanSlug, setCurrentPlanSlug] = useState<string>("basic");

  useEffect(() => {
    getSubscriptionPlan().then((planId) => {
      const slug = PRODUCT_SLUG_MAP[planId] || "basic";
      setCurrentPlanSlug(slug);
    });
  }, []);

  async function handleUpgrade(slug: string) {
    setLoadingSlug(slug);
    try {
      const { data: session, error } =
        await authClient.dodopayments.checkoutSession({
          slug,
          referenceId: `sub_${Date.now()}`,
        });

      if (error) {
        toast.error(error.message || "حدث خطأ أثناء إنشاء جلسة الدفع");
        return;
      }

      if (session?.url) {
        window.location.href = session.url;
      }
    } catch {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setLoadingSlug(null);
    }
  }

  async function handlePortal() {
    setPortalLoading(true);
    try {
      const { data: customerPortal, error } =
        await authClient.dodopayments.customer.portal();

      if (error) {
        toast.error(error.message || "حدث خطأ أثناء فتح بوابة الإدارة");
        return;
      }

      if (customerPortal?.url) {
        window.location.href = customerPortal.url;
      }
    } catch {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setPortalLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto pb-24 px-6">
      <motion.div
        className="text-center mb-20 space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <h1 className="text-5xl font-black text-foreground tracking-tight">
          باقات الاشتراك
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          انضم لعائلة &quot;إنقذني&quot; واختر الباقة التي تضمن وصول المرضى
          لمستشفاك بأسرع وقت وأكثر كفاءة
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch pt-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <Card
              className={`relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:translate-y-[-12px] border-none ring-0 h-full ${
                plan.popular
                  ? "shadow-[0_32px_64px_-16px_rgba(var(--primary-rgb),0.15)] bg-white scale-105 z-10"
                  : "shadow-2xl shadow-zinc-200/60 bg-white/70 hover:bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 flex justify-center">
                  <div className="bg-primary text-white px-8 py-2 rounded-b-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                    الأكثر شيوعاً
                  </div>
                </div>
              )}

              <CardHeader className="text-center pt-16 pb-10">
                <div
                  className={`w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center ${
                    plan.popular
                      ? "bg-primary text-white shadow-xl shadow-primary/20"
                      : "bg-zinc-100 text-zinc-500 shadow-inner"
                  } transition-colors duration-500`}
                >
                  <plan.icon size={36} />
                </div>
                <CardTitle className="text-3xl font-black mb-3 tracking-tight">
                  {plan.name}
                </CardTitle>
                <div
                  className="flex items-baseline justify-center gap-1.5"
                  dir="rtl"
                >
                  <span className="text-6xl font-black text-foreground tabular-nums">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground font-bold text-lg">
                    $<span className="mx-1">/</span>شهر
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 px-10 pb-10">
                <ul className="space-y-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="rounded-full bg-success/10 p-1.5 text-success mt-0.5 shadow-sm ring-1 ring-success/20">
                        <Check size={14} strokeWidth={4} />
                      </div>
                      <span className="font-bold text-foreground leading-tight text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.missing.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 opacity-50 grayscale transition-opacity hover:opacity-100"
                    >
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <div className="w-2.5 h-0.5 bg-muted-foreground/40 rounded-full" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-10 bg-zinc-50/50 border-t border-border/30">
                {currentPlanSlug === plan.slug ? (
                  <Button
                    disabled
                    className="w-full h-16 rounded-2xl bg-zinc-100 text-zinc-500 hover:bg-zinc-100 border-2 border-zinc-200 shadow-none cursor-default font-black text-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Check size={24} className="text-zinc-400" />
                      <span>الخطة الحالية</span>
                    </div>
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUpgrade(plan.slug)}
                    disabled={loadingSlug === plan.slug}
                    className="w-full h-16 rounded-2xl font-black text-xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-white"
                  >
                    {loadingSlug === plan.slug ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        جاري التحويل...
                      </span>
                    ) : (
                      "بدء الترقية الآن"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Manage Subscription */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          onClick={handlePortal}
          disabled={portalLoading}
          className="h-14 rounded-2xl px-8 font-bold text-lg border-2 hover:scale-[1.02] active:scale-95 transition-all"
        >
          {portalLoading ? (
            <span className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              جاري التحميل...
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <ExternalLink size={20} />
              إدارة الاشتراك والمدفوعات
            </span>
          )}
        </Button>
      </motion.div>

      {/* Enterprise CTA */}
      <motion.div
        className="mt-16 p-12 bg-linear-to-r from-primary/5 to-secondary/5 rounded-[3.5rem] border border-primary/10 text-center relative overflow-hidden shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 80, damping: 20 }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-primary/10 text-primary">
            <MessageSquare size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-primary tracking-tight">
              هل تدير مجموعة مستشفيات؟
            </h3>
            <p className="font-bold text-xl text-muted-foreground max-w-2xl">
              تواصل معنا للحصول على عرض مخصص يشمل ربط الأنظمة وإحصائيات متقدمة
              لكافة الفروع في لوحة تحكم واحدة
            </p>
          </div>
          <Button
            variant="link"
            className="mt-4 font-black text-primary h-auto p-0 text-2xl hover:no-underline hover:opacity-70 group transition-all"
          >
            <div className="flex items-center gap-3">
              <span>تواصل مع المبيعات</span>
              <Check
                size={24}
                className="transition-transform group-hover:translate-x-[-4px]"
              />
            </div>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
