import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar, AdminHeader } from "@/components/admin/sidebar";
import { ADMIN_TOKEN_COOKIE, getAdminProfile } from "@/lib/admin-auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    await getAdminProfile(token);
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
