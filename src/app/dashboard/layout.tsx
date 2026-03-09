import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#F4F8FB] text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col md:pr-64">
        <Header />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
