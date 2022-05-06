import {
  Box,
  ChakraProps,
  HStack,
  Kbd,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NoSsr from "./NoSsr";
import EditorDocumentViewer from "./EditorDocumentViewer";
import VimModeSwitcher from "./VimModeSwitcher";
import VimEditor from "./VimEditor";

export interface EditorWindowProps extends ChakraProps {
  editorId: string;
}

const AppEditorWindow = ({ editorId, maxH, ...props }: EditorWindowProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editorFocus, setEditorFocus] = useState(true);
  const handleTabSwitch = (e: KeyboardEvent) => {
    console.log(e);
    if (e.ctrlKey) {
      if (e.key === "e") {
        setActiveTab(0);
        setEditorFocus(true);
      } else if (e.key === "p") {
        setActiveTab(1);
        setEditorFocus(false);
      } else if (e.key === "h") {
        setActiveTab(2);
        setEditorFocus(false);
      } else if (e.key === "i") {
        setActiveTab(3);
        setEditorFocus(false);
      } else return;

      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleTabSwitch);
    return () => window.removeEventListener("keydown", handleTabSwitch);
  }, []);

  return (
    <Tabs
      index={activeTab}
      colorScheme="orange"
      isFitted
      {...props}
      isLazy={false}
      onChange={setActiveTab}
      // @ts-ignore
      onKeyDown={handleTabSwitch}
      minH={400}
    >
      <TabList>
        <Tab>
          Editor
          <Box display={["none", "none", "block"]}>
            <Kbd ml={2}>Ctrl</Kbd> + <Kbd>E</Kbd>
          </Box>
        </Tab>
        <Tab>
          Preview
          <Box display={["none", "none", "block"]}>
            <Kbd ml={2}>Ctrl</Kbd> + <Kbd>P</Kbd>
          </Box>
        </Tab>
        <Tab>
          Instruction
          <Box display={["none", "none", "block"]}>
            <Kbd ml={2}>Ctrl</Kbd> + <Kbd>H</Kbd>
          </Box>
        </Tab>
        <Tab>
          Settings
          <Box display={["none", "none", "block"]}>
            <Kbd ml={2}>Ctrl</Kbd> + <Kbd>I</Kbd>
          </Box>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0} py={6}>
          <NoSsr>
            <VimEditor
              autoFocus={editorFocus}
              onKeyDown={handleTabSwitch}
              editorId={editorId}
              fontSize={[10, 15, 25]}
              maxH={maxH}
            />
          </NoSsr>
          <HStack mt={4}>
            <VimModeSwitcher editorId={editorId} />
          </HStack>
        </TabPanel>
        <TabPanel p={0} py={6} w="100%" overflow="auto">
          <NoSsr>
            <EditorDocumentViewer
              editorId={editorId}
              minW="400px"
              w="100%"
              maxW="container.lg"
              mx="auto"
              px={["1.2rem", "2.5rem", "4rem"]}
              py={["1.5rem", "2rem", "3rem"]}
            />
          </NoSsr>
        </TabPanel>
        <TabPanel>Instruction</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AppEditorWindow;
