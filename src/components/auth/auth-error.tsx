import React from "react";
import { CardWrapper } from "./card-wrapper";
import { TriangleAlert } from "lucide-react";

const AuthError = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Someting went wrong..."
      backButtonHref="/login"
      backButtonLabel="Back to Sign In"
    >
      <div className="flex flex-grow justify-center text-destructive">
        <TriangleAlert size={48} />
      </div>
    </CardWrapper>
  );
};

export default AuthError;
