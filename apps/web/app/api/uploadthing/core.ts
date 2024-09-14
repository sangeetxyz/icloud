import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { drives, photos } from "@/server/db/schema";
import { api } from "@/trpc/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const ValidFileTypes = ["image", "video", "audio", "blob", "pdf", "text"];

const f = createUploadthing();

const auth = async (req: Request) => {
  const data = await getServerAuthSession();
  return data?.user;
}; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
      const res = await db.insert(photos).values({
        createdById: metadata.userId,
        name: file.name,
        link: file.url,
        size: file.size,
        type: file.type,
      });
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  fileUploader: f({
    audio: { maxFileSize: "4MB", maxFileCount: 1 },
    text: { maxFileSize: "4MB", maxFileCount: 1 },
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    blob: { maxFileSize: "4MB", maxFileCount: 1 },
    video: { maxFileSize: "4MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log();
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      const res = await db.insert(drives).values({
        createdById: metadata.userId,
        name: file.name,
        link: file.url,
        size: file.size,
        type: file.type,
      });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
