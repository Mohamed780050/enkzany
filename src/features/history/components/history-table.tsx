import { UpdateHistory } from "@/generated/prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";

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

      <div className="rounded-[2rem] border border-border/50 bg-white overflow-hidden shadow-sm ring-1 ring-border/5">
        <Table>
          <TableHeader className="bg-zinc-50/80">
            <TableRow className="hover:bg-transparent border-b border-border/50">
              <TableHead className="h-14 text-foreground font-black text-right px-6">
                التاريخ والوقت
              </TableHead>
              <TableHead className="h-14 text-foreground font-black text-center">
                عامة
              </TableHead>
              <TableHead className="h-14 text-foreground font-black text-center">
                مركزة
              </TableHead>
              <TableHead className="h-14 text-foreground font-black text-center">
                طوارئ
              </TableHead>
              <TableHead className="h-14 text-foreground font-black text-center bg-zinc-100/30">
                المجموع
              </TableHead>
              <TableHead className="h-14 text-foreground font-black text-left px-6">
                الباحث
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((record, i) => {
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
                  <TableCell className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-foreground text-sm">
                        {timeFormatted}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {dateFormatted}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-700 font-black">
                      {record.bedsGeneral}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-50 text-purple-700 font-black">
                      {record.bedsIcu}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-700 font-black">
                      {record.bedsEmergency}
                    </span>
                  </TableCell>
                  <TableCell className="text-center bg-zinc-100/30">
                    <span className="text-lg font-black text-foreground">
                      {total}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-left">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-xs font-black text-foreground">
                        {record.updatedBy}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                        <User size={14} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
