"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../shared/form-error";
import { FormSuccess } from "../shared/form-succes";
import { useState, useTransition } from "react";
import { LoadingDots } from "../shared/loading-dots";
import { FormWarning } from "../shared/form-warning";
import { resetPassword } from "@/actions/reset-password";

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [warning, setWarning] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");
    setWarning("");
    
    startTransition(() => {
      resetPassword(values).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }

        if (data?.success) {
          form.reset();
          setSuccess(data.success);
        }

        if (data?.warning) {
          form.reset();
          setWarning(data.warning);
        }
      });
    });
  };

  return (
    <>
      <CardWrapper
        headerLabel="Forgot your password?"
        backButtonLabel="Back to login"
        backButtonHref="/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="auth@ex.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <FormWarning message={warning} />
            <Button
              disabled={isPending}
              className="w-full h-10 !mt-6 text-md rounded-sm"
            >
              {isPending ? <LoadingDots /> : "Send Reset Email"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
