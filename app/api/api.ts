﻿import { Note } from "../noteSlice";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export type SaveNoteArgs = Pick<Note, "title" | "content">;
export interface SaveNoteResult extends Note {}

export interface LoadNoteResult extends Note {}

export interface LoadNoteArgs {
  id: string;
  editCode?: string;
}

export interface EditCodeValidationArgs {
  id: string;
  editCode: string;
}

export const validateEditCodeAsync = async (
  args: EditCodeValidationArgs
): Promise<boolean> => {
  const response = await fetch(
    `${apiUrl}/note/${args.id}?editCode=${args.editCode}`,
    {
      method: "PUT",
      body: "{}",
    }
  );

  return response.status === 200;
};

export const saveNoteAsync = async (
  note: SaveNoteArgs
): Promise<SaveNoteResult> => {
  const response = await fetch(`${apiUrl}/note`, {
    method: "POST",
    body: JSON.stringify({
      title: note.title,
      content: note.content,
    }),
  });
  const body = await response.json();
  return body;
};

export const updateNoteAsync = async (note: Note) => {
  const response = await fetch(
    `${apiUrl}/note/${note.id}?editCode=${note.editCode}`,
    {
      method: "PUT",
      body: JSON.stringify(note),
    }
  );
  const body = await response.json();
  return body;
};

export const deleteNoteAsync = async ({
  id,
  editCode,
}: {
  id: string;
  editCode: string;
}) => {
  const response = await fetch(`${apiUrl}/note/${id}?editCode=${editCode}`, {
    method: "DELETE",
  });
  if (response.status !== 200) throw new Error(response.status.toString());
};

export const loadNoteAsync = async (
  args: LoadNoteArgs
): Promise<LoadNoteResult | null> => {
  try {
    const response = await fetch(`${apiUrl}/note/${args.id}`, {
      method: "GET",
    });
    const body = await response.json();
    return {
      id: args.id,
      editCode: args.editCode ?? "",
      content: body.content,
      title: body.title,
    };
  } catch (e) {
    return null;
  }
};
