import {
  Box,
  ChakraProps,
  Heading,
  HStack,
  Kbd,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import NoSsr from "./NoSsr";
import EditorNoteViewer from "./EditorNoteViewer";
import VimModeSwitcher from "./VimModeSwitcher";
import VimEditor from "./VimEditor";
import { useAppDispatch } from "../app/hooks/storeHooks";
import CreateUpdateButton from "./CreateUpdateButton";
import { saveNote } from "../app/noteSlice";
import { motion } from "framer-motion";

export interface EditorWindowProps extends ChakraProps {
  actionType: "create" | "update";
}

const AppEditorWindow = ({ actionType, ...props }: EditorWindowProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editorFocus, setEditorFocus] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeTab === 1) window.scrollTo(0, scrollY);
  }, [activeTab, scrollY]);

  let lockButtons = false;
  const handleTabSwitch = useCallback(
    (e: KeyboardEvent) => {
      const setTab = (tab: number) => {
        setActiveTab(tab);
        setEditorFocus(tab === 0);
        if (activeTab === 1) {
          setScrollY(window.scrollY);
        }
      };
      if (e.ctrlKey && !lockButtons) {
        if (e.key === "e") {
          setTab(0);
        } else if (e.key === "p") {
          setTab(1);
        } else if (e.key === "h") {
          setTab(2);
        } else if (e.key === "i") {
          setTab(3);
        } else if (e.key === "s") {
          dispatch(saveNote());
          lockButtons = true;
        } else return;

        e.preventDefault();
      }
    },
    [activeTab]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleTabSwitch);
    return () => window.removeEventListener("keydown", handleTabSwitch);
  }, [handleTabSwitch]);

  return (
    <>
      <Tabs
        index={activeTab}
        colorScheme="orange"
        isFitted
        {...props}
        isLazy={false}
        onChange={setActiveTab}
        // @ts-ignore
        onKeyDown={handleTabSwitch}
      >
        <TabList pt={[6, 0]}>
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
        <TabPanels height="100%">
          <TabPanel p={0} py={[0, 6]} height="100%">
            <NoSsr>
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{
                  default: { duration: 0.3 },
                }}
              >
                <VimEditor
                  autoFocus={editorFocus}
                  onKeyDown={handleTabSwitch}
                  fontSize={[25, 30, 30]}
                  maxH="75vh"
                />
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{
                  default: { duration: 0.3 },
                }}
              >
                <HStack mt={[10, 8]} justifyContent="flex-end" px={2}>
                  <CreateUpdateButton
                    actionType={actionType}
                    onClick={() => dispatch(saveNote())}
                  />
                </HStack>
              </motion.div>
            </NoSsr>
          </TabPanel>
          <TabPanel p={0} py={[0, 6]} w="100%" overflow="auto">
            <NoSsr>
              <EditorNoteViewer
                // @ts-ignore
                id="viewer"
                // @ts-ignore
                minW="400px"
                w="100%"
                maxW="container.lg"
                mx="auto"
                px={["1.2rem", "2.5rem", "4rem"]}
                py={["1.5rem", "2rem", "3rem"]}
              />
            </NoSsr>
          </TabPanel>
          <TabPanel p={0} py={[0, 6]} w="100%" overflow="auto">
            Instruction
          </TabPanel>
          <TabPanel p={0} py={[0, 6]} w="100%" overflow="auto">
            <Box mt={8} px={4}>
              <Heading mb={4}>Vim settings</Heading>
              <HStack>
                <VimModeSwitcher />
              </HStack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AppEditorWindow;
