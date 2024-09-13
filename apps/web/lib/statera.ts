import { ENotesDialogType } from "@/types/common";
import { statera } from "statera";

export const useCreateNote = statera<{
  isOpen: boolean;
  type: ENotesDialogType;
}>({
  isOpen: false,
  type: ENotesDialogType.CREATE,
});
export const useCreatePhotos = statera<boolean>(false);
export const useCreateDrive = statera<boolean>(false);
