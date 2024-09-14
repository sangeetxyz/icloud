"use client";

import { FiPlusCircle } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { useCreateDrive, useCreatePhotos, useNoteState } from "@/lib/statera";
import { ENotesDialogType } from "@/types/common";

const CreateButton = () => {
  const [, setIsDriveOpen] = useCreateDrive();
  const [, setIsPhotosOpen] = useCreatePhotos();
  const [, setIsNotesOpen] = useNoteState();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="px-2.5 py-1 rounded-md hover:bg-black/10 cursor-pointer">
          <FiPlusCircle size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl font-sf-regular w-44 mr-2">
        <DropdownMenuLabel>Create New</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setIsPhotosOpen(true)}
          className="flex items-center cursor-pointer space-x-2"
        >
          <Image
            src={"/images/apple-photos.svg"}
            height={200}
            width={200}
            alt=""
            className="h-6 w-6 outline outline-zinc-200 outline-1 rounded-md"
          />
          <div>Photos</div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIsDriveOpen(true)}
          className="flex items-center cursor-pointer space-x-2"
        >
          <Image
            src={"/drive.png"}
            height={200}
            width={200}
            alt=""
            className="h-6 w-6 outline outline-zinc-200 outline-1 rounded-md"
          />
          <div>Drive</div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setIsNotesOpen({
              isOpen: true,
              type: ENotesDialogType.CREATE,
            })
          }
          className="flex items-center cursor-pointer space-x-2"
        >
          <Image
            src={"/images/apple-notes.svg"}
            height={200}
            width={200}
            alt=""
            className="h-6 w-6 outline outline-zinc-200 outline-1 rounded-md"
          />
          <div>Notes</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateButton;
