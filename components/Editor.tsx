import ReactCodeMirror, {
  EditorView,
  keymap,
  ViewUpdate,
} from "@uiw/react-codemirror";
import { vim } from "@replit/codemirror-vim";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { Box, ChakraProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { materialOcean } from "../theme/editor/materialOcean";
import { LanguageDescription } from "@codemirror/language";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import {
  loadNoteContentFromLocalstorage,
  setNoteContent,
} from "../app/noteSlice";

const editorTheme = EditorView.theme(
  {
    "&": {
      borderRadius: "6px",
      padding: "1rem 1.5rem",
      paddingRight: "0rem",
      paddingBottom: "0rem",
      fontFamily: "'Iosevka', monospace",
    },
  },
  {
    dark: true,
  }
);

const vimExtension = vim({
  status: true,
});

const customKeymap = keymap.of([
  {
    key: "c-p",
    run: () => true,
  },
  {
    key: "c-e",
    run: () => true,
  },
  {
    key: "c-h",
    run: () => true,
  },
  {
    key: "c-i",
    run: () => true,
  },
  {
    key: "c-s",
    run: () => true,
  },
]);

const createBaseExtensions = () => {
  return [
    markdown({
      base: markdownLanguage,
      codeLanguages: [
        LanguageDescription.of({
          extensions: ["js", "jsx", "ts", "tsx"],
          support: javascript({ jsx: true, typescript: true }),
          name: "js",
          alias: ["js", "jsx", "ts", "tsx"],
        }),
      ],
    }),
    materialOcean,
  ];
};

export interface EditorProps extends ChakraProps {
  vimMode: boolean;
  autoFocus: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;

  onUpdate?(viewUpdate: ViewUpdate): void;
}

const Editor = ({
  vimMode,
  onChange,
  maxH,
  onKeyDown,
  onUpdate,
  autoFocus,
  ...props
}: EditorProps) => {
  const [localNoteContent, setLocalNoteContent] = useState<string | null>(null);
  const noteContent = useAppSelector((state) => state.note.note.content);
  const [extensions, setExtensions] = useState(createBaseExtensions());
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (vimMode)
      setExtensions(
        createBaseExtensions().concat([vimExtension, customKeymap])
      );
    else setExtensions(createBaseExtensions());
  }, [vimMode]);

  useEffect(() => {
    if (localNoteContent === null) {
      dispatch(loadNoteContentFromLocalstorage());
      return;
    }
    const timeout = setTimeout(() => {
      dispatch(setNoteContent(localNoteContent));
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [localNoteContent, dispatch]);

  useEffect(() => {
    setLocalNoteContent(noteContent);
  }, [noteContent]);

  return (
    <Box {...props}>
      <ReactCodeMirror
        value={localNoteContent ?? ""}
        autoFocus={autoFocus}
        height={maxH as string}
        indentWithTab={true}
        extensions={extensions}
        theme={editorTheme}
        onChange={(value, viewUpdate) => {
          setLocalNoteContent(value);
        }}
        onKeyDown={(e: any) => {
          if (onKeyDown) onKeyDown(e);
        }}
        onUpdate={(viewUpdate: ViewUpdate) => {
          if (onUpdate) onUpdate(viewUpdate);
        }}
      />
    </Box>
  );
};

export default Editor;
