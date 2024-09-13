import { ENotesDialogType, TCreateNoteState } from "@/types/common";
import { statera } from "statera";

export const useNoteState = statera<TCreateNoteState>({
  isOpen: false,
  type: ENotesDialogType.CREATE,
});
export const useCreatePhotos = statera<boolean>(false);
export const useCreateDrive = statera<boolean>(false);
