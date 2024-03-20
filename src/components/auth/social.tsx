import { Icons } from "../shared/icons";
import { Button } from "../ui/button";

export const Social = () => {
  return (
    <div className="w-full flex gap-3 items-center">
      <Button
        size={"lg"}
        className="w-full rounded-sm"
        variant={"outline"}
        onClick={() => {}}
      >
        <Icons.AuthGoogle className="w-4 h-4" /> &nbsp;Google
      </Button>
      <Button
        size={"lg"}
        className="w-full rounded-sm"
        variant={"outline"}
        onClick={() => {}}
      >
        <Icons.AuthGithub className="w-4 h-4" /> &nbsp;Github
      </Button>
    </div>
  );
};
