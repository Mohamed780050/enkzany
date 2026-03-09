import { UpdateHistory } from "@/generated/prisma/client";
import { Clock, Calendar, User } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function HistoryTable({ history }: { history: UpdateHistory[] }) {
  if (history.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-50/50 rounded-[2rem] border-2 border-dashed border-border/50">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
          <Clock size={32} />
        </div>
        <p className="text-xl font-bold text-foreground">لا يوجد سجل تحديثات</p>
        <p className="text-muted-foreground">
          سيظهر هنا تاريخ كافة التعديلات التي تجريها
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shadow-sm">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-foreground">
              سجل آخر التحديثات
            </h2>
            <p className="text-xs font-medium text-muted-foreground">
              متابعة التغييرات الأخيرة في المستشفى
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/history"
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 font-bold text-sm text-foreground hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <span>عرض الكل</span>
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <table className="w-full text-right border-separate border-spacing-y-3">
          <thead>
            <tr className="text-muted-foreground text-sm uppercase tracking-wider">
              <th className="font-black pb-4 pr-6">بواسطة</th>
              <th className="font-black pb-4 px-4 text-center">المجموع</th>
              <th className="font-black pb-4 px-4 text-center">طوارئ</th>
              <th className="font-black pb-4 px-4 text-center">عناية</th>
              <th className="font-black pb-4 px-4 text-center">عامة</th>
              <th className="font-black pb-4 pl-6 text-left">التاريخ والوقت</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr
                key={item.id}
                className="group bg-white hover:bg-zinc-50 transition-colors shadow-sm"
              >
                <td className="py-5 pr-6 rounded-r-3xl border-y border-r border-border/40 group-hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-3 min-w-[140px]">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-bold shadow-inner shrink-0">
                      {item.updatedBy[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-black text-foreground whitespace-nowrap">
                        {item.updatedBy}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        مسئول النظام
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-4 text-center border-y border-border/40 group-hover:border-primary/20 transition-colors">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 font-black text-foreground shadow-sm">
                    {item.bedsGeneral + item.bedsIcu + item.bedsEmergency}
                  </span>
                </td>
                <td className="py-5 px-4 text-center border-y border-border/40 group-hover:border-primary/20 transition-colors">
                  <span className="font-black text-warning bg-warning/5 px-3 py-1 rounded-lg border border-warning/10">
                    {item.bedsEmergency}
                  </span>
                </td>
                <td className="py-5 px-4 text-center border-y border-border/40 group-hover:border-primary/20 transition-colors">
                  <span className="font-black text-success bg-success/5 px-3 py-1 rounded-lg border border-success/10">
                    {item.bedsIcu}
                  </span>
                </td>
                <td className="py-5 px-4 text-center border-y border-border/40 group-hover:border-primary/20 transition-colors">
                  <span className="font-black text-primary bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">
                    {item.bedsGeneral}
                  </span>
                </td>
                <td className="py-5 pl-6 text-left rounded-l-3xl border-y border-l border-border/40 group-hover:border-primary/20 transition-colors min-w-[140px]">
                  <div className="font-bold text-foreground whitespace-nowrap">
                    {new Date(item.updatedAt).toLocaleTimeString("ar-EG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">
                    {new Date(item.updatedAt).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
