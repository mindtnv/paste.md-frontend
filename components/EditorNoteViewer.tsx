import { ChakraProps } from "@chakra-ui/react";
import { useAppSelector } from "../app/hooks/storeHooks";
import NoteViewer from "./NoteViewer";
import { emptyNote } from "../app/noteSlice";

export interface EditorDocumentViewerProps extends ChakraProps {}

const EditorNoteViewer = ({ ...props }: EditorDocumentViewerProps) => {
  const note = useAppSelector((state) => state.note.note);
  return <NoteViewer note={note ?? emptyNote} {...props} />;
};

export default EditorNoteViewer;
