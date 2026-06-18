"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderOpen,
  MessageSquareQuote,
  Users,
  Search,
  Mail,
  Settings,
  Menu,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { AdminLogoutButton } from "@/components/admin/logout-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Pages", href: "/admin/pages", icon: FileText },
  { title: "Services", href: "/admin/services", icon: Briefcase },
  { title: "Portfolio", href: "/admin/portfolio", icon: FolderOpen },
  { title: "Blog", href: "/admin/blog", icon: FileText },
  { title: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { title: "Team", href: "/admin/team", icon: Users },
  { title: "SEO Settings", href: "/admin/seo", icon: Search },
  { title: "Contact Requests", href: "/admin/contacts", icon: Mail },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-4">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <item.icon className="size-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-16 items-center border-b border-border px-4">
        <Logo variant="compact" size="md" />
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
      <div className="border-t border-border p-4">
        <AdminLogoutButton />
      </div>
    </aside>
  );
}

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center border-b border-border px-4">
              <Logo variant="compact" size="md" />
            </div>
            <SidebarNav />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold lg:hidden">Admin</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button asChild variant="outline" size="sm">
          <Link href="/">View Site</Link>
        </Button>
      </div>
    </header>
  );
}
