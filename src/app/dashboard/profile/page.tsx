import { ProfileForm } from "@/features/hospital/components/profile-form";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "ملف المستشفى - إنقذني",
};

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const hospital = await prisma.hospital.findFirst({
    where: { adminId: session.user.id },
  });

  if (!hospital) return <div>Data error</div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-foreground tracking-tight">
          ملف المستشفى
        </h1>
        <p className="text-muted-foreground font-medium text-lg">
          إدارة البيانات التعريفية والتواصل الخاصة بالمستشفى
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl shadow-primary/5">
        <ProfileForm hospital={hospital} />
      </div>
    </div>
  );
}
