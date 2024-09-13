"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import TileOptions from "./tile-options";

interface IFileCardTileProps {
  name: string;
  type: string;
  noBorder: boolean;
  isDrive?: boolean;
}

const FileCardTile = ({
  name,
  type,
  noBorder,
  isDrive = false,
}: IFileCardTileProps) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="px-4 relative flex cursor-pointer rounded-lg space-x-3 hover:bg-zinc-200"
    >
      {isDrive ? (
        <FaFileAlt className="text-purple-500 h-5 w-5 mb-3 mt-4" />
      ) : (
        <IoImage className="text-sky-500 h-5 w-5 mb-3 mt-4" />
      )}
      <div
        className={cn("flex flex-col text-black w-full pb-3 pt-4", {
          "border-b": !noBorder,
        })}
      >
        <div className="-mt-1 text-sm text-zinc-700">apple-photos</div>
        <div className="uppercase text-xs text-zinc-400">svg</div>
      </div>
      {/* <TileOptions isHovering={isHovering} id={id}  /> */}
    </div>
  );
};

export default FileCardTile;
