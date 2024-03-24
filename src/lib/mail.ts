import TwoFAEmail from "@/emails/2FA-email";
import PasswordResetEmail from "@/emails/password-reset-email";
import VerificationEmail from "@/emails/verificaion-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "no-reply-auth-template@sayandas.me",
    to: email,
    subject: "Auth-Template: Verify Your Email",
    react: VerificationEmail({
      appName: "Auth-Template", 
      appImageUrl: "https://raw.githubusercontent.com/SayanDasDev/images/main/auth-template.png", 
      verificationLink: confirmLink, 
      supportEmail: "mesayan19@gmail.com"
    }),
  })
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${baseUrl}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "no-reply-auth-template@sayandas.me",
    to: email,
    subject: "Auth-Template: Reset Your Password",
    react: PasswordResetEmail({
      appName: "Auth-Template",
      appImageUrl: "https://raw.githubusercontent.com/SayanDasDev/images/main/auth-template.png", 
      passwordResetLink: resetLink,
      supportEmail: "mesayan19@gmail.com"
    })
  })
}

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
) => {
  await resend.emails.send({
    from: "no-reply-auth-template@sayandas.me",
    to: email,
    subject: "Auth-Template: 2FA Code",
    react: TwoFAEmail({
      appName: "Auth-Template",
      appImageUrl: "https://raw.githubusercontent.com/SayanDasDev/images/main/auth-template.png",
      twoFACode: token,
      supportEmail: "mesayan19@gmail.com"
    })
  })
}