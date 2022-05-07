import { ChakraProps } from "@chakra-ui/react";
import Editor from "./Editor";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { useEffect } from "react";
import { loadDocumentFromLocalstorage } from "../app/documentSlice";

export interface VimEditorProps extends ChakraProps {
  onChange?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  autoFocus: boolean;
}

const VimEditor = ({
  onKeyDown,
  onChange,
  autoFocus,
  ...props
}: VimEditorProps) => {
  const isVimMode = useAppSelector((state) => state.settings.isVimMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDocumentFromLocalstorage());
  }, [dispatch]);

  return (
    <>
      <Editor
        vimMode={isVimMode}
        autoFocus={autoFocus}
        onKeyDown={(event) => {
          if (onKeyDown) onKeyDown(event);
        }}
        onChange={(event) => {
          if (onChange) onChange(event);
        }}
        {...props}
      />
    </>
  );
};

export default VimEditor;
