"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDictionary } from "@/components/providers/dictionary-provider";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  variant?: "default" | "footer";
}

export function Newsletter({ variant = "default" }: NewsletterProps) {
  const { dict } = useDictionary();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      toast.success(dict.newsletter.success);
      setEmail("");
    } catch {
      toast.error(dict.newsletter.error);
    } finally {
      setLoading(false);
    }
  }

  const isFooter = variant === "footer";

  return (
    <div>
      <h3
        className={cn(
          "mb-2 font-semibold",
          isFooter ? "text-sm tracking-wider uppercase" : "text-lg"
        )}
      >
        {dict.newsletter.title}
      </h3>
      <p
        className={cn(
          "mb-4 text-sm",
          isFooter ? "text-white/70" : "text-muted-foreground"
        )}
      >
        {dict.newsletter.description}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder={dict.newsletter.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={cn(
            isFooter &&
              "border-white/20 bg-white/10 text-white placeholder:text-white/50"
          )}
          aria-label="Email address"
        />
        <Button type="submit" disabled={loading} variant={isFooter ? "secondary" : "default"}>
          {loading ? "..." : dict.common.subscribe}
        </Button>
      </form>
    </div>
  );
}
