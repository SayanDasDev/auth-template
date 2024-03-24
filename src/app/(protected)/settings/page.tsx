"use client";

import { settings } from "@/actions/settings";
import { LoadingDots } from "@/components/shared/loading-dots";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { settingsSchema } from "@/schemas";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-succes";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    startTransition(() => {
      settings(values).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          update();
          setSuccess(data.success);
        }
      });
    });
  }

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      image: user?.image || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader className="text-xl text-center font-bold text-primary">
        <p>⚙️ Settings Page</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="SayanDasDev"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="https://github.com/sayandasdev.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={UserRole.USER}>User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            { !user?.isOAuth &&
             <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex !mt-6 flex-row bg-background items-center justify-between rounded-lg border border-input p-3 pl-2 pr-6 shadow-sm">
                  <div className="space-y-0.25">
                    <FormLabel>Two-Factor Authentication</FormLabel>
                    <FormDescription>
                      {field.value ? "Disable" : "Enable"} two-factor authentication for your account
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
              }
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-full !mt-6" disabled={isPending} size={"lg"}>
              {isPending ? <LoadingDots /> : "Update settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
