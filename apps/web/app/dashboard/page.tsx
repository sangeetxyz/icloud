import Image from "next/image";
import Navbar from "@/components/navigation/navbar";
import AccountCard from "@/components/cards/account-card";
import PhotosCard from "@/components/cards/photos-card";
import DriveCard from "@/components/cards/drive-card";
import NotesCard from "@/components/cards/notes-card";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();
  const user = session?.user;
  if (!user) redirect("/auth");

  return (
    <div className="min-h-screen relative flex flex-col">
      <Image
        priority
        src={"/blue1.jpg"}
        height={2000}
        width={2000}
        quality={100}
        alt=""
        className="h-screen w-full object-cover fixed top-0 left-0"
      />
      <Navbar />
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex gap-8 p-10 w-full flex-col items-center">
          <div className="flex md:flex-row flex-col gap-8">
            <AccountCard />
            <PhotosCard />
          </div>
          <div className="flex md:flex-row flex-col gap-8">
            <DriveCard />
            <NotesCard />
          </div>
        </div>
      </div>
    </div>
  );
}
