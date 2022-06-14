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
import { useHotKeys } from "../app/hooks/useHotKeys";

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

  const createChangeTabHandler = useCallback(
    (tab: number) => {
      return () => {
        setActiveTab(tab);
        setEditorFocus(tab === 0);
        if (activeTab === 1) {
          setScrollY(window.scrollY);
        }
      };
    },
    [activeTab]
  );

  let saveLocked = false;
  const saveHandler = useCallback(() => {
    if (saveLocked) return;

    saveLocked = true;
    dispatch(saveNote());
  }, [dispatch]);

  const handleTabSwitch = useHotKeys({
    e: {
      handler: createChangeTabHandler(0),
    },
    у: {
      handler: createChangeTabHandler(0),
    },
    p: {
      handler: createChangeTabHandler(1),
    },
    ш: {
      handler: createChangeTabHandler(1),
    },
    i: {
      handler: createChangeTabHandler(2),
    },
    р: {
      handler: createChangeTabHandler(2),
    },
    s: {
      handler: () => saveHandler(),
    },
    ы: {
      handler: () => saveHandler(),
    },
  });

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
        <TabList>
          <Tab pt={3}>
            Editor
            <Box display={["none", "none", "block"]}>
              <Kbd ml={2}>Ctrl</Kbd> + <Kbd>E</Kbd>
            </Box>
          </Tab>
          <Tab pt={3}>
            Preview
            <Box display={["none", "none", "block"]}>
              <Kbd ml={2}>Ctrl</Kbd> + <Kbd>P</Kbd>
            </Box>
          </Tab>
          <Tab pt={3}>
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
