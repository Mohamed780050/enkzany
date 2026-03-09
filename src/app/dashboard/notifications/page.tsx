import {
  Bell,
  CreditCard,
  AlertCircle,
  Info,
  CheckCheck,
  Zap,
  ShieldIcon,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "الإشعارات - إنقذني",
};

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "تحديث ناجح للبيانات",
      body: "تم تحديث أعداد الأسرة المتاحة بنجاح اليوم. شكراً لاحترافيتكم في المتابعة.",
      time: "منذ ساعتين",
      type: "info",
      unread: true,
      icon: Info,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: 2,
      title: "تنبيه: مضى وقت طويل!",
      body: "لم يتم تحديث بيانات الأسرة منذ أكثر من 6 ساعات. يرجى التحديث الآن لضمان دقة المعلومات للمرضى.",
      time: "أمس",
      type: "warning",
      unread: false,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      id: 3,
      title: "قرب انتهاء الاشتراك",
      body: "باقة 'المستشفى المحترف' الخاصة بكم تنتهي خلال 3 أيام. يرجى التجديد لضمان استمرار الأولوية في البحث.",
      time: "منذ 3 أيام",
      type: "subscription",
      unread: false,
      icon: CreditCard,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      id: 4,
      title: "ميزة جديدة: تصدير التقارير",
      body: "يمكنكم الآن تصدير كافة سجلات التحديثات بصيغة CSV و PDF مباشرة من صفحة السجل.",
      time: "منذ أسبوع",
      type: "system",
      unread: false,
      icon: Zap,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">
            الإشعارات
          </h1>
          <p className="text-muted-foreground font-medium text-lg">
            تابع آخر المستجدات والتنبيهات الخاصة بمستشفاك
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-xl font-bold bg-white shadow-sm border-border/50 hover:bg-primary/5 hover:text-primary transition-all gap-2"
        >
          <CheckCheck size={18} />
          تحديد الكل كمقروء
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50/50 rounded-[2.5rem] border-2 border-dashed border-border/50">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-border/20 text-muted-foreground">
              <Bell size={40} className="opacity-20" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2">
              صندوق الإشعارات فارغ
            </h3>
            <p className="text-muted-foreground font-medium">
              لا توجد تنبيهات جديدة في الوقت الحالي
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`group relative flex items-start gap-6 p-6 rounded-[2rem] transition-all border-none ${
                n.unread
                  ? "bg-white shadow-2xl shadow-primary/5 ring-1 ring-primary/10"
                  : "bg-zinc-50/50 opacity-80 hover:opacity-100 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50"
              }`}
            >
              {n.unread && (
                <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-primary/20 animate-pulse" />
              )}

              <div
                className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${n.bg} ${n.color}`}
              >
                <n.icon size={28} />
              </div>

              <div className="flex-1 space-y-1 pr-2">
                <div className="flex justify-between items-start gap-4">
                  <h3
                    className={`text-xl font-black tracking-tight ${n.unread ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {n.title}
                  </h3>
                  <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">
                    {n.time}
                  </span>
                </div>
                <p
                  className={`text-lg leading-relaxed ${n.unread ? "text-foreground/80 font-bold" : "text-muted-foreground font-medium"}`}
                >
                  {n.body}
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <Button
                    variant="link"
                    className="p-0 h-auto font-black text-xs text-primary/60 hover:text-primary hover:no-underline gap-1"
                  >
                    عرض التفاصيل
                    <ShieldIcon size={14} />
                  </Button>
                  <div className="h-1 w-1 bg-zinc-300 rounded-full" />
                  <Button
                    variant="link"
                    className="p-0 h-auto font-black text-xs text-muted-foreground/60 hover:text-destructive hover:no-underline gap-1"
                  >
                    حذف الإشعار
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-12 p-8 bg-zinc-100/50 rounded-[2.5rem] border border-border/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-border/20 text-primary">
            <MessageSquare size={24} />
          </div>
          <div>
            <h4 className="font-black text-foreground">هل لديك استفسار؟</h4>
            <p className="text-sm text-muted-foreground font-medium">
              فريق الدعم الفني جاهز لمساعدتكم دائماً
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          className="w-full md:w-auto px-8 h-12 rounded-xl font-black shadow-sm"
        >
          تواصل مع الدعم
        </Button>
      </div>
    </div>
  );
}
