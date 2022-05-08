import { Box, ChakraProps } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { documentViewerComponents } from "../app/documentViewerComponents";
import {
  useVimNavigation,
  VimNavigationOptions,
} from "../app/hooks/useVimNavigation";
import NoSsr from "./NoSsr";
import { Note } from "../app/noteSlice";

export interface NoteViewerProps extends ChakraProps {
  note: Note;
}

const vimNavigationOptions: VimNavigationOptions = {
  scrollSpeed: 10,
};

const NoteViewer = ({ note, ...props }: NoteViewerProps) => {
  const ref = useVimNavigation(vimNavigationOptions);

  return (
    <Box
      _focusVisible={{ outline: "none" }}
      bgColor="#0F111A"
      tabIndex={-100}
      // @ts-ignore
      ref={ref}
      fontSize={["md", "xl"]}
      color="#BCBFC7"
      borderRadius={5}
      {...props}
    >
      <NoSsr>
        <ReactMarkdown
          rehypePlugins={[remarkGfm]}
          components={documentViewerComponents}
        >
          {note.content}
        </ReactMarkdown>
      </NoSsr>
    </Box>
  );
};

export default NoteViewer;
