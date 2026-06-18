"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDictionary } from "@/components/providers/dictionary-provider";

type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
};

export function ContactForm() {
  const { dict } = useDictionary();
  const [loading, setLoading] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(2, dict.contactForm.validation.name),
    email: z.string().email(dict.contactForm.validation.email),
    phone: z.string().optional(),
    company: z.string().optional(),
    service: z.string().optional(),
    message: z.string().min(10, dict.contactForm.validation.message),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast.success(dict.contact.success);
      reset();
    } catch {
      toast.error(dict.contact.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{dict.contact.name} *</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{dict.contact.email} *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">{dict.contact.phone}</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">{dict.contact.company}</Label>
          <Input id="company" {...register("company")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">{dict.contact.serviceInterest}</Label>
        <Select onValueChange={(v) => setValue("service", v)}>
          <SelectTrigger id="service">
            <SelectValue placeholder={dict.contact.selectService} />
          </SelectTrigger>
          <SelectContent>
            {dict.services.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{dict.contact.message} *</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder={dict.contact.messagePlaceholder}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
        {loading ? dict.common.sending : dict.common.sendMessage}
      </Button>
    </form>
  );
}
