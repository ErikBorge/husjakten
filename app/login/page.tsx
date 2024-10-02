import { getSession } from "@/auth";
import SignIn from "../components/SignIn";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getSession();
  if (session) return redirect("/");
  return <SignIn />;
};

export default Login;
