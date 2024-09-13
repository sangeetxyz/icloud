"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

const SignInWithGithub = () => {
  return (
    <Button
      onClick={() =>
        signIn("github", {
          callbackUrl: `${window.location.origin}/dashboard`,
        })
      }
      className="rounded-full"
    >
      <FaGithub className="w-4 h-4 mr-2" />
      GitHub
    </Button>
  );
};

export default SignInWithGithub;
