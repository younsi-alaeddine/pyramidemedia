"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 text-muted-foreground"
      onClick={handleLogout}
    >
      <LogOut className="size-4" />
      Sign Out
    </Button>
  );
}
