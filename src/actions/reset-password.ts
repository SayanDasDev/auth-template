"use server"

import { getPasswordResetTokenbyEmail } from "@/data/password-reset-token";
import { generatePasswordResetToken } from "@/data/token";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ResetPasswordSchema } from "@/schemas"
import * as z from "zod"

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {

  const validatedFields = ResetPasswordSchema.safeParse(values);
  if(!validatedFields.success){
    return { error: "Invalid credentials!"}
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if(!existingUser){
    return { error: "Email does not exist!"}
  }

  if(!existingUser.password){
    return { error: "Password change not allowed for social media accounts."}
  }

  if (!existingUser.emailVerified) return { warning: "Email not verified!"};


  const existingToken = await getPasswordResetTokenbyEmail(email);
  if(existingToken){
    const hasExpired = new Date(existingToken.expires) < new Date();
    if(!hasExpired){
      const timeLeft = new Date(existingToken.expires).getTime() - new Date().getTime();
      const minutesLeft = Math.round(timeLeft /1000 / 60)
      return { warning: `Email already sent! Try again in ${minutesLeft} minutes...`}
    }
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: "Reset password email sent..."}
}