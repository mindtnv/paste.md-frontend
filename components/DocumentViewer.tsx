import { Box, ChakraProps } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { documentViewerComponents } from "../app/documentViewerComponents";
import {
  useVimNavigation,
  VimNavigationOptions,
} from "../app/hooks/useVimNavigation";
import NoSsr from "./NoSsr";

export interface DocumentViewerProps extends ChakraProps {
  document: string;
}

const vimNavigationOptions: VimNavigationOptions = {
  scrollSpeed: 10,
};

const DocumentViewer = ({ document, ...props }: DocumentViewerProps) => {
  const ref = useVimNavigation(vimNavigationOptions);

  return (
    <Box
      _focusVisible={{ outline: "none" }}
      bgColor="#0F111A"
      tabIndex={-1}
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
          {document}
        </ReactMarkdown>
      </NoSsr>
    </Box>
  );
};

export default DocumentViewer;
