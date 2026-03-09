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
import { Download } from "lucide-react";

export const metadata = {
  title: "سجل التحديثات - إنقذني",
};

export default async function HistoryPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const history = await prisma.updateHistory.findMany({
    where: { hospitalId: session.hospitalId },
    orderBy: { updatedAt: "desc" },
    take: 50, // Mock pagination for demo
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">
          سجل التحديثات الكامل
        </h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            type="date"
            className="w-auto"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
          <Button variant="outline" className="shrink-0 font-medium">
            بحث / Search
          </Button>
          <Button
            variant="secondary"
            className="shrink-0 font-medium flex gap-2"
          >
            <Download size={16} />
            تصدير CSV
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border p-6 overflow-hidden">
        <div className="overflow-x-auto">
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
              {history.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-muted-foreground"
                  >
                    لا يوجد سجل للتحديثات بعد
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
                })
              )}
            </TableBody>
          </Table>
        </div>

        {history.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground pt-4 border-t">
            <div>عرض {history.length} من السجلات</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                السابق
              </Button>
              <Button variant="outline" size="sm" disabled>
                التالي
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
