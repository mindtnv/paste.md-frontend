export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface SaveNoteResult {
  content: string;
  editCode: string;
  id: string;
  title: string;
}

export interface LoadNoteResult {
  id: string;
  content: string;
  title: string;
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

export const loadNoteAsync = async (
  id: string
): Promise<LoadNoteResult | null> => {
  try {
    const response = await fetch(`${apiUrl}/note/${id}`, {
      method: "GET",
    });
    const body = await response.json();
    return {
      id,
      content: body.content,
      title: body.title,
    };
  } catch (e) {
    return null;
  }
};
