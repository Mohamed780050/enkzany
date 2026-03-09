import { Check } from "lucide-react";
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
      name: "أساسية",
      price: "500",
      features: ["الإدراج في التطبيق", "تحديث الأسرة (غير محدود)"],
      missing: ["الأولوية في البحث", "سجل التحديثات", "تقرير شهري", "دعم مخصص"],
      current: false,
    },
    {
      name: "معيارية",
      price: "900",
      features: [
        "الإدراج في التطبيق",
        "تحديث الأسرة (غير محدود)",
        "الأولوية في البحث",
        "سجل التحديثات الكامل",
      ],
      missing: ["تقرير شهري", "دعم مخصص"],
      current: true,
      popular: true,
    },
    {
      name: "مميزة",
      price: "1,500",
      features: [
        "الإدراج في التطبيق",
        "تحديث الأسرة (غير محدود)",
        "الأولوية في البحث",
        "سجل التحديثات الكامل",
        "تقرير تحليلي شهري",
        "دعم فني مخصص 24/7",
      ],
      missing: [],
      current: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">خطط الاشتراك</h1>
        <p className="text-xl text-muted-foreground">
          اختر الخطة المناسبة لحجم وتغطية مستشفاك
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${plan.current ? "border-primary border-2 shadow-lg scale-105 z-10" : "border-border shadow-sm"}`}
          >
            {plan.current && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                خطتك الحالية
              </div>
            )}
            {plan.popular && !plan.current && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold">
                الأكثر شيوعاً
              </div>
            )}

            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl font-bold mb-2">
                {plan.name}
              </CardTitle>
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl font-extrabold text-primary">
                  {plan.price}
                </span>
                <span className="text-muted-foreground mr-1">جنيه / شهر</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="rounded-full bg-success/20 p-1 text-success shrink-0">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="font-medium text-foreground/90">
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.missing.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 opacity-50">
                    <div className="px-2 shrink-0 border-t-2 border-muted-foreground/50 w-6"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-6">
              {plan.current ? (
                <Button
                  variant="outline"
                  className="w-full text-primary border-primary font-bold bg-primary/5 hover:bg-primary/10"
                  disabled
                >
                  الخطة الحالية (نشطة)
                </Button>
              ) : (
                <Button className="w-full font-bold">
                  الترقية إلى هذه الخطة
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center p-6 bg-accent/50 rounded-xl border border-border">
        <p className="font-bold text-lg text-primary">
          للاشتراك السنوي، تواصل معنا للحصول على خصم 15%
        </p>
      </div>
    </div>
  );
}
