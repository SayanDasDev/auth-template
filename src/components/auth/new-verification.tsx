"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { LoadingDots } from "../shared/loading-dots";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../shared/form-error";
import { FormSuccess } from "../shared/form-succes";
import { FormWarning } from "../shared/form-warning";

const NewVerificaton = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [warning, setWarning] = useState<string | undefined>("");

  const serchParams = useSearchParams();

  const token = serchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
        setWarning(data.warning);
      })
      .catch(() => {
        setError("Soemting went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Verifying your email..."
      backButtonHref="/login"
      backButtonLabel="Back to Sign In"
    >
      <div className="flex flex-grow justify-center text-destructive">
        {!success && !error && !warning ? (
          <LoadingDots dotsclassname="bg-primary w-4 h-4" />
        ) : (
          <div className="flex flex-col">
            <FormError message={error} />
            <FormSuccess message={success} />
            <FormWarning message={warning} />
            <div className="h-6"></div>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default NewVerificaton;
