import { ChakraProps } from "@chakra-ui/react";
import { useAppSelector } from "../app/hooks/storeHooks";
import DocumentViewer from "./DocumentViewer";

export interface EditorDocumentViewerProps extends ChakraProps {}

const EditorDocumentViewer = ({ ...props }: EditorDocumentViewerProps) => {
  const document = useAppSelector((state) => state.document.document);
  return <DocumentViewer document={document ?? ""} {...props} />;
};

export default EditorDocumentViewer;
