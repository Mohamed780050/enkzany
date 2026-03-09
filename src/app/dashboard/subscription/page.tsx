import { Check, Star, ShieldCheck, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "الاشتراك - إنقذني",
};

export default function SubscriptionPage() {
  const plans = [
    {
      name: "خطة أساسية",
      price: "0",
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
      current: false,
    },
    {
      name: "خطة احترافية",
      price: "1500",
      icon: Star,
      features: [
        "كافة مميزات الخطة الأساسية",
        "الأولوية القصوى في البحث",
        "سجل تحديثات كامل ومفصل",
        "تصدير البيانات بصيغة CSV/PDF",
      ],
      missing: ["دعم فني 1:1", "تقارير الربع السنوية"],
      current: true,
      popular: true,
    },
    {
      name: "خطة الشركاء",
      price: "3500",
      icon: ShieldCheck,
      features: [
        "كافة مميزات الخطة الاحترافية",
        "تقارير تحليلية شاملة",
        "دعم فني مخصص ٢٤/٧",
        "لوحة تحكم إدارية متعددة",
        "تكامل مع أنظمة المستشفى",
      ],
      missing: [],
      current: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-24 px-6">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-5xl font-black text-foreground tracking-tight">
          باقات الاشتراك
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          انضم لعائلة "إنقذني" واختر الباقة التي تضمن وصول المرضى لمستشفاك بأسرع
          وقت وأكثر كفاءة
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch pt-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:translate-y-[-12px] border-none ring-0 ${
              plan.current
                ? "shadow-[0_32px_64px_-16px_rgba(var(--primary-rgb),0.15)] bg-white scale-105 z-10"
                : "shadow-2xl shadow-zinc-200/60 bg-white/70 hover:bg-white"
            }`}
          >
            {plan.current && (
              <div className="absolute top-0 inset-x-0 flex justify-center">
                <div className="bg-primary text-white px-8 py-2 rounded-b-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                  باقتك الحالية
                </div>
              </div>
            )}

            <CardHeader className="text-center pt-16 pb-10">
              <div
                className={`w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center ${
                  plan.current
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
                  ج.م<span className="mx-1">/</span>شهر
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
              {plan.current ? (
                <Button className="w-full h-16 rounded-2xl bg-white text-primary border-2 border-primary/20 hover:border-primary/40 hover:bg-white shadow-xl shadow-primary/5 cursor-default group transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={24} className="text-primary" />
                    <span className="font-black text-xl">مفعلة بالكامل</span>
                  </div>
                </Button>
              ) : (
                <Button className="w-full h-16 rounded-2xl font-black text-xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300">
                  بدء الترقية الآن
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-24 p-12 bg-linear-to-r from-primary/5 to-secondary/5 rounded-[3.5rem] border border-primary/10 text-center relative overflow-hidden shadow-sm">
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
      </div>
    </div>
  );
}
