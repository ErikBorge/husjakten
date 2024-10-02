import { getSession } from "@/auth";
import SignOut from "./SignOut";

const Header = async () => {
  const session = await getSession();
  return (
    <div className="flex justify-end">
      {session && session.user && <SignOut />}
    </div>
  );
};

export default Header;
