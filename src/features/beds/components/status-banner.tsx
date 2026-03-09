import { Hospital } from "@prisma/client";
import { AlertCircle, Clock } from "lucide-react";

export function StatusBanner({ hospital }: { hospital: Hospital }) {
  const totalBeds =
    hospital.bedsGeneral + hospital.bedsIcu + hospital.bedsEmergency;

  let statusText = "ممتلئ";
  let statusColor = "bg-destructive/10 text-destructive border-destructive/20";
  let dotColor = "bg-destructive";

  if (totalBeds > 5) {
    statusText = "متاح";
    statusColor = "bg-success/15 text-success border-success/30";
    dotColor = "bg-success";
  } else if (totalBeds > 0) {
    statusText = "محدود";
    statusColor = "bg-warning/15 text-warning border-warning/30";
    dotColor = "bg-warning";
  }

  const timeSinceUpdate = Math.floor(
    (new Date().getTime() - new Date(hospital.lastUpdate).getTime()) / 60000,
  );
  const isStale = timeSinceUpdate > 360; // 6 hours

  // Format relative time helper
  const rtf = new Intl.RelativeTimeFormat("ar-EG", { numeric: "auto" });
  let timeText = "";
  if (timeSinceUpdate < 1) timeText = "الآن";
  else if (timeSinceUpdate < 60) timeText = `منذ ${timeSinceUpdate} دقيقة`;
  else {
    const hours = Math.floor(timeSinceUpdate / 60);
    timeText = `منذ ${hours} ساعة`;
  }

  return (
    <div className="space-y-4">
      {isStale && (
        <div className="flex items-center gap-2 p-3 bg-warning/20 border border-warning/30 text-warning-foreground rounded-lg font-bold">
          <AlertCircle size={20} className="text-warning" />
          <span>
            تحذير: لم يتم التحديث منذ أكثر من 6 ساعات يرجى تحديث البيانات لضمان
            دقتها
          </span>
        </div>
      )}

      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl shadow-sm ${statusColor}`}
      >
        <div className="flex items-center gap-3 font-bold text-lg">
          <div
            className={`w-3 h-3 rounded-full ${dotColor} animate-pulse relative`}
          >
            <div
              className={`absolute inset-0 rounded-full ${dotColor} animate-ping opacity-75`}
            ></div>
          </div>
          <span>الحالة الحالية: {statusText}</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium mt-2 sm:mt-0 opacity-80">
          <Clock size={16} />
          <span>آخر تحديث: {timeText}</span>
        </div>
      </div>
    </div>
  );
}
