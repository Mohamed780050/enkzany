import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { StatusBanner } from "@/features/beds/components/status-banner";
import { BedUpdatePanel } from "@/features/beds/components/update-panel";
import { HistoryTable } from "@/features/history/components/history-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const metadata = {
  title: "لوحة التحكم - إنقذني",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // Find the first hospital owned by this user
  const hospital = await prisma.hospital.findFirst({
    where: { adminId: session.user.id },
  });

  if (!hospital) {
    // User has no hospital yet — prompt them to add one
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
          <PlusCircle size={48} />
        </div>
        <h2 className="text-3xl font-extrabold text-foreground">
          لم تسجل مستشفاك بعد
        </h2>
        <p className="text-muted-foreground text-lg max-w-md">
          أضف بيانات مستشفاك لبدء إدارة توفر الأسرة وتحديثها للمرضى.
        </p>
        <Link href="/dashboard/add-hospital">
          <Button
            size="lg"
            className="rounded-full px-10 py-6 text-lg font-bold h-auto shadow-xl shadow-primary/20"
          >
            <PlusCircle className="ml-2" size={20} />
            إضافة مستشفى
          </Button>
        </Link>
      </div>
    );
  }

  const history = await prisma.updateHistory.findMany({
    where: { hospitalId: hospital.id },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <StatusBanner hospital={hospital} />

      <div className="grid grid-cols-1 gap-6">
        <BedUpdatePanel hospital={hospital} />

        <div className="bg-white rounded-xl shadow-sm border border-border p-6 mt-4">
          <HistoryTable history={history} />
        </div>
      </div>
    </div>
  );
}
