"use client";

import { FaRegUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { GoPasskeyFill } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { handleCreatePasskey, handleSignOut } from "@/lib/utils";
import { useSession } from "next-auth/react";

const AccountButton = () => {
  const { data, status } = useSession();
  if (status === "unauthenticated" || !data) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="px-2.5 py-1 rounded-md hover:bg-black/10 cursor-pointer">
          <FaRegUserCircle size={24} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-sf-regular rounded-xl mr-2">
        <DropdownMenuLabel className="flex flex-col pr-4">
          <div className="text-lg">{data.user.name}</div>
          <div className="font-sf-light text-zinc-500 font-light">
            {data.user.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleCreatePasskey}
          className="flex cursor-pointer space-x-2 items-center "
        >
          <GoPasskeyFill className={"text-sky-500"} size={18} />
          <div>Create New Passkey</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex cursor-pointer space-x-2 items-center"
        >
          <MdOutlineCancel className={"text-red-500"} size={18} />
          <div>Sign Out</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountButton;
