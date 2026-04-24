import { Hospital } from "@/generated/prisma/client";
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export function StatusBanner({ hospital }: { hospital: Hospital }) {
  const totalBeds =
    hospital.bedsGeneral + hospital.bedsIcu + hospital.bedsEmergency;

  let status = {
    label: "متاح بالكامل",
    color: "bg-success text-white shadow-success/20",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
    icon: CheckCircle2,
    subText: "المستشفى جاهز لاستقبال الحالات الجديدة",
  };

  if (totalBeds === 0) {
    status = {
      label: "ممتلئ تماماً",
      color: "bg-destructive text-white shadow-destructive/20",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      icon: XCircle,
      subText: "لا توجد أسرة شاغرة حالياً في كافة الأقسام",
    };
  } else if (totalBeds < 5) {
    status = {
      label: "قدرة محدودة",
      color: "bg-warning text-white shadow-warning/20",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      icon: AlertTriangle,
      subText: "تنبيه: عدد الأسرة الشاغرة قليل جداً",
    };
  }

  const lastUpdate = new Date(hospital.lastUpdate);
  const timeSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 60000,
  );
  const hoursSinceUpdate = Math.floor(timeSinceUpdate / 60);
  const isStale = hoursSinceUpdate >= 6;

  let timeText = "";
  if (timeSinceUpdate < 1) timeText = "الآن";
  else if (timeSinceUpdate < 60) timeText = `منذ ${timeSinceUpdate} دقيقة`;
  else timeText = `منذ ${hoursSinceUpdate} ساعة`;

  return (
    <FadeIn>
      <div
        className={`relative overflow-hidden rounded-[2rem] border ${status.borderColor} ${status.bgColor} p-8 shadow-sm transition-all hover:shadow-md group`}
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="flex items-start gap-6">
            <div
              className={`p-4 rounded-2xl ${status.color} shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}
            >
              <status.icon size={32} />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-foreground tracking-tight">
                {status.label}
              </h2>
              <p className="text-muted-foreground font-medium">
                {status.subText}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-3 text-right">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border/50 text-sm font-bold shadow-sm">
              <Clock
                size={16}
                className={isStale ? "text-destructive" : "text-primary"}
              />
              <span className={isStale ? "text-destructive" : "text-foreground"}>
                آخر تحديث: {timeText}
              </span>
            </div>

            {isStale && (
              <div className="flex items-center gap-2 text-destructive animate-pulse text-xs font-black uppercase tracking-widest bg-destructive/10 px-3 py-1 rounded-full border border-destructive/20">
                <AlertCircle size={14} />
                يرجى تحديث البيانات فوراً
              </div>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
