"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  FileText,
  FolderOpen,
  Mail,
  Users,
} from "lucide-react";

type AdminStats = {
  services: number;
  portfolio: number;
  blog: number;
  testimonials: number;
  team: number;
  contacts: number;
  newContacts: number;
};

const statConfig = [
  { key: "services", label: "Services", icon: Briefcase },
  { key: "portfolio", label: "Portfolio Items", icon: FolderOpen },
  { key: "blog", label: "Blog Posts", icon: FileText },
  { key: "testimonials", label: "Testimonials", icon: Users },
  { key: "team", label: "Team Members", icon: Users },
  { key: "contacts", label: "Contact Requests", icon: Mail },
] as const;

export function AdminDashboardStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load stats");
        return res.json();
      })
      .then(setStats)
      .catch(() => setError("Unable to load dashboard stats."));
  }, []);

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-destructive">{error}</CardContent>
      </Card>
    );
  }

  if (!stats) {
    return <p className="text-sm text-muted-foreground">Loading dashboard...</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {statConfig.map((item) => (
        <Card key={item.key}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.label}
            </CardTitle>
            <item.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats[item.key]}</p>
            {item.key === "contacts" && stats.newContacts > 0 && (
              <p className="mt-1 text-xs text-primary">
                {stats.newContacts} new request(s)
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
