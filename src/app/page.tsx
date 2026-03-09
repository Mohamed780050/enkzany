import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center shadow-md">
        <div className="font-bold text-2xl tracking-tight">
          إنقذني - Enkzany
        </div>
        <Link href="/login">
          <Button variant="secondary" className="font-bold">
            تسجيل الدخول / Login
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-accent/30 py-32">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-6">
          إدارة توفر الأسرة في الوقت الفعلي
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl leading-relaxed">
          منصة سريعة وبسيطة تتيح للمستشفيات تحديث أعداد الأسرة المتاحة في ثوان،
          لإنقاذ حياة المرضى وتوجيههم للمكان الصحيح.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login">
            <Button
              size="lg"
              className="w-full sm:w-auto text-xl h-14 px-8 shadow-lg transition-transform hover:scale-105"
            >
              بدء الاستخدام - Demo
            </Button>
          </Link>
          <a href="#features">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-xl h-14 px-8 border-primary text-primary hover:bg-primary/5 transition-transform hover:scale-105"
            >
              المميزات
            </Button>
          </a>
        </div>
      </main>

      <section
        id="features"
        className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
      >
        <div className="p-8 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ⚡
          </div>
          <h3 className="text-2xl font-bold mb-4 text-primary">
            تحديث في ثوانٍ
          </h3>
          <p className="text-muted-foreground text-lg">
            صممت لتكون سريعة وسهلة للممرضين لتحديث الحالات أثناء انشغالهم دون
            تعقيد.
          </p>
        </div>
        <div className="p-8 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            📊
          </div>
          <h3 className="text-2xl font-bold mb-4 text-primary">تتبع فوري</h3>
          <p className="text-muted-foreground text-lg">
            يظهر التحديث مباشرة على هواتف المرضى وفرق الإسعاف لتوجيههم للمستشفى
            المتاح.
          </p>
        </div>
        <div className="p-8 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            🏥
          </div>
          <h3 className="text-2xl font-bold mb-4 text-primary">سجل متكامل</h3>
          <p className="text-muted-foreground text-lg">
            تتيح لك المنصة متابعة سجل التحديثات ومعرفة أوقات الذروة واستهلاك
            الأسرة بالتفصيل.
          </p>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground/80 text-center py-6 mt-auto">
        <p>© 2026 إنقذني - Enkzany. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
