import { ChakraProps } from "@chakra-ui/react";
import Editor from "./Editor";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { useEffect, useState } from "react";
import { loadFromLocalstorage } from "../app/settingsSlice";

export interface VimEditorProps extends ChakraProps {
  editorId: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  autoFocus: boolean;
}

const VimEditor = ({
  editorId,
  onKeyDown,
  onChange,
  autoFocus,
  ...props
}: VimEditorProps) => {
  const isVimMode = useAppSelector((state) => state.settings.isVimMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFromLocalstorage(editorId));
  }, [dispatch, editorId]);

  return (
    <>
      <Editor
        vimMode={isVimMode}
        editorId={editorId}
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
