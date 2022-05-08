import { Note } from "../noteSlice";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface SaveNoteResult extends Note {}

export interface LoadNoteResult extends Note {}

export interface LoadNoteParams {
  id: string;
  editCode?: string;
}

export interface EditCodeValidationParams {
  id: string;
  editCode: string;
}

export const validateEditCodeAsync = async (
  args: EditCodeValidationParams
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
  document: string
): Promise<SaveNoteResult> => {
  const response = await fetch(`${apiUrl}/note`, {
    method: "POST",
    body: JSON.stringify({
      title: "test",
      content: document,
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

export const loadNoteAsync = async (
  args: LoadNoteParams
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
