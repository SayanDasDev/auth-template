"use server"

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db";
import { settingsSchema } from "@/schemas";
import * as z from "zod";


export const settings = async (values : z.infer<typeof settingsSchema>) => {

  const validatedFields = settingsSchema.safeParse(values);

  if(!validatedFields.success) return { error: "Invlid fields!" };
  
  const user = await currentUser();

  if(!user || !user.id) return { error: "Unauthorized Request!" }

  const dbUser = await getUserById(user.id);

  if(!dbUser) return { error: "User not found!" }

  if(user.isOAuth){
    values.isTwoFactorEnabled = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  })

  return { success: "Settings updated successfully!" }
}