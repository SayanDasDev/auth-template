import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email."
  }),
  password: z.string().min(1,{
    message: "Password is required."
  }),
})


export const RegisterSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required."
  }),
  email: z.string().email({
    message: "Please enter a valid email."
  }),
  password: z.string().min(8,{
    message: "Password must have at least 8 characters."
  }).refine(
    (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]+$/.test(password),
    {
      message: "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.",
    }
  ),
  confirmPassword: z.string(),
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  }
);