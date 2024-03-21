"use server";

import { AuthError } from "next-auth";
import { signIn } from "#/auth";
import { DEFAULT_LOGIN_REDIRECT } from "#/routes";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/token";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials." };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist." };
  }

  if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email);
    return { warning: "Email Not Verified! New Confirmation email sent." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid login credentials." };
        case "AccessDenied":
          return { error: "Email not Verified." };
        default:
          return { error: "Something went wrong..." };
      }
    }

    throw error;
  }

  return { success: "login success..." };
};
