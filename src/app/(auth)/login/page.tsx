import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <section>
      <Suspense fallback={<p>Loading...</p>}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
