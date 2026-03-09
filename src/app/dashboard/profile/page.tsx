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

  const hospital = await prisma.hospital.findUnique({
    where: { id: session.hospitalId },
  });

  if (!hospital) return <div>Data error</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <h1 className="text-3xl font-bold text-primary mb-6">ملف المستشفى</h1>
      <ProfileForm hospital={hospital} />
    </div>
  );
}
