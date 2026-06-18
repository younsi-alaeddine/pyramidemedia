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
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ResourceEditor } from "@/components/admin/resource-editor";

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
  title?: string;
  description?: string;
  titleKey?: "title" | "name";
  subtitleKey?: "client" | "company" | "slug" | "role";
};

export function AdminResourceTable({
  resource,
  title,
  description,
  titleKey = "title",
  subtitleKey = "client",
}: AdminResourceTableProps) {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ResourceItem | null>(null);

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

  function openCreate() {
    setSelectedItem(null);
    setEditorOpen(true);
  }

  function openEdit(item: ResourceItem) {
    setSelectedItem(item);
    setEditorOpen(true);
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
    <div className="space-y-4">
      {(title || description) && (
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <Button onClick={openCreate}>
            <Plus className="mr-2 size-4" />
            Add
          </Button>
        </div>
      )}

      {!title && (
        <div className="flex justify-end">
          <Button onClick={openCreate}>
            <Plus className="mr-2 size-4" />
            Add
          </Button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/60 p-8 text-center">
          <p className="text-sm text-muted-foreground">No items yet.</p>
          <Button className="mt-4" variant="outline" onClick={openCreate}>
            Create the first one
          </Button>
        </div>
      ) : (
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
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(item)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ResourceEditor
        resource={resource}
        open={editorOpen}
        onOpenChange={setEditorOpen}
        item={selectedItem}
        onSaved={loadItems}
      />
    </div>
  );
}
