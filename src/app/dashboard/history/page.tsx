import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, Filter, User, Calendar } from "lucide-react";

export const metadata = {
  title: "سجل التحديثات - إنقذني",
};

export default async function HistoryPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const hospital = await prisma.hospital.findFirst({
    where: { adminId: session.user.id },
  });

  if (!hospital) redirect("/dashboard");

  const history = await prisma.updateHistory.findMany({
    where: { hospitalId: hospital.id },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">
            سجل التحديثات الكامل
          </h1>
          <p className="text-muted-foreground font-bold text-lg">
            أرشيف كافة تعديلات القدرة الاستيعابية
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none lg:w-48">
            <Calendar
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input
              type="date"
              className="h-10 pr-10 rounded-xl bg-white border-border shadow-sm focus:ring-primary/10"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <Button
            variant="outline"
            className="h-10 rounded-xl px-4 font-black gap-2 border-border shadow-sm"
          >
            <Search size={16} />
            بحث
          </Button>
          <Button
            variant="secondary"
            className="h-10 rounded-xl px-4 font-black flex gap-2 shadow-sm"
          >
            <Download size={16} />
            تصدير تقرير
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border/40 overflow-hidden ring-1 ring-border/5">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/80">
              <TableRow className="hover:bg-transparent border-b border-border/50">
                <TableHead className="h-16 text-foreground font-black text-right px-8">
                  التاريخ والوقت
                </TableHead>
                <TableHead className="h-16 text-foreground font-black text-center">
                  عامة
                </TableHead>
                <TableHead className="h-16 text-foreground font-black text-center">
                  عناية مركزة
                </TableHead>
                <TableHead className="h-16 text-foreground font-black text-center">
                  طوارئ
                </TableHead>
                <TableHead className="h-16 text-foreground font-black text-center bg-zinc-100/30">
                  المجموع
                </TableHead>
                <TableHead className="h-16 text-foreground font-black text-left px-8">
                  بواسطة
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-20 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Filter size={48} className="opacity-20 mb-2" />
                      <p className="text-xl font-bold text-foreground">
                        لا توجد بيانات مطابقة
                      </p>
                      <p>جرّب تغيير معايير البحث أو التاريخ</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                history.map((record, i) => {
                  const total =
                    record.bedsGeneral + record.bedsIcu + record.bedsEmergency;
                  const date = new Date(record.updatedAt);
                  const timeFormatted = date.toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const dateFormatted = date.toLocaleDateString("ar-EG");

                  return (
                    <TableRow
                      key={record.id}
                      className="group hover:bg-zinc-50/50 transition-colors border-b border-border/30 last:border-0"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-foreground text-base tracking-tight">
                            {timeFormatted}
                          </span>
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            {dateFormatted}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-700 font-black text-lg shadow-sm border border-blue-100">
                          {record.bedsGeneral}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-50 text-purple-700 font-black text-lg shadow-sm border border-purple-100">
                          {record.bedsIcu}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-700 font-black text-lg shadow-sm border border-red-100">
                          {record.bedsEmergency}
                        </span>
                      </TableCell>
                      <TableCell className="text-center bg-zinc-100/30">
                        <span className="text-2xl font-black text-foreground">
                          {total}
                        </span>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-left">
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-sm font-black text-foreground">
                            {record.updatedBy}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 shadow-inner">
                            <User size={18} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {history.length > 0 && (
          <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50/50 border-t border-border/50">
            <div className="text-sm font-bold text-muted-foreground">
              عرض {history.length} من السجلات الأخيرة
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-6 rounded-xl font-black shadow-sm disabled:opacity-30"
                disabled
              >
                السابق
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-6 rounded-xl font-black shadow-sm disabled:opacity-30"
                disabled
              >
                التالي
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
