import { Bell, CreditCard, AlertCircle, Info } from "lucide-react";

export const metadata = {
  title: "الإشعارات - إنقذني",
};

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "تحديث ناجح",
      body: "تم تحديث أعداد الأسرة بنجاح اليوم بواسطة: Admin",
      time: "منذ ساعتين",
      type: "info",
      unread: true,
      icon: Info,
    },
    {
      id: 2,
      title: "تذكير بالتحديث",
      body: "يرجى العلم بأنه قد مر أكثر من 6 ساعات على آخر تحديث لبيانات المستشفى.",
      time: "أمس",
      type: "warning",
      unread: false,
      icon: AlertCircle,
    },
    {
      id: 3,
      title: "إشعار اشتراك",
      body: "اشتراك المستشفى يقترب من موعد الانتهاء، يرجى مراجعة صفحة الاشتراك.",
      time: "منذ 3 أيام",
      type: "subscription",
      unread: false,
      icon: CreditCard,
    },
    {
      id: 4,
      title: "تحديث في النظام",
      body: "قمنا بإضافة ميزة تصدير السجلات إلى ملفات CSV بناءً على طلبكم.",
      time: "منذ أسبوع",
      type: "system",
      unread: false,
      icon: Bell,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">الإشعارات</h1>
        <button className="text-sm font-medium text-secondary hover:underline">
          تحديد الكل كمقروء
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => {
          const isWarning = n.type === "warning";
          return (
            <div
              key={n.id}
              className={`flex items-start gap-4 p-5 rounded-xl border bg-white shadow-sm transition-colors ${
                n.unread
                  ? "border-r-4 border-r-primary"
                  : "border-r-4 border-r-transparent"
              } ${isWarning && n.unread ? "border-r-warning bg-warning/5" : ""}`}
            >
              <div
                className={`mt-1 p-2 rounded-full ${isWarning ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"}`}
              >
                <n.icon size={20} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={`font-bold text-lg ${n.unread ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {n.title}
                  </h3>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {n.time}
                  </span>
                </div>
                <p
                  className={`text-sm ${n.unread ? "text-foreground/90 font-medium" : "text-muted-foreground"}`}
                >
                  {n.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
