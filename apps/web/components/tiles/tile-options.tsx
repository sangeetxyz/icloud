"use client";

import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ECardOptionType } from "@/types/common";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import Link from "next/link";
import { MdDownload } from "react-icons/md";

interface ITileOptionsProps {
  isHovering: boolean;
  id: number;
  type: ECardOptionType;
  refetch: () => void;
  link?: string;
}

const TileOptions = ({
  isHovering,
  id,
  type,
  refetch,
  link,
}: ITileOptionsProps) => {
  const deleteNote = api.notes.delete.useMutation();
  const deleteDrive = api.drives.delete.useMutation();
  const deletePhoto = api.photos.delete.useMutation();
  const handleDelete = async () => {
    switch (type) {
      case ECardOptionType.NOTES:
        await deleteNote.mutateAsync({ id });
        break;
      case ECardOptionType.DRIVE:
        await deleteDrive.mutateAsync({ id });
        break;
      case ECardOptionType.PHOTOS:
        await deletePhoto.mutateAsync({ id });
        break;
    }
    refetch();
    toast.success(
      `${type === ECardOptionType.DRIVE ? "File" : type === ECardOptionType.PHOTOS ? "Photo" : "Note"} deleted successfully`
    );
  };

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
        <DropdownMenuItem
          onClick={handleDelete}
          className="flex cursor-pointer items-center text-red-500 space-x-2 w-32"
        >
          <RiDeleteBin6Line />
          <div>Delete File</div>
        </DropdownMenuItem>
        {type !== ECardOptionType.NOTES && !!link && (
          <Link href={link} target="_blank">
            <DropdownMenuItem className="flex cursor-pointer items-center text-blue-500 space-x-2 w-32">
              <MdDownload />
              <div>Download File</div>
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TileOptions;
