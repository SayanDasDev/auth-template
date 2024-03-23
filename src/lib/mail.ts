import VerificationEmail from "@/emails/verificaion-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_ARI_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "auth-template@sayandas.me",
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