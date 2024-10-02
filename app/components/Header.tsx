import { getSession } from "@/auth";
import SignOut from "./SignOut";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = async () => {
  const session = await getSession();
  return (
    <div className="flex justify-between">
      <Link href="/">Husjakten</Link>
      <div>
        <Button asChild variant={"link"}>
          <Link href="/">Hjem</Link>
        </Button>
        {session && session.user && <SignOut />}
      </div>
    </div>
  );
};

export default Header;
