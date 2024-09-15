"use client";

import Image from "next/image";
import { FaRegFolderOpen } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { ScrollArea } from "../ui/scroll-area";
import CardOptions from "./card-options";
import { ECardOptionType, ENotesDialogType } from "@/types/common";
import NotesCardTile from "../tiles/notes-card-tile";
import { useNoteState } from "@/hooks/statera";
import CreateOrUpdateNote from "../dialogs/create-note";
import { api } from "@/trpc/react";
import { Skeleton } from "../ui/skeleton";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { motion } from "framer-motion";
import { memo } from "react";

const NotesCard = memo(() => {
  const [, setIsOpen] = useNoteState();
  const { data, isLoading, refetch } = api.notes.getNotesByUser.useQuery();

  return (
    <motion.div
      whileHover={{
        scale: 1.025,
        boxShadow: "7px 7px 20px 8px rgba(0,0,0,0.1)",
      }}
      transition={{
        ease: "linear",
        duration: 0.2,
      }}
      className="w-80 relative font-sf-regular h-80 flex flex-col rounded-2xl overflow-hidden"
    >
      <div className="bg-sky-100 p-2 flex ">
        <div
          onClick={() =>
            setIsOpen({
              isOpen: true,
              type: ENotesDialogType.CREATE,
            })
          }
          className="flex w-full cursor-pointer rounded-lg p-2 hover:bg-black/10 space-x-3"
        >
          <Image
            src={"/images/apple-notes.svg"}
            height={200}
            width={200}
            alt=""
            className="h-12 w-12 select-none"
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
          <div
            onClick={() =>
              setIsOpen({
                isOpen: true,
                type: ENotesDialogType.CREATE,
              })
            }
            className="hover:bg-black/10 p-2 cursor-pointer w-fit rounded-lg"
          >
            <PiNotePencilBold size={22} className="text-yellow-500" />
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
          onClick={() =>
            setIsOpen({
              isOpen: true,
              type: ENotesDialogType.CREATE,
            })
          }
          className="h-full cursor-pointer pt-10 text-yellow-400 flex flex-col space-y-2 items-center justify-center bg-white"
        >
          <HiMiniPlusCircle size={50} />
          <div className="text-sm text-black font-sf-regular">
            Create your first note
          </div>
        </div>
      )}
      {!!data && data.length > 0 && (
        <ScrollArea className="h-full flex bg-white flex-col px-3 pt-3">
          {data.map((photo, index) => (
            <NotesCardTile
              refetch={refetch}
              key={photo.id}
              {...photo}
              noBorder={index === data.length - 1}
            />
          ))}
        </ScrollArea>
      )}

      <CardOptions cardType={ECardOptionType.NOTES} />
      <CreateOrUpdateNote refetch={refetch} />
    </motion.div>
  );
});

export default NotesCard;
