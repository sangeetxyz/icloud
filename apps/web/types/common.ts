export enum ECardOptionType {
  PHOTOS,
  DRIVE,
  NOTES,
}

export enum ENotesDialogType {
  CREATE,
  UPDATE,
}

export type TNote = {
  id: number;
  title: string;
  description: string;
};

export type TCreateNoteState =
  | {
      isOpen: boolean;
      type: ENotesDialogType.CREATE;
    }
  | {
      isOpen: boolean;
      type: ENotesDialogType.UPDATE;
      note: TNote;
    };
