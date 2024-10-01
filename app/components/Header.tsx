import { auth } from "@/auth";
import SignOut from "./SignOut";

const Header = async () => {
  const session = await auth();
  return <div>{session && session.user && <SignOut />}</div>;
};

export default Header;
