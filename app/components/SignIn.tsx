"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        callbackUrl: `${window.location.origin}`,
        redirect: false,
      });
      if (!res) throw new Error();
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Feil brukernavn/passord");
      }
    } catch {
      setError("Noe gikk galt :(");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-max min-w-80 max-w-full p-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardContent className="p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              name="username"
              type="text"
              placeholder="LilleMarius1337"
              required
              autoComplete="off"
            />
          </div>
          <div className="my-4">
            <Input
              name="password"
              type="password"
              required
              placeholder="BareKozeIkkeSlå!*_69"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!loading ? "Kjørrr" : "Kjørrrer..."}
          </Button>
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
