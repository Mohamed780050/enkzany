import { UpdateHistory } from "@prisma/client";
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
import { ArrowLeft } from "lucide-react";

export function HistoryTable({ history }: { history: UpdateHistory[] }) {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        لا يوجد سجل للتحديثات بعد
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-primary">سجل آخر التحديثات</h2>
        <Link
          href="/dashboard/history"
          className="text-sm font-medium text-secondary hover:underline flex items-center gap-1"
        >
          <span>عرض الكل</span>
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-primary hover:bg-primary">
            <TableRow>
              <TableHead className="text-primary-foreground font-bold text-right py-3 pr-4">
                التاريخ والوقت
              </TableHead>
              <TableHead className="text-primary-foreground font-bold text-center">
                عامة
              </TableHead>
              <TableHead className="text-primary-foreground font-bold text-center">
                عناية مركزة
              </TableHead>
              <TableHead className="text-primary-foreground font-bold text-center">
                طوارئ
              </TableHead>
              <TableHead className="text-primary-foreground font-bold text-center">
                المجموع
              </TableHead>
              <TableHead className="text-primary-foreground font-bold text-left pl-4">
                بواسطة
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

              // Alternating row backgrounds
              const rowClass = i % 2 !== 0 ? "bg-accent/30" : "";

              return (
                <TableRow key={record.id} className={rowClass}>
                  <TableCell className="font-medium pr-4">
                    <div className="flex flex-col">
                      <span>{timeFormatted}</span>
                      <span className="text-xs text-muted-foreground">
                        {dateFormatted}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-semibold text-lg">
                    {record.bedsGeneral}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-lg text-primary">
                    {record.bedsIcu}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-lg text-destructive">
                    {record.bedsEmergency}
                  </TableCell>
                  <TableCell className="text-center font-bold text-lg bg-accent/50">
                    {total}
                  </TableCell>
                  <TableCell className="text-left pl-4">
                    <Badge variant="outline" className="bg-white">
                      {record.updatedBy}
                    </Badge>
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
