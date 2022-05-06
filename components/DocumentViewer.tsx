import { Box, ChakraProps } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { documentViewerComponents } from "../app/documentViewerComponents";

export interface DocumentViewerProps extends ChakraProps {
  document: string;
}

const DocumentViewer = ({ document, ...props }: DocumentViewerProps) => {
  return (
    <Box
      {...props}
      bgColor="#0F111A"
      fontSize={["md", "xl"]}
      color="#BCBFC7"
      borderRadius={5}
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
