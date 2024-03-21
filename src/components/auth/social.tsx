import { signIn } from "next-auth/react";
import { Icons } from "../shared/icons";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "#/routes";

export const Social = () => {

  const handleOAuthSubmit = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="w-full flex gap-3 items-center">
      <Button
        size={"lg"}
        className="w-full rounded-sm"
        variant={"outline"}
        onClick={() => handleOAuthSubmit("google")}
      >
        <Icons.AuthGoogle className="w-4 h-4" /> &nbsp;Google
      </Button>
      <Button
        size={"lg"}
        className="w-full rounded-sm"
        variant={"outline"}
        onClick={() => handleOAuthSubmit("github")}
      >
        <Icons.AuthGithub className="w-4 h-4" /> &nbsp;Github
      </Button>
    </div>
  );
};
