import { LoginForm } from "@/features/auth/components/login-form";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export const metadata = {
  title: "تسجيل الدخول - إنقذني",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Login Form */}
      <div className="flex flex-col items-center justify-center bg-white px-6 py-12 lg:px-16 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-right">
            <Link
              href="/"
              className="flex items-center gap-3 mb-4 group transition-transform hover:scale-105"
            >
              <Logo className="w-24 h-24" />

            </Link>
            <h1 className="text-4xl font-black text-foreground">
              مرحباً بك مجدداً
            </h1>
            <p className="text-muted-foreground text-lg">
              أدخل بياناتك للوصول إلى لوحة تحكم المستشفى
            </p>
          </div>

          <div className="bg-white rounded-3xl p-2 border border-border/50 shadow-2xl shadow-primary/5">
            <LoginForm />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link href="#" className="font-bold text-primary hover:underline">
              اطلب انضمام مستشفى
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visual/Branding (Hidden on mobile) */}
      <div className="hidden lg:block relative bg-primary overflow-hidden">
        <Image
          src="/images/hero-bg.png"
          alt="Hospital Admin"
          fill
          className="object-cover opacity-40 brightness-75 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-br from-primary/80 via-primary/60 to-secondary/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-16 text-right">
          <div className="space-y-6 max-w-md">
            <Logo className="w-20 h-20 mb-8 drop-shadow-2xl" />

            <h2 className="text-5xl font-black leading-tight">
              شريكك الموثوق في إدارة الكوارث والأزمات
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              انضم لأكثر من 150 مستشفى في مصر يعتمدون على "إنقذني" لربط المرضى
              بالرعاية الصحية في الوقت المناسب.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
