import { Box, ChakraProps } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { documentViewerComponents } from "../app/documentViewerComponents";
import { useEffect, useRef } from "react";

export interface DocumentViewerProps extends ChakraProps {
  document: string;
}

const DocumentViewer = ({ document, ...props }: DocumentViewerProps) => {
  const ref = useRef<any>(null);
  useEffect(() => {
    ref.current.focus();
  });

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
