import { LoginForm } from "@/features/auth/components/login-form";

export const metadata = {
  title: "تسجيل الدخول - إنقذني",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}
