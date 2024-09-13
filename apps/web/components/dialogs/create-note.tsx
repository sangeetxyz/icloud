"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNoteState } from "@/lib/statera";
import { ENotesDialogType } from "@/types/common";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CreateOrUpdateNote = ({ refetch }: { refetch: () => void }) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [noteState, setNoteState] = useNoteState();
  const createNote = api.notes.create.useMutation();
  const updateNote = api.notes.update.useMutation();
  const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!data?.user) return;
    setIsLoading(true);
    if (noteState.type === ENotesDialogType.CREATE) {
      await createNote.mutateAsync(values);
    } else {
      await updateNote.mutateAsync({ ...values, id: noteState.note?.id });
    }
    setIsLoading(false);
    refetch();
    setNoteState({
      isOpen: false,
      type: ENotesDialogType.CREATE,
    });

    toast.success(
      `Note ${noteState.type === ENotesDialogType.CREATE ? "created" : "updated"} successfully`
    );
  }

  useEffect(() => {
    if (noteState.type === ENotesDialogType.UPDATE) {
      form.setValue("title", noteState.note?.title);
      form.setValue("description", noteState.note?.description);
    }
  }, [noteState.type]);

  return (
    <AlertDialog open={noteState.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new note</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="I want to do that" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your title of the note
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="The guy who loves huddle!"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your note content</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                disabled={isLoading}
                onClick={() =>
                  setNoteState({
                    isOpen: false,
                    type: ENotesDialogType.CREATE,
                  })
                }
                type="button"
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateOrUpdateNote;
