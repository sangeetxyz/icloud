"use client";

import Image from "next/image";
import { FaRegFolderOpen } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { ScrollArea } from "../ui/scroll-area";
import CardOptions from "./card-options";
import { ECardOptionType } from "@/types/common";
import NotesCardTile from "../tiles/notes-card-tile";

const NotesCard = () => {
  const data = [
    {
      id: 0,
      name: "apple-photos",
      type: "svg",
    },
    {
      id: 1,
      name: "apple-photos",
      type: "svg",
    },
    {
      id: 2,
      name: "apple-photos",
      type: "svg",
    },
    {
      id: 3,
      name: "apple-photos",
      type: "svg",
    },
    {
      id: 4,
      name: "apple-photos",
      type: "svg",
    },
  ];
  return (
    <div className="w-80 relative font-sf-regular h-80 flex flex-col rounded-2xl overflow-hidden">
      <div className="bg-sky-100 p-2 flex ">
        <div className="flex w-full cursor-pointer rounded-lg p-2 hover:bg-black/10 space-x-3">
          <Image
            src={"/apple-notes.svg"}
            height={200}
            width={200}
            alt=""
            className="h-12 w-12"
          />
          <div className="flex flex-col text-black">
            <div className="font-bold text-lg font-sf-light">Notes</div>
            <div className="flex items-center space-x-1 text-sm text-zinc-500">
              <FaRegFolderOpen className="text-yellow-500" />
              <div>All iCloud</div>
            </div>
          </div>
        </div>
        <div className="pl-2.5 pb-2.5">
          <div className="hover:bg-black/10 p-2 cursor-pointer w-fit rounded-lg">
            <PiNotePencilBold size={22} className="text-yellow-500" />
          </div>
        </div>
      </div>
      <ScrollArea className="h-full flex space-y- bg-white flex-col px-3 pt-3">
        {data.map((photo, index) => (
          <NotesCardTile
            key={photo.id}
            {...photo}
            noBorder={index === data.length - 1}
            isDrive
          />
        ))}
      </ScrollArea>
      <CardOptions cardType={ECardOptionType.NOTES} />
    </div>
  );
};

export default NotesCard;
