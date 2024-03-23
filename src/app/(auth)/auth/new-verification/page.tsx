import NewVerificaton from "@/components/auth/new-verification";
import { Suspense } from "react";

export default function NewVerificatonPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NewVerificaton />
    </Suspense>
  );
}
