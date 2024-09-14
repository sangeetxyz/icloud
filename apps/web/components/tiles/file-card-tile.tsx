"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import TileOptions from "./tile-options";
import { ECardOptionType } from "@/types/common";

interface IFileCardTileProps {
  name: string;
  type: string;
  noBorder: boolean;
  isDrive?: boolean;
  refetch: () => void;
  id: number;
  link: string;
}

const FileCardTile = ({
  id,
  name,
  type,
  noBorder,
  isDrive = false,
  refetch,
  link,
}: IFileCardTileProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = link;
    downloadLink.setAttribute("download", "file"); // Optional: Set the downloaded file name
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  };

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
        onClick={handleDownload}
        className={cn("flex flex-col text-black w-full pb-3 pt-4", {
          "border-b": !noBorder,
        })}
      >
        <div className="-mt-1 text-sm text-zinc-700 whitespace-nowrap truncate w-52">
          {name}
        </div>
        <div className="uppercase text-xs text-zinc-400">{type}</div>
      </div>
      <TileOptions
        isHovering={isHovering}
        id={id}
        refetch={refetch}
        type={isDrive ? ECardOptionType.DRIVE : ECardOptionType.PHOTOS}
        link={link}
      />
    </div>
  );
};

export default FileCardTile;
