export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface SaveDocumentResult {
  content: string;
  editCode: string;
  id: string;
  title: string;
}

export interface LoadDocumentResult {
  content: string;
  title: string;
}

export const saveDocumentAsync = async (
  document: string
): Promise<SaveDocumentResult> => {
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

export const loadDocumentAsync = async (
  id: string
): Promise<LoadDocumentResult | null> => {
  try {
    const response = await fetch(`${apiUrl}/note/${id}`, {
      method: "GET",
    });
    const body = await response.json();
    return body;
  } catch (e) {
    return null;
  }
};
