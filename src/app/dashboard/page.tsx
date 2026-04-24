import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { StatusBanner } from "@/features/beds/components/status-banner";
import { BedUpdatePanel } from "@/features/beds/components/update-panel";
import { HistoryTable } from "@/features/history/components/history-table";

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
    redirect("/onboarding");
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
