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

export const formatTimeDiff = (date: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();
  const oneDayInMs = 24 * 60 * 60 * 1000;

  if (timeDiff < oneDayInMs) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${month} ${day}`;
};
