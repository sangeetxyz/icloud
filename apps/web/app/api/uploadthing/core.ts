import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { drives, photos } from "@/server/db/schema";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req: Request) => {
  const data = await getServerAuthSession();
  return data?.user;
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(photos).values({
        createdById: metadata.userId,
        name: file.name,
        link: file.url,
        size: file.size,
        type: file.type,
      });
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
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(drives).values({
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
