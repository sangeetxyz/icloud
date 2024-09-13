"use client";

import Image from "next/image";
import { LuClock9 } from "react-icons/lu";
import { ScrollArea } from "../ui/scroll-area";
import FileCardTile from "../tiles/file-card-tile";
import CardOptions from "./card-options";
import { ECardOptionType } from "@/types/common";

const DriveCard = () => {
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
    <div className="w-80 relative lg:w-[40rem] font-sf-regular h-80 flex flex-col rounded-2xl overflow-hidden">
      <div className="bg-sky-100 p-2">
        <div className="flex w-full cursor-pointer rounded-lg p-2 hover:bg-black/10 space-x-3">
          <Image
            src={"/drive.png"}
            height={200}
            width={200}
            alt=""
            className="h-12 w-12"
          />
          <div className="flex flex-col text-black">
            <div className="font-bold text-lg font-sf-light">Drive</div>
            <div className="flex items-center space-x-1 text-sm text-zinc-500">
              <LuClock9 className="text-sky-500" />
              <div>Recents</div>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="h-full flex space-y- bg-white flex-col px-3 pt-3">
        {data.map((photo, index) => (
          <FileCardTile
            key={photo.id}
            {...photo}
            noBorder={index === data.length - 1}
            isDrive
          />
        ))}
      </ScrollArea>
      <CardOptions cardType={ECardOptionType.DRIVE} />
    </div>
  );
};

export default DriveCard;
