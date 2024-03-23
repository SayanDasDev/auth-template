"use server"

import { getUserByEmail, getUserById } from "@/data/user";
import { getVerificationTokenByEmail, getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"


export const newVerification = async (token : string) => {

  const existingToken = await getVerificationTokenByToken(token);
  if(!existingToken){
    return { error: "Token does not exist!"} 
  };
  
  const hasExpired = new Date(existingToken.expires) < new Date();
  if(hasExpired){
    return { error: "Token has expired!" };
  };

  const existingUser = await getUserByEmail(existingToken.email);
  if(!existingUser){
    return { error: "Email does not exist!" };
  };
  if(existingUser.emailVerified){
    return { warning: "Email already verified!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    }
  });

  return { success: "Email verified successfully!" }
}