"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "lines";

export type ResourceField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  rows?: number;
};

export const resourceFieldConfigs: Record<string, ResourceField[]> = {
  services: [
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "shortDescription", label: "Short description", type: "textarea", rows: 2, required: true },
    { name: "description", label: "Description", type: "textarea", rows: 5, required: true },
    { name: "icon", label: "Icon key", type: "text", placeholder: "globe" },
    { name: "features", label: "Features (one per line)", type: "lines" },
    { name: "order", label: "Display order", type: "number" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["PUBLISHED", "DRAFT", "ARCHIVED"],
    },
  ],
  portfolio: [
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "client", label: "Client", type: "text", required: true },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", rows: 5, required: true },
    { name: "technologies", label: "Technologies (one per line)", type: "lines" },
    { name: "images", label: "Image URLs (one per line)", type: "lines" },
    { name: "caseStudyUrl", label: "Case study URL", type: "text", placeholder: "/case-studies/my-project" },
    { name: "featured", label: "Featured on homepage", type: "boolean" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["PUBLISHED", "DRAFT", "ARCHIVED"],
    },
  ],
  blog: [
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "excerpt", label: "Excerpt", type: "textarea", rows: 2, required: true },
    { name: "content", label: "Content", type: "textarea", rows: 10, required: true },
    { name: "coverImage", label: "Cover image URL", type: "text" },
    { name: "tags", label: "Tags (one per line)", type: "lines" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["PUBLISHED", "DRAFT", "ARCHIVED"],
    },
  ],
  testimonials: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "role", label: "Role", type: "text", required: true },
    { name: "company", label: "Company", type: "text", required: true },
    { name: "quote", label: "Quote", type: "textarea", rows: 4, required: true },
    { name: "rating", label: "Rating (1-5)", type: "number" },
    { name: "featured", label: "Featured on homepage", type: "boolean" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["PUBLISHED", "DRAFT", "ARCHIVED"],
    },
  ],
  team: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "role", label: "Role", type: "text", required: true },
    { name: "bio", label: "Bio", type: "textarea", rows: 4, required: true },
    { name: "photo", label: "Photo URL", type: "text" },
    { name: "order", label: "Display order", type: "number" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["PUBLISHED", "DRAFT", "ARCHIVED"],
    },
  ],
};

type ResourceEditorProps = {
  resource: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: Record<string, unknown> | null;
  onSaved: () => void;
};

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function arrayToLines(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function itemToFormValues(
  fields: ResourceField[],
  item?: Record<string, unknown> | null,
) {
  const values: Record<string, string | boolean> = {};

  for (const field of fields) {
    const raw = item?.[field.name];

    if (field.type === "lines") {
      values[field.name] = arrayToLines(raw);
    } else if (field.type === "boolean") {
      values[field.name] = Boolean(raw);
    } else if (field.type === "number") {
      values[field.name] = raw != null ? String(raw) : "0";
    } else if (field.type === "select") {
      values[field.name] = String(raw ?? field.options?.[0] ?? "");
    } else {
      values[field.name] = raw != null ? String(raw) : "";
    }
  }

  return values;
}

function formValuesToPayload(
  fields: ResourceField[],
  values: Record<string, string | boolean>,
  resource: string,
  isEditing: boolean,
) {
  const payload: Record<string, unknown> = {};

  for (const field of fields) {
    const value = values[field.name];

    if (field.type === "lines") {
      payload[field.name] = linesToArray(String(value));
    } else if (field.type === "boolean") {
      payload[field.name] = Boolean(value);
    } else if (field.type === "number") {
      payload[field.name] = Number(value) || 0;
    } else if (field.type === "select" || field.type === "text" || field.type === "textarea") {
      const text = String(value).trim();
      if (text || field.required) payload[field.name] = text;
    }
  }

  if (
    resource === "blog" &&
    payload.status === "PUBLISHED" &&
    !isEditing
  ) {
    payload.publishedAt = new Date().toISOString();
  }

  return payload;
}

export function ResourceEditor({
  resource,
  open,
  onOpenChange,
  item,
  onSaved,
}: ResourceEditorProps) {
  const fields = resourceFieldConfigs[resource] ?? [];
  const isEditing = Boolean(item?.id);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setValues(itemToFormValues(fields, item));
    }
  }, [open, item, fields]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = formValuesToPayload(fields, values, resource, isEditing);
      const url = isEditing
        ? `/api/admin/${resource}/${item?.id}`
        : `/api/admin/${resource}`;
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Save failed");
      }

      toast.success(isEditing ? "Updated successfully" : "Created successfully");
      onOpenChange(false);
      onSaved();
    } catch {
      toast.error("Unable to save changes");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit item" : "Add item"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "textarea" || field.type === "lines" ? (
                <Textarea
                  id={field.name}
                  rows={field.rows ?? 4}
                  value={String(values[field.name] ?? "")}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  className="flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  value={String(values[field.name] ?? "")}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "boolean" ? (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    id={field.name}
                    type="checkbox"
                    checked={Boolean(values[field.name])}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [field.name]: event.target.checked,
                      }))
                    }
                  />
                  Enabled
                </label>
              ) : (
                <Input
                  id={field.name}
                  type={field.type === "number" ? "number" : "text"}
                  placeholder={field.placeholder}
                  value={String(values[field.name] ?? "")}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                  required={field.required}
                />
              )}
            </div>
          ))}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
