import prisma from "@/lib/prisma";
import { LandingNav } from "@/components/layout/landing-nav";
import { HospitalsClient } from "./hospitals-client";
import { Logo } from "@/components/ui/logo";
import { Globe, MessageCircle, Hospital as HospitalIcon } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "دليل المستشفيات | إنقذني - Enkzany",
  description: "ابحث عن المستشفيات وتحقق من توفر الأسرة في الوقت الفعلي",
};

export const dynamic = "force-dynamic";

export default async function HospitalsPage() {
  const hospitals = await prisma.hospital.findMany({
    orderBy: {
      lastUpdate: "desc",
    },
  });

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20 bg-zinc-50">
      <LandingNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Hospital Background"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-zinc-50/80 to-zinc-50 z-0" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl text-primary border border-primary/10 border-b-4 border-b-primary mb-6">
            <HospitalIcon size={36} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            دليل المستشفيات
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            ابحث عن المستشفيات القريبة منك وتحقق من توفر الأسرة العادية، العناية المركزة، والطوارئ في الوقت الفعلي.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow w-full px-6 pb-24 -mt-4 relative z-20 max-w-7xl mx-auto">
        <HospitalsClient initialHospitals={hospitals} />
      </main>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <Logo className="w-16 h-16" />
              <span className="text-xl font-bold text-primary">إنقذني</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              المهمة الأساسية لـ إنقذني هي تقليل الوقت المهدر في البحث عن أسرة
              شاغرة لضمان توجيه المريض للمكان الصحيح في الوقت الصحيح.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors">
                <Globe size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors">
                <MessageCircle size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-6 text-right">
            <h5 className="font-bold text-lg">المنصة</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="/#how-it-works" className="hover:text-primary transition-colors font-medium">
                  كيف يعمل النظام
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-primary transition-colors font-medium">
                  المميزات
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary transition-colors font-medium">
                  لوحة التحكم
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-primary transition-colors font-medium">
                  تسجيل الدخول
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-right">
            <h5 className="font-bold text-lg">روابط سريعة</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="/hospitals" className="text-primary transition-colors font-bold">
                  دليل المستشفيات
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  للأطباء والممرضين
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-right">
            <h5 className="font-bold text-lg">قانوني</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  أمن البيانات
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div>© 2026 إنقذني - Enkzany. صنع بكل حب لإنقاذ الأرواح.</div>
          <div className="flex gap-6">
            <span>تحميل التطبيق:</span>
            <span className="font-bold text-primary cursor-pointer">
              App Store
            </span>
            <span className="font-bold text-primary cursor-pointer">
              Google Play
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
