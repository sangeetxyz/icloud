"use client";

import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RiDeleteBin6Line } from "react-icons/ri";

const TileOptions = ({ isHovering }: { isHovering: boolean }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isHovering && (
          <div className="hover:bg-black/50 bg-black/25 px-1 absolute top-2.5 right-2.5 cursor-pointer rounded-full">
            <BsThreeDots size={16} className="text-white" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl mr-2">
        <DropdownMenuItem className="flex cursor-pointer items-center text-red-500 space-x-2 w-32">
          <RiDeleteBin6Line />
          <div>Delete File</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TileOptions;
