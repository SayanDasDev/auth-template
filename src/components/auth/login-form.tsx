"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
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
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { FromError } from "../shared/form-error";
import { FromSuccess } from "../shared/form-succes";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { LoadingDots } from "../shared/loading-dots";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>(""); 
  const [success, setSuccess] = useState<string | undefined>(""); 

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
            setError(data.error);
            setSuccess(data.success);
          }
        )
    });
  };

  return (
    <>
      <CardWrapper
        headerLabel="Welcome back!"
        backButtonLabel="Don't have an account yet?"
        backButtonHref="/register"
        showSocial
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={isPending}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FromError message={error} />
            <FromSuccess message={success} />
            <Button
              disabled={isPending}
              className="w-full h-10 !mt-6 text-md rounded-sm"
            >
              {isPending ? <LoadingDots /> : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};