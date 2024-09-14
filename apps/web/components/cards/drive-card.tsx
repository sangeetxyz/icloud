"use client";

import Image from "next/image";
import { LuClock9 } from "react-icons/lu";
import { ScrollArea } from "../ui/scroll-area";
import FileCardTile from "../tiles/file-card-tile";
import CardOptions from "./card-options";
import { ECardOptionType } from "@/types/common";
import { useCreateDrive } from "@/hooks/statera";
import CreateDrive from "../dialogs/create-drive";
import { api } from "@/trpc/react";
import { Skeleton } from "../ui/skeleton";
import { IoCloudUploadSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";

const DriveCard = () => {
  const MIN_WIDTH = 1024;
  const { width } = useWindowSize();
  const [, setIsOpen] = useCreateDrive();
  const { data, isLoading, refetch } = api.drives.getDrivesByUser.useQuery();

  return (
    <motion.div
      initial={{
        width: width < MIN_WIDTH ? "20rem" : "40rem",
      }}
      whileHover={{
        scale: 1.025,
        boxShadow: "7px 7px 20px 8px rgba(0,0,0,0.1)",
      }}
      animate={{
        width: width < MIN_WIDTH ? "20rem" : "40rem",
      }}
      transition={{
        ease: "linear",
        duration: 0.2,
      }}
      className="relative font-sf-regular h-80 flex flex-col rounded-2xl overflow-hidden"
    >
      <div className="bg-sky-100 p-2">
        <div
          onClick={() => setIsOpen(true)}
          className="flex w-full cursor-pointer rounded-lg p-2 hover:bg-black/10 space-x-3"
        >
          <Image
            src={"/drive.png"}
            height={200}
            width={200}
            alt=""
            className="h-12 w-12 select-none"
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
      {isLoading && (
        <div className="h-full flex-col flex items-center justify-center space-y-3 bg-white px-3 pt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex flex-col space-y-2 w-full px-8 py-2">
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-40 h-3" />
            </div>
          ))}
        </div>
      )}
      {!!data && data.length < 1 && (
        <div
          onClick={() => setIsOpen(true)}
          className="h-full cursor-pointer pt-10 text-blue-500 flex flex-col space-y-2 items-center justify-center bg-white"
        >
          <IoCloudUploadSharp size={50} />
          <div className="text-sm text-black font-sf-regular">
            Upload your first file
          </div>
        </div>
      )}
      {!!data && data.length > 0 && (
        <ScrollArea className="h-full flex bg-white flex-col px-3 pt-3">
          {data.map((photo, index) => (
            <FileCardTile
              refetch={refetch}
              key={photo.id}
              {...photo}
              noBorder={index === data.length - 1}
              isDrive
            />
          ))}
        </ScrollArea>
      )}
      <CardOptions cardType={ECardOptionType.DRIVE} />
      <CreateDrive refetch={refetch} />
    </motion.div>
  );
};

export default DriveCard;
