"use client";

import { FaApple } from "react-icons/fa";
import CreateButton from "@/components/buttons/create-button";
import { handleComingSoon } from "@/lib/utils";
import { CgMenuGridO } from "react-icons/cg";
import AccountButton from "../buttons/account-button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full sticky top-0 z-10 text-white backdrop-blur-lg bg-opacity-20 justify-between flex items-center h-11 bg-zinc-900 px-3">
      <Link href={"/"}>
        <div className="flex space-x-0.5 items-center cursor-pointer">
          <FaApple size={18} />
          <div className="font-sf-medium text-xl">iCloud</div>
        </div>
      </Link>

      <div className="flex items-center">
        <CreateButton />
        <div
          onClick={handleComingSoon}
          className="px-2.5 py-1 rounded-md hover:bg-black/10 cursor-pointer"
        >
          <CgMenuGridO size={22} />
        </div>
        <AccountButton />
      </div>
    </div>
  );
};

export default Navbar;
