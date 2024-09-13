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

// const Navbar = () => {
//   return (
//     <div className="w-full sticky top-0 z-10 text-white backdrop-blur-lg bg-opacity-20 justify-between flex items-center h-11 bg-zinc-900 px-3">
//       <div className="flex space-x-0.5 items-center">
//         <FaApple size={18} />
//         <div className="font-sf-medium text-xl">iCloud</div>
//       </div>
//       <div className="flex items-center">
//         <CreateButton />
//         <div
//           onClick={handleComingSoon}
//           className="px-2.5 py-1 rounded-md hover:bg-black/10 cursor-pointer"
//         >
//           <CgMenuGridO size={22} />
//         </div>
//         <AccountButton />
//       </div>
//     </div>
//   );
// };

// const AccountCard = ({ user }: { user: Session }) => {
//   return (
//     <div className="w-80 font-sf-regular h-80 relative bg-gradient-to-tr from-sky-300 to-white rounded-2xl">
//       <Image
//         src={"/account.svg"}
//         height={500}
//         width={500}
//         alt=""
//         className="w-48 pt-4"
//       />
//       <div className="flex flex-col absolute top-0 left-0">
//         <Image
//           src={"/head.svg"}
//           height={500}
//           width={500}
//           alt=""
//           className="w-28 opacity-50 mt-10 ml-[2.1rem]"
//         />
//         <div className="text-black p-8">
//           <div className="text-3xl font-bold">Sangeet</div>
//           <div className="text-zinc-500 font-sf-light pt-2">
//             sangeetbanerjee777@gmail.com
//           </div>
//           <div className="text-xl font-semibold pt-3">iCloud</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PhotosCard = () => {
//   const data = [
//     {
//       id: 0,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 1,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 2,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 3,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 4,
//       name: "apple-photos",
//       type: "svg",
//     },
//   ];

//   return (
//     <div className="w-80 relative lg:w-[40rem] font-sf-regular h-80 flex flex-col rounded-2xl overflow-hidden">
//       <div className="bg-sky-100 p-2">
//         <div className="flex w-full cursor-pointer rounded-lg p-2 hover:bg-black/10 space-x-3">
//           <Image
//             src={"/apple-photos.svg"}
//             height={200}
//             width={200}
//             alt=""
//             className="h-12 w-12"
//           />
//           <div className="flex flex-col text-black">
//             <div className="font-bold text-lg font-sf-light">Photos</div>
//             <div className="flex items-center space-x-1 text-sm text-zinc-500">
//               <IoImage className="text-green-500" />
//               <div>Library</div>
//               <div className="h-0.5 w-0.5 rounded-full bg-zinc-950"></div>
//               <div>0 Photos</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ScrollArea className="h-full flex space-y- bg-white flex-col px-3 pt-3">
//         {data.map((photo, index) => (
//           <FileCardTile
//             key={photo.id}
//             {...photo}
//             noBorder={index === data.length - 1}
//           />
//         ))}
//       </ScrollArea>
//       <CardOptions cardType={ECardOptionType.PHOTOS} />
//     </div>
//   );
// };

// const FileCardTile = ({
//   name,
//   type,
//   noBorder,
//   isDrive = false,
// }: {
//   name: string;
//   type: string;
//   noBorder: boolean;
//   isDrive?: boolean;
// }) => {
//   const [isHovering, setIsHovering] = useState(false);
//   return (
//     <div
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//       className="px-4 relative flex cursor-pointer rounded-lg space-x-3 hover:bg-zinc-200"
//     >
//       {isDrive ? (
//         <FaFileAlt className="text-purple-500 h-5 w-5 mb-3 mt-4" />
//       ) : (
//         <IoImage className="text-sky-500 h-5 w-5 mb-3 mt-4" />
//       )}
//       <div
//         className={cn("flex flex-col text-black w-full pb-3 pt-4", {
//           "border-b": !noBorder,
//         })}
//       >
//         <div className="-mt-1 text-sm text-zinc-700">apple-photos</div>
//         <div className="uppercase text-xs text-zinc-400">svg</div>
//       </div>
//       <TileOptions isHovering={isHovering} />
//     </div>
//   );
// };

// const DriveCard = () => {
//   const data = [
//     {
//       id: 0,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 1,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 2,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 3,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 4,
//       name: "apple-photos",
//       type: "svg",
//     },
//   ];
//   return (
//     <div className="w-80 relative lg:w-[40rem] font-sf-regular h-80 flex flex-col rounded-2xl overflow-hidden">
//       <div className="bg-sky-100 p-2">
//         <div className="flex w-full cursor-pointer rounded-lg p-2 hover:bg-black/10 space-x-3">
//           <Image
//             src={"/drive.png"}
//             height={200}
//             width={200}
//             alt=""
//             className="h-12 w-12"
//           />
//           <div className="flex flex-col text-black">
//             <div className="font-bold text-lg font-sf-light">Drive</div>
//             <div className="flex items-center space-x-1 text-sm text-zinc-500">
//               <LuClock9 className="text-sky-500" />
//               <div>Recents</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ScrollArea className="h-full flex space-y- bg-white flex-col px-3 pt-3">
//         {data.map((photo, index) => (
//           <FileCardTile
//             key={photo.id}
//             {...photo}
//             noBorder={index === data.length - 1}
//             isDrive
//           />
//         ))}
//       </ScrollArea>
//       <CardOptions cardType={ECardOptionType.DRIVE} />
//     </div>
//   );
// };

// const NotesCard = () => {
//   const data = [
//     {
//       id: 0,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 1,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 2,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 3,
//       name: "apple-photos",
//       type: "svg",
//     },
//     {
//       id: 4,
//       name: "apple-photos",
//       type: "svg",
//     },
//   ];
//   return (
//     <div className="w-80 relative font-sf-regular h-80 flex flex-col rounded-2xl overflow-hidden">
//       <div className="bg-sky-100 p-2 flex ">
//         <div className="flex w-full cursor-pointer rounded-lg p-2 hover:bg-black/10 space-x-3">
//           <Image
//             src={"/apple-notes.svg"}
//             height={200}
//             width={200}
//             alt=""
//             className="h-12 w-12"
//           />
//           <div className="flex flex-col text-black">
//             <div className="font-bold text-lg font-sf-light">Notes</div>
//             <div className="flex items-center space-x-1 text-sm text-zinc-500">
//               <FaRegFolderOpen className="text-yellow-500" />
//               <div>All iCloud</div>
//             </div>
//           </div>
//         </div>
//         <div className="pl-2.5 pb-2.5">
//           <div className="hover:bg-black/10 p-2 cursor-pointer w-fit rounded-lg">
//             <PiNotePencilBold size={22} className="text-yellow-500" />
//           </div>
//         </div>
//       </div>
//       <ScrollArea className="h-full flex space-y- bg-white flex-col px-3 pt-3">
//         {data.map((photo, index) => (
//           <NotesCardTile
//             key={photo.id}
//             {...photo}
//             noBorder={index === data.length - 1}
//             isDrive
//           />
//         ))}
//       </ScrollArea>
//       <CardOptions cardType={ECardOptionType.NOTES} />
//     </div>
//   );
// };

// const NotesCardTile = ({
//   name,
//   type,
//   noBorder,
//   isDrive = false,
// }: {
//   name: string;
//   type: string;
//   noBorder: boolean;
//   isDrive?: boolean;
// }) => {
//   const [isHovering, setIsHovering] = useState(false);
//   return (
//     <div
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//       className="px-4 pl-8 relative flex cursor-pointer rounded-lg space-x-3 hover:bg-zinc-200"
//     >
//       <div
//         className={cn("flex flex-col text-black w-full pb-3 pt-4", {
//           "border-b": !noBorder,
//         })}
//       >
//         <div className="-mt-1 text-sm text-zinc-700">apple-photos</div>
//         <div className="flex items-center space-x-2 font-sf-light pt-0.5">
//           <div className="uppercase text-xs">2:55</div>
//           <div className="text-xs text-zinc-400 ">Additionalk ingop</div>
//         </div>
//       </div>
//       <TileOptions isHovering={isHovering} />
//     </div>
//   );
// };

// const TileOptions = ({ isHovering }: { isHovering: boolean }) => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         {isHovering && (
//           <div className="hover:bg-black/50 bg-black/25 px-1 absolute top-2.5 right-2.5 cursor-pointer rounded-full">
//             <BsThreeDots size={16} className="text-white" />
//           </div>
//         )}
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="rounded-xl mr-2">
//         <DropdownMenuItem className="flex cursor-pointer items-center text-red-500 space-x-2 w-32">
//           <RiDeleteBin6Line />
//           <div>Delete File</div>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// const CardOptions = ({ cardType }: { cardType: ECardOptionType }) => {
//   return (
//     <div className="bg-white pl-2.5 pb-2.5">
//       <DropdownMenu>
//         <DropdownMenuTrigger className="hover:bg-zinc-200 focus:outline-none p-2.5 cursor-pointer w-fit rounded-lg">
//           <BsThreeDots size={20} />
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-64 rounded-xl ml-2">
//           <DropdownMenuLabel>Show</DropdownMenuLabel>
//           <DropdownMenuItem className="flex cursor-pointer space-x-2 items-center ">
//             <FaRegFolderOpen
//               className={
//                 cardType === ECardOptionType.PHOTOS
//                   ? "text-green-500"
//                   : cardType === ECardOptionType.DRIVE
//                     ? "text-sky-500"
//                     : "text-yellow-500"
//               }
//             />
//             <div>All iCloud</div>
//           </DropdownMenuItem>
//           <DropdownMenuItem className="flex cursor-pointer space-x-2 items-center ">
//             <FaRegFolderOpen
//               className={
//                 cardType === ECardOptionType.PHOTOS
//                   ? "text-green-500"
//                   : cardType === ECardOptionType.DRIVE
//                     ? "text-sky-500"
//                     : "text-yellow-500"
//               }
//             />
//             <div>Notes</div>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };

// const CreateButton = () => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className="focus:outline-none">
//         <div className="px-2.5 py-1 rounded-md hover:bg-black/10 cursor-pointer">
//           <FiPlusCircle size={20} />
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="rounded-xl font-sf-regular w-44 mr-2">
//         <DropdownMenuLabel>Create New</DropdownMenuLabel>
//         <DropdownMenuItem className="flex items-center cursor-pointer space-x-2">
//           <Image
//             src={"/apple-photos.svg"}
//             height={200}
//             width={200}
//             alt=""
//             className="h-6 w-6 outline outline-zinc-200 outline-1 rounded-md"
//           />
//           <div>Photos</div>
//         </DropdownMenuItem>
//         <DropdownMenuItem className="flex items-center cursor-pointer space-x-2">
//           <Image
//             src={"/drive.png"}
//             height={200}
//             width={200}
//             alt=""
//             className="h-6 w-6 outline outline-zinc-200 outline-1 rounded-md"
//           />
//           <div>Drive</div>
//         </DropdownMenuItem>
//         <DropdownMenuItem className="flex items-center cursor-pointer space-x-2">
//           <Image
//             src={"/apple-notes.svg"}
//             height={200}
//             width={200}
//             alt=""
//             className="h-6 w-6 outline outline-zinc-200 outline-1 rounded-md"
//           />
//           <div>Notes</div>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// const handleComingSoon = () => {
//   toast.info("Coming soon");
// };

// const handleCreatePasskey = async () => {
//   async function registerPasskey() {
//     const createOptions = await startServerPasskeyRegistration();
//     const credential = await create(
//       createOptions as CredentialCreationOptionsJSON
//     );
//     await finishServerPasskeyRegistration(credential);
//   }
//   try {
//     await registerPasskey();
//     toast.success("Passkey created successfully");
//   } catch (error) {
//     toast.error("Error creating passkey");
//   }
// };

// const handleSignOut = async () => {
//   await signOut({ callbackUrl: "/" });
//   toast.success("Signed out successfully");
// };

// const AccountButton = () => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className="focus:outline-none">
//         <div className="px-2.5 py-1 rounded-md hover:bg-black/10 cursor-pointer">
//           <FaRegUserCircle size={24} />
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="font-sf-regular rounded-xl mr-2">
//         <DropdownMenuLabel className="flex flex-col pr-4">
//           <div className="text-lg">Sangeet Banerjee</div>
//           <div className="font-sf-light text-zinc-500 font-light">
//             sangeetbanerjee777@gmail.com
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem className="flex cursor-pointer space-x-2 items-center ">
//           <GoPasskeyFill
//             onClick={handleCreatePasskey}
//             className={"text-sky-500"}
//             size={18}
//           />
//           <div>Create New Passkey</div>
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem
//           onClick={handleSignOut}
//           className="flex cursor-pointer space-x-2 items-center"
//         >
//           <MdOutlineCancel className={"text-red-500"} size={18} />
//           <div>Sign Out</div>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
