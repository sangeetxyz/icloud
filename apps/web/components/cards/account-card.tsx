"use client";

import { cn, getFallbackUserImage } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";

const AccountCard = () => {
  const { data, status } = useSession();
  if (status === "unauthenticated" || !data) return;

  return (
    <div className="w-80 font-sf-regular h-80 relative bg-gradient-to-tr from-sky-300 to-white rounded-2xl">
      <Image
        src={"/account.svg"}
        height={500}
        width={500}
        alt=""
        className="w-48 pt-4"
      />
      <div className="flex flex-col absolute top-0 left-0">
        <Image
          src={data.user.image ?? getFallbackUserImage()}
          height={500}
          width={500}
          alt=""
          className={cn("w-28 rounded-full mt-10 ml-[2.1rem]", {
            "bg-opacity-50": !data.user.image,
          })}
        />
        <div className="text-black p-8">
          <div className="text-3xl font-bold">
            {data.user.name?.split(" ")[0]}
          </div>
          <div className="text-zinc-500 font-sf-light pt-2">
            {data.user.email}
          </div>
          <div className="text-xl font-semibold pt-3">iCloud</div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
