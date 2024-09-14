"use client";

import Image from "next/image";
import { IoCloudUploadSharp, IoImage } from "react-icons/io5";
import { ScrollArea } from "../ui/scroll-area";
import CardOptions from "./card-options";
import { ECardOptionType } from "@/types/common";
import FileCardTile from "../tiles/file-card-tile";
import { useCreatePhotos } from "@/lib/statera";
import CreatePhotos from "../dialogs/create-photos";
import { api } from "@/trpc/react";
import { Skeleton } from "../ui/skeleton";
import { MdOutlineInsertPhoto } from "react-icons/md";

const PhotosCard = () => {
  const [, setIsOpen] = useCreatePhotos();
  const { data, isLoading, refetch } = api.photos.getPhotosByUser.useQuery();

  return (
    <div className="w-80 relative lg:w-[40rem] font-sf-regular h-80 flex flex-col rounded-2xl overflow-hidden">
      <div className="bg-sky-100 p-2">
        <div
          onClick={() => setIsOpen(true)}
          className="flex w-full cursor-pointer rounded-lg p-2 hover:bg-black/10 space-x-3"
        >
          <Image
            src={"/apple-photos.svg"}
            height={200}
            width={200}
            alt=""
            className="h-12 w-12"
          />
          <div className="flex flex-col text-black">
            <div className="font-bold text-lg font-sf-light">Photos</div>
            <div className="flex items-center space-x-1 text-sm text-zinc-500">
              <IoImage className="text-green-500" />
              <div>Library</div>
              <div className="h-0.5 w-0.5 rounded-full bg-zinc-950"></div>
              <div>{data?.length} Photos</div>
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
          className="h-full cursor-pointer pt-10 text-green-500 flex flex-col space-y-2 items-center justify-center bg-white"
        >
          <MdOutlineInsertPhoto size={50} />
          <div className="text-sm text-black font-sf-regular">
            Upload your first photo
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
            />
          ))}
        </ScrollArea>
      )}
      <CardOptions cardType={ECardOptionType.PHOTOS} />
      <CreatePhotos refetch={refetch} />
    </div>
  );
};

export default PhotosCard;
