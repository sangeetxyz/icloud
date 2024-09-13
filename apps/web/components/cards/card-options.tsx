"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ECardOptionType } from "@/types/common";
import { BsThreeDots } from "react-icons/bs";
import { FaRegFolderOpen } from "react-icons/fa";

const CardOptions = ({ cardType }: { cardType: ECardOptionType }) => {
  return (
    <div className="bg-white pl-2.5 pb-2.5">
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-zinc-200 focus:outline-none p-2.5 cursor-pointer w-fit rounded-lg">
          <BsThreeDots size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 rounded-xl ml-2">
          <DropdownMenuLabel>Show</DropdownMenuLabel>
          <DropdownMenuItem className="flex cursor-pointer space-x-2 items-center ">
            <FaRegFolderOpen
              className={
                cardType === ECardOptionType.PHOTOS
                  ? "text-green-500"
                  : cardType === ECardOptionType.DRIVE
                    ? "text-sky-500"
                    : "text-yellow-500"
              }
            />
            <div>All iCloud</div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer space-x-2 items-center ">
            <FaRegFolderOpen
              className={
                cardType === ECardOptionType.PHOTOS
                  ? "text-green-500"
                  : cardType === ECardOptionType.DRIVE
                    ? "text-sky-500"
                    : "text-yellow-500"
              }
            />
            <div>Notes</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CardOptions;
