"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type SeoSettings = {
  siteTitle: string;
  siteDescription: string;
  ogImage?: string | null;
  twitterHandle?: string | null;
  googleAnalytics?: string | null;
};

export function AdminSeoForm() {
  const [settings, setSettings] = useState<SeoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load SEO settings");
        return res.json();
      })
      .then(setSettings)
      .catch(() => toast.error("Unable to load SEO settings"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success("SEO settings saved — the public site will refresh shortly.");
    } catch {
      toast.error("Unable to save SEO settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return <p className="text-sm text-muted-foreground">Loading SEO settings...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="siteTitle">Site Title</Label>
        <Input
          id="siteTitle"
          value={settings.siteTitle}
          onChange={(event) =>
            setSettings({ ...settings, siteTitle: event.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="siteDescription">Site Description</Label>
        <Textarea
          id="siteDescription"
          rows={3}
          value={settings.siteDescription}
          onChange={(event) =>
            setSettings({ ...settings, siteDescription: event.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ogImage">Default OG Image URL</Label>
        <Input
          id="ogImage"
          value={settings.ogImage ?? ""}
          onChange={(event) =>
            setSettings({ ...settings, ogImage: event.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="twitterHandle">Twitter / X handle</Label>
        <Input
          id="twitterHandle"
          placeholder="@pyramidemedia"
          value={settings.twitterHandle ?? ""}
          onChange={(event) =>
            setSettings({ ...settings, twitterHandle: event.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="analytics">Google Analytics ID</Label>
        <Input
          id="analytics"
          placeholder="G-XXXXXXXXXX"
          value={settings.googleAnalytics ?? ""}
          onChange={(event) =>
            setSettings({ ...settings, googleAnalytics: event.target.value })
          }
        />
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
