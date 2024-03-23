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
import { FormError } from "../shared/form-error";
import { FormSuccess } from "../shared/form-succes";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { LoadingDots } from "../shared/loading-dots";
import { FormWarning } from "../shared/form-warning";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { OTPInput } from "input-otp";
import FakeDash from "../ui/fake-dash";
import Slot from "../ui/otp-input-slot";
import { resendCode } from "@/actions/resend-2FA-code";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const [twoFA, setTwoFA] = useState(false);

  // this part does not make sense but works
  const searchParams = useSearchParams();
  const isRedirected = searchParams.get("callbackUrl");
  const urlError = isRedirected
    ? "You already have an account with this email."
    : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [warning, setWarning] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [resendTimeout, setResendTimeout] = useState(0);

  const handleResendCode = () => {
    setResendTimeout(60);

    resendCode(form.getValues("email"))
      .then((data) => {
        if (data?.error) {
          setSuccess("")
          setWarning("")
          setError(data.error);
        }
        
        if (data?.success) {
          setError("");
          setWarning("");
          setSuccess(data.success);
        }
      })
      .catch(() => {
        setError("Somthing went wrong!");
      });

    const timer = setInterval(() => {
      setResendTimeout((prevTimeout) => {
        if (prevTimeout <= 1) {
          clearInterval(timer);
          return 0;
        } else {
          return prevTimeout - 1;
        }
      });
    }, 1000);
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setWarning("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data?.success) {
            setSuccess(data.success);
          }

          if (data?.warning) {
            setWarning(data.warning);
          }

          if (data?.twoFactor) {
            setTwoFA(true);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <>
      <CardWrapper
        headerLabel={twoFA ? "2-Factor Authentication" : "Welcome back!"}
        backButtonLabel="Don't have an account yet?"
        backButtonHref="/register"
        showSocial={!twoFA}
        showBackButton={!twoFA}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {twoFA && (
              <>
                <p className="text-center text-border">
                  Enter the 2FA code sent to&nbsp;
                  {form.getValues("email") ? (
                    <span className="text-primary font-semibold">
                      {form.getValues("email")}
                    </span>
                  ) : (
                    "your email"
                  )}
                  .
                </p>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <OTPInput
                            {...field}
                            maxLength={6}
                            onComplete={form.handleSubmit(onSubmit)}
                            containerClassName="group flex justify-center !mb-3 items-center has-[:disabled]:opacity-30"
                            render={({ slots }) => (
                              <>
                                <div className="flex bg-background rounded-md">
                                  {slots.slice(0, 3).map((slot, idx) => (
                                    <Slot key={idx} {...slot} />
                                  ))}
                                </div>

                                <FakeDash />

                                <div className="flex bg-background rounded-md">
                                  {slots.slice(3).map((slot, idx) => (
                                    <Slot key={idx} {...slot} />
                                  ))}
                                </div>
                              </>
                            )}
                          />
                        </FormControl>
                        <div className="flex-grow flex gap-0 flex-col items-center">
                          <p className="text-xs text-muted-foreground">
                            {resendTimeout > 0
                              ? `Resend code in 00:${
                                  resendTimeout < 10 ? "0" : ""
                                }${resendTimeout}`
                              : "Didn't receive the code?"}
                          </p>
                          <Button
                            type="button"
                            className="hover:no-underline h-6"
                            variant={"link"}
                            size={"sm"}
                            onClick={handleResendCode}
                            disabled={resendTimeout > 0}
                          >
                            Resend Code
                          </Button>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              </>
            )}

            {!twoFA && (
              <>
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
                          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex-grow flex justify-end">
                        <Button asChild variant={"link"} size={"sm"}>
                          <Link href={`/auth/reset-password`}>
                            Forgot Password?
                          </Link>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <FormWarning message={warning} />
            <Button
              disabled={isPending}
              className="w-full h-10 !mt-6 text-md rounded-sm"
            >
              {isPending ? <LoadingDots /> : twoFA ? "Confirm" : "Login"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
