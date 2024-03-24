import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    username: z.string().min(1, {
      message: "Username is required.",
    }),
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must have at least 8 characters.",
      })
      .refine(
        (password) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]+$/.test(
            password
          ),
        {
          message:
            "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must have at least 8 characters.",
      })
      .refine(
        (password) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]+$/.test(
            password
          ),
        {
          message:
            "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

export const settingsSchema = z.object({
  name: z.optional(
    z.string().min(1, {
      message: "Name is required.",
    })
  ),
  image: z.optional(z.string().url({
    message: "Please enter a valid Image URL."
  })),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
});
