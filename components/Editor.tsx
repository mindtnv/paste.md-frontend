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
import { loadFromLocalstorage, set } from "../app/documentSlice";

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
  editorId: string;
  autoFocus: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;

  onUpdate?(viewUpdate: ViewUpdate): void;
}

const Editor = ({
  vimMode,
  onChange,
  maxH,
  editorId,
  onKeyDown,
  onUpdate,
  autoFocus,
  ...props
}: EditorProps) => {
  const [localDocument, setLocalDocument] = useState<string | null>(null);
  const document = useAppSelector((state) => state.document.document);
  const dispatch = useAppDispatch();
  const [extensions, setExtensions] = useState(createBaseExtensions());

  useEffect(() => {
    if (vimMode)
      setExtensions(
        createBaseExtensions().concat([vimExtension, customKeymap])
      );
    else setExtensions(createBaseExtensions());
  }, [vimMode]);

  useEffect(() => {
    if (localDocument === null) {
      dispatch(loadFromLocalstorage(editorId));
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(
        set({
          document: localDocument,
          editorId: editorId,
        })
      );
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [localDocument, dispatch, editorId]);

  useEffect(() => {
    setLocalDocument(document);
  }, [document]);

  return (
    <Box {...props}>
      <ReactCodeMirror
        value={localDocument ?? ""}
        autoFocus={autoFocus}
        height={maxH as string}
        indentWithTab={true}
        extensions={extensions}
        theme={editorTheme}
        onChange={(value, viewUpdate) => {
          setLocalDocument(value);
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
