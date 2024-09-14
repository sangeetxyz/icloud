"use client";

import { useState } from "react";
import TileOptions from "./tile-options";
import { cn, formatTimeDiff } from "@/lib/utils";
import { useNoteState } from "@/lib/statera";
import { ECardOptionType, ENotesDialogType } from "@/types/common";

interface INotesCardTileProps {
  id: number;
  title: string;
  description: string;
  noBorder: boolean;
  createdAt: Date;
  refetch: () => void;
}

const NotesCardTile = ({
  id,
  title,
  description,
  noBorder,
  createdAt,
  refetch,
}: INotesCardTileProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [noteState, setNoteState] = useNoteState();
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
        onClick={() =>
          setNoteState({
            isOpen: true,
            type: ENotesDialogType.UPDATE,
            note: { title, description, id },
          })
        }
      >
        <div className="-mt-1 text-sm text-zinc-700 whitespace-nowrap truncate w-52">
          {title}
        </div>
        <div className="flex items-center space-x-2 font-sf-light pt-0.5">
          <div className="text-xs">{formatTimeDiff(createdAt)}</div>
          <div className="text-xs text-zinc-400 font whitespace-nowrap truncate w-44">
            {description}
          </div>
        </div>
      </div>
      <TileOptions
        refetch={refetch}
        isHovering={isHovering}
        id={id}
        type={ECardOptionType.NOTES}
      />
    </div>
  );
};

export default NotesCardTile;
