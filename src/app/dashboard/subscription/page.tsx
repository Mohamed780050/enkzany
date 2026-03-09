import { Check, Star, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
    <div className="max-w-7xl mx-auto pb-20 px-4">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black text-foreground tracking-tight">
          باقات الاشتراك
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          انضم لعائلة "إنقذني" واختر الباقة التي تضمن وصول المرضى لمستشفاك بأسرع
          وقت وأكثر كفاءة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:translate-y-[-8px] ${plan.current ? "border-primary border-4 shadow-2xl shadow-primary/20 scale-105 z-10" : "border-border/50 shadow-xl shadow-zinc-200/50"}`}
          >
            {plan.current && (
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                باقتك الحالية
              </div>
            )}

            <CardHeader className="text-center pt-12 pb-8">
              <div
                className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${plan.current ? "bg-primary text-white" : "bg-zinc-100 text-zinc-500"} shadow-inner`}
              >
                <plan.icon size={32} />
              </div>
              <CardTitle className="text-3xl font-black mb-2 tracking-tight">
                {plan.name}
              </CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-black text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground font-bold text-lg mr-1">
                  ج.م / شهر
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 px-8 pb-8">
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="rounded-full bg-success/10 p-1 text-success mt-0.5 shadow-sm ring-1 ring-success/20">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="font-bold text-foreground leading-tight text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.missing.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 opacity-30 grayscale"
                  >
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <div className="w-2 h-0.5 bg-muted-foreground/50 rounded-full" />
                    </div>
                    <span className="text-sm font-bold text-muted-foreground leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="p-8 bg-zinc-50/50 border-t border-border/40">
              {plan.current ? (
                <Button className="w-full h-14 rounded-2xl bg-white text-primary border-2 border-primary hover:bg-white shadow-xl shadow-primary/5 cursor-default group">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} />
                    <span className="font-black text-lg">مفعلة بالكامل</span>
                  </div>
                </Button>
              ) : (
                <Button className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all">
                  بدء الترقية الآن
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-20 p-10 bg-linear-to-r from-primary/5 to-secondary/5 rounded-[3rem] border border-primary/10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <h3 className="text-2xl font-black text-primary mb-2 relative z-10">
          هل تدير مجموعة مستشفيات؟
        </h3>
        <p className="font-bold text-lg text-muted-foreground relative z-10">
          تواصل معنا للحصول على عرض مخصص يشمل ربط الأنظمة وإحصائيات متقدمة لكافة
          الفروع
        </p>
        <Button
          variant="link"
          className="mt-4 font-black text-primary h-auto p-0 text-lg hover:no-underline hover:opacity-70 group"
        >
          تواصل مع المبيعات
          <Check size={20} className="mr-2" />
        </Button>
      </div>
    </div>
  );
}
