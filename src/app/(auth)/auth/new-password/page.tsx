import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";


export default function NewVerificatonPage(){
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NewPasswordForm />
    </Suspense>
  )
}