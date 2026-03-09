import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Globe,
  Hospital,
  LineChart,
  ShieldCheck,
  Smartphone,
  Users,
  MessageCircle,
  Stethoscope,
  HeartPlus,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Activity size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">
              إنقذني
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              كيف يعمل؟
            </a>
            <a
              href="#features"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              المميزات
            </a>
            <a
              href="#faq"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              الأسئلة الشائعة
            </a>
          </div>

          <Link href="/login">
            <Button className="rounded-full px-6 font-bold shadow-md hover:shadow-lg transition-all">
              تسجيل الدخول / Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Hospital Background"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/90 z-0" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-right flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-3/5 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-bold border border-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              منصة التحديث اللحظي الأولى في مصر
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground leading-[1.15] tracking-tight">
              لا تبحث عن سرير <br />
              <span className="text-primary italic">في وقت الأزمة!</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              إنقذني هي حلقة الوصل بين المستشفيات والمرضى. نساعد المستشفيات على
              إدارة وتحديث توفر الأسرة في ثوانٍ، لنضمن وصول كل مريض للرعاية
              المناسبة في أسرع وقت.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-8 text-xl font-bold h-auto shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                >
                  ابدأ الاستخدام مجاناً
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-10 py-8 text-xl font-bold h-auto border-2 hover:bg-zinc-50 transition-colors"
              >
                اطلب عرض تجريبي
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-8 justify-center lg:justify-start">
              <div className="flex -space-x-3 space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-white bg-zinc-200 overflow-hidden"
                  >
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      👤
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                <span className="font-bold text-foreground">150+ مستشفى</span>{" "}
                تعتمد علينا يومياً
              </p>
            </div>
          </div>

          <div className="lg:w-2/5 w-full relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 bg-white">
              <div className="bg-primary/5 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-primary">
                    المجموع الكلي المتاح
                  </div>
                  <div className="text-3xl font-black text-primary animate-pulse">
                    24
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-primary/20 rounded-full w-full" />
                  <div className="h-4 bg-primary/10 rounded-full w-3/4" />
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-success/5 rounded-2xl border border-success/10 text-center">
                  <div className="text-xs text-success font-bold mb-1">
                    عناية مركزة
                  </div>
                  <div className="text-2xl font-bold text-success">08</div>
                </div>
                <div className="p-4 bg-warning/5 rounded-2xl border border-warning/10 text-center">
                  <div className="text-xs text-warning font-bold mb-1">
                    طوارئ
                  </div>
                  <div className="text-2xl font-bold text-warning">12</div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl z-0" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-4xl font-black">2.5M+</div>
            <div className="text-white/70 text-sm">مريض تم مساعدته</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black">200+</div>
            <div className="text-white/70 text-sm">مستشفى مسجلة</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black">15sec</div>
            <div className="text-white/70 text-sm">متوسط وقت التحديث</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black">27+</div>
            <div className="text-white/70 text-sm">محافظة مغطاة</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-primary">
              كيف تعمل المنصة؟
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              بساطة الاستخدام هي سر نجاحنا. صممنا النظام ليعمل في البيئات الطبية
              المزدحمة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="relative text-center space-y-6">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl text-primary border border-primary/10 border-b-4 border-b-primary">
                <Stethoscope size={36} />
              </div>
              <h3 className="text-2xl font-bold">1. يسجل الممرض الدخول</h3>
              <p className="text-muted-foreground">
                عن طريق واجهة بسيطة جداً، يتم الدخول للوحة التحكم الخاصة
                بالمستشفى.
              </p>
              <div className="hidden md:block absolute top-10 -right-1/4 w-1/2 h-px bg-dashed-primary border-t-2 border-dashed border-primary/20" />
            </div>

            <div className="relative text-center space-y-6">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl text-primary border border-primary/10 border-b-4 border-b-primary">
                <HeartPlus size={36} />
              </div>
              <h3 className="text-2xl font-bold">2. يعدل الأرقام</h3>
              <p className="text-muted-foreground">
                بلمسة واحدة يزيد أو ينقص عدد الأسرة المتاحة في الأقسام المختلفة.
              </p>
              <div className="hidden md:block absolute top-10 -right-1/4 w-1/2 h-px bg-zinc-200 border-t-2 border-dashed border-primary/20" />
            </div>

            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto shadow-xl text-white shadow-primary/30">
                <Smartphone size={36} />
              </div>
              <h3 className="text-2xl font-bold text-primary">
                3. يراها المريض فوراً
              </h3>
              <p className="text-muted-foreground">
                تنعكس الأرقام الجديدة فوراً على تطبيق "إنقذني" للمرضى وسيارات
                الإسعاف.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
            <div className="space-y-4 text-right">
              <h2 className="text-4xl font-bold text-primary">
                مميزات تهم المستشفيات
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                أدوات ذكية مصممة لمساعدة الطواقم الطبية على أداء مهامهم بفعالية
                أكبر وتقليل التوتر.
              </p>
            </div>
            <Link href="/login">
              <Button
                variant="link"
                className="text-primary font-bold gap-2 text-lg"
              >
                اكتشف كل المميزات <ArrowLeft size={20} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "تحديث لحظي",
                desc: "لا تأخير في البيانات. التعديل في لوحة التحكم يظهر فوراً في كافة التطبيقات.",
              },
              {
                icon: ShieldCheck,
                title: "أمان كامل للبيانات",
                desc: "تشفير كامل لكافة بيانات المستشفى والعمليات التي تتم على النظام.",
              },
              {
                icon: LineChart,
                title: "تقارير تحليلية",
                desc: "افهم أوقات الذروة واحتياجاتك المستقبلية بناءً على سجل الاستخدام.",
              },
              {
                icon: Globe,
                title: "دعم RTL بالكامل",
                desc: "واجهة عربية أصيلة مصممة خصيصاً للمستخدم المصري.",
              },
              {
                icon: Smartphone,
                title: "متوافق مع الموبايل",
                desc: "يمكن للممرض التحديث من هاتفه الخاص أو التابلت بسهولة تامة.",
              },
              {
                icon: Users,
                title: "إدارة صلاحيات",
                desc: "حدد من يمكنه التعديل ومن يمكنه العرض فقط داخل الطاقم الطبي.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group p-8 bg-white border border-border/50 rounded-3xl hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-4">{f.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary text-center mb-16">
            الأسئلة الشائعة
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "هل يحتاج النظام لأي أجهزة خاصة؟",
                a: "لا، النظام سحابي (Cloud-based) يعمل على أي متصفح إنترنت سواء من الكمبيوتر، التابلت، أو الهاتف المحمول.",
              },
              {
                q: "كيف يتم ضمان دقة الأرقام من المستشفيات؟",
                a: "نظامنا يعتمد على التحديث اليدوي المباشر من طواقم التمريض، مع وجود تنبيهات في حال عدم التحديث لفترة طويلة لضمان الاستمرارية.",
              },
              {
                q: "هل يمكن ربط النظام بنظام المستشفى الداخلي (HIS)؟",
                a: "نعم، نوفر API خاصة للمستشفيات الكبرى للربط المباشر وتحديث البيانات آلياً دون تدخل بشري.",
              },
              {
                q: "ما هي تكلفة الاشتراك للمستشفيات الحكومية؟",
                a: "المستشفيات الحكومية والخيرية تحصل على مزايا خاصة وخصومات تصل لـ 50% كجزء من مسؤوليتنا المجتمعية.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-border/40 shadow-sm"
              >
                <h4 className="font-bold text-lg mb-3 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  {item.q}
                </h4>
                <p className="text-muted-foreground pr-4.5">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto relative rounded-[3rem] bg-primary overflow-hidden py-20 px-12 text-center text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              جاهز لإنقاذ المزيد من الأرواح؟
            </h2>
            <p className="text-xl text-white/80">
              انضم لمئات المستشفيات التي تساهم في بناء أسرع شبكة توفر أسرة في
              مصر. ابدأ اليوم مجاناً.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-12 py-8 text-xl font-bold h-auto hover:bg-white hover:text-primary transition-colors"
                >
                  سجل مستشفاك الآن
                </Button>
              </Link>
              <Button
                size="lg"
                className="rounded-full px-12 py-8 text-xl font-bold h-auto bg-white/10 hover:bg-white/20 border-white/20 transition-colors"
              >
                تواصل مع المبيعات
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-50 pt-20 pb-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Activity size={18} />
              </div>
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
                <a
                  href="#how-it-works"
                  className="hover:text-primary transition-colors font-medium"
                >
                  كيف يعمل النظام
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-primary transition-colors font-medium"
                >
                  المميزات
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-primary transition-colors font-medium"
                >
                  لوحة التحكم
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="hover:text-primary transition-colors font-medium"
                >
                  تسجيل الدخول
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-right">
            <h5 className="font-bold text-lg">الشركة</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors font-medium"
                >
                  عن إنقذني
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors font-medium"
                >
                  الوظائف
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors font-medium"
                >
                  المدونة
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors font-medium"
                >
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-right">
            <h5 className="font-bold text-lg">قانوني</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors font-medium"
                >
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors font-medium"
                >
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors font-medium"
                >
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
