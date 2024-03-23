import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import { db } from "@/lib/db";
import { getPasswordResetTokenbyEmail } from "./password-reset-token";

export const generateVerificationToken = async (email: string) => {
  
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 900 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if(existingToken){
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken;
}

export const generatePasswordResetToken = async (email: string) => {

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 300 * 1000);

  const existingToken = await getPasswordResetTokenbyEmail(email);
  if(existingToken){
    await db.passwordResetToken.delete({
      where:{
        id: existingToken.id
      }
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return passwordResetToken;
}