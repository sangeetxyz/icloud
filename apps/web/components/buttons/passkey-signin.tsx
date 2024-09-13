"use client";

import { GoPasskeyFill } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { signInWithPasskey } from "@teamhanko/passkeys-next-auth-provider/client";

const SignInWithPasskey = () => {
  return (
    <Button
      onClick={() =>
        signInWithPasskey({
          tenantId: process.env.NEXT_PUBLIC_PASSKEYS_TENANT_ID!,
          callbackUrl: `${window.location.origin}/dashboard`,
        })
      }
      className="rounded-full"
    >
      <GoPasskeyFill className="w-4 h-4 mr-2" />
      Passkey
    </Button>
  );
};

export default SignInWithPasskey;
