import { Box, ChakraProps } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { documentViewerComponents } from "../app/documentViewerComponents";
import { useEffect, useRef } from "react";
import {
  useVimNavigation,
  VimNavigationOptions,
} from "../app/hooks/useVimNavigation";

export interface DocumentViewerProps extends ChakraProps {
  document: string;
}

const vimNavigationOptions: VimNavigationOptions = {
  scrollSpeed: 10,
};

const DocumentViewer = ({ document, ...props }: DocumentViewerProps) => {
  const ref = useRef<any>(null);
  useEffect(() => {
    ref.current.focus();
  });
  useVimNavigation(ref.current, vimNavigationOptions);

  return (
    <Box
      _focusVisible={{ outline: "none" }}
      tabIndex={-1}
      ref={ref}
      bgColor="#0F111A"
      fontSize={["md", "xl"]}
      color="#BCBFC7"
      borderRadius={5}
      {...props}
    >
      <ReactMarkdown
        rehypePlugins={[remarkGfm]}
        components={documentViewerComponents}
      >
        {document}
      </ReactMarkdown>
    </Box>
  );
};

export default DocumentViewer;
