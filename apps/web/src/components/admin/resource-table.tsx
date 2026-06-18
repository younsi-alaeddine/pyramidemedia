"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

type ResourceItem = {
  id: string;
  title?: string;
  name?: string;
  slug?: string;
  client?: string;
  company?: string;
  role?: string;
  status?: string;
};

type AdminResourceTableProps = {
  resource: string;
  titleKey?: "title" | "name";
  subtitleKey?: "client" | "company" | "slug" | "role";
};

export function AdminResourceTable({
  resource,
  titleKey = "title",
  subtitleKey = "client",
}: AdminResourceTableProps) {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/${resource}`);
      if (!res.ok) throw new Error("Failed to load items");
      setItems(await res.json());
    } catch {
      setError("Unable to load data from the API.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, [resource]);

  async function deleteItem(id: string) {
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`/api/admin/${resource}/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems((current) => current.filter((item) => item.id !== id));
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-border/60 p-6 text-center">
        <p className="text-sm text-destructive">{error}</p>
        <Button className="mt-4" variant="outline" onClick={loadItems}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {item[titleKey] ?? "—"}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {item[subtitleKey] ?? item.role ?? item.slug ?? "—"}
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{item.status ?? "PUBLISHED"}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteItem(item.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
