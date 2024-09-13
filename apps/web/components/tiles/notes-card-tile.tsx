"use client"

import { useState } from "react";
import TileOptions from "./tile-options";
import { cn } from "@/lib/utils";

const NotesCardTile = ({
  name,
  type,
  noBorder,
  isDrive = false,
}: {
  name: string;
  type: string;
  noBorder: boolean;
  isDrive?: boolean;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="px-4 pl-8 relative flex cursor-pointer rounded-lg space-x-3 hover:bg-zinc-200"
    >
      <div
        className={cn("flex flex-col text-black w-full pb-3 pt-4", {
          "border-b": !noBorder,
        })}
      >
        <div className="-mt-1 text-sm text-zinc-700">apple-photos</div>
        <div className="flex items-center space-x-2 font-sf-light pt-0.5">
          <div className="uppercase text-xs">2:55</div>
          <div className="text-xs text-zinc-400 ">Additionalk ingop</div>
        </div>
      </div>
      <TileOptions isHovering={isHovering} />
    </div>
  );
};

export default NotesCardTile;