"use server";

import { generateTwoFactorToken } from "@/data/token";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import * as z from "zod";

export const resendCode = async (email: string) => {

  const validateEmail = z.string().email().safeParse(email);;
  if(!validateEmail.success) return { error: "Invalid email!" };

  const twoFactorToken = await generateTwoFactorToken(email);
  await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

  return { success: "2FA code sent!" };
};
