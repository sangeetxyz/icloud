import {
  finishServerPasskeyRegistration,
  startServerPasskeyRegistration,
} from "@/server/passkey";
import { create, CredentialCreationOptionsJSON } from "@github/webauthn-json";
import { clsx, type ClassValue } from "clsx";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleComingSoon = () => {
  toast.info("Coming soon");
};

export const handleCreatePasskey = async () => {
  async function registerPasskey() {
    const createOptions = await startServerPasskeyRegistration();
    const credential = await create(
      createOptions as CredentialCreationOptionsJSON
    );
    await finishServerPasskeyRegistration(credential);
  }
  try {
    await registerPasskey();
    toast.success("Passkey created successfully");
  } catch (error) {
    toast.error("Error creating passkey");
  }
};

export const handleSignOut = async () => {
  await signOut({ callbackUrl: "/" });
  toast.success("Signed out successfully");
};

export const getFallbackUserImage = () => {
  return "/head.svg";
};
