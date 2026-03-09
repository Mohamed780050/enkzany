import { Suspense } from "react";
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

  const hospital = await prisma.hospital.findUnique({
    where: { id: session.hospitalId },
  });

  if (!hospital) {
    // Fallback if not seeded properly
    return <div>Hospital not found. Please run db seed.</div>;
  }

  const history = await prisma.updateHistory.findMany({
    where: { hospitalId: session.hospitalId },
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
