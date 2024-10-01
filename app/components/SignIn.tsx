import { signIn } from "@/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SignIn = () => {
  return (
    <Card className="mx-auto my-auto max-w-sm p-4">
      <CardContent>
        <form
          action={async (formData) => {
            "use server";
            const response = await signIn("credentials", formData, {
              callbackUrl: "/",
            });
            console.log({ response });
            // try {
            //   const response = await signIn("credentials", formData, {
            //     callbackUrl: "/",
            //   });
            //   console.log({ response });
            // } catch (error) {
            //   if (
            //     error instanceof Error &&
            //     error.message.includes("CallbackRouteError")
            //   ) {
            //     console.error("Authentication failed: ", error.message);
            //     // Handle specific error (e.g., show a user-friendly message)
            //   } else {
            //     console.error("An unexpected error occurrrrrred: ", error);
            //   }
            // }
          }}
        >
          <div className="my-4">
            <Input
              name="username"
              id="username"
              type="text"
              placeholder="LilleMarius1337"
              required
              autoComplete="off"
            />
          </div>
          <div className="my-4">
            <Input
              name="password"
              id="password"
              type="password"
              required
              placeholder="BareKozeIkkeSlå!*_69"
            />
          </div>
          <Button type="submit" className="w-full">
            Kjørr
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
