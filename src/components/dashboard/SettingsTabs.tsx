"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicSettingsSchema } from "@/lib/validations";
import type { ClinicSettings } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ClinicSettingsInput = z.infer<typeof ClinicSettingsSchema>;

export default function SettingsTabs({
  initialSettings,
}: {
  initialSettings: ClinicSettings | null;
}) {
  const [settings, setSettings] = useState(initialSettings);

  const form = useForm<ClinicSettingsInput>({
    resolver: zodResolver(ClinicSettingsSchema) as never,
    defaultValues: {
      clinic_name: settings?.clinic_name ?? "My Dental Clinic",
      address: settings?.address ?? "",
      phone: settings?.phone ?? "",
      email: settings?.email ?? "",
      business_hours: settings?.business_hours ?? {
        monday: { open: "09:00", close: "17:00", closed: false },
        tuesday: { open: "09:00", close: "17:00", closed: false },
        wednesday: { open: "09:00", close: "17:00", closed: false },
        thursday: { open: "09:00", close: "17:00", closed: false },
        friday: { open: "09:00", close: "17:00", closed: false },
        saturday: { open: "09:00", close: "13:00", closed: false },
        sunday: { open: "09:00", close: "13:00", closed: true },
      },
    },
  });

  useEffect(() => {
    if (initialSettings) {
      form.reset({
        clinic_name: initialSettings.clinic_name,
        address: initialSettings.address ?? "",
        phone: initialSettings.phone ?? "",
        email: initialSettings.email ?? "",
        business_hours: initialSettings.business_hours,
      });
    }
  }, [initialSettings, form]);

  async function onProfileSubmit(values: ClinicSettingsInput) {
    const res = await fetch("/api/dashboard/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      toast.success("Settings saved");
      setSettings((s) => (s ? { ...s, ...values } : null));
    } else toast.error("Failed to save");
  }

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList>
        <TabsTrigger value="profile">Clinic Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onProfileSubmit)}
            className="space-y-4 max-w-lg"
          >
            <FormField
              control={form.control}
              name="clinic_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
