"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCreatePhotos } from "@/lib/statera";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

const CreatePhotos = ({ refetch }: { refetch: () => void }) => {
  const [isOpen, setIsOpen] = useCreatePhotos();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload New File</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            refetch();
            setIsOpen(false);
            toast.success("File uploaded successfully");
          }}
          onUploadError={(error: Error) => {
            toast.error("Error uploading file");
          }}
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Done
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatePhotos;
