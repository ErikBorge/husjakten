"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOut() {
  return (
    <Button
      variant="link"
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
    >
      Logg ut
    </Button>
  );
}
