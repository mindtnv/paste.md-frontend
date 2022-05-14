import { Box, Skeleton, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { useCallback, useEffect } from "react";
import NoteViewer from "../components/NoteViewer";
import NoteLink from "../components/NoteLink";
import {
  baseUrl,
  deleteNoteAsync,
  validateEditCodeAsync,
} from "../app/api/api";
import EditCode from "../components/EditCode";
import { loadNote } from "../app/noteSlice";
import NoteTitle from "../components/NoteTitle";
import NotFound from "../components/NotFound";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import EditCodeModal, { OnInvokeArgs } from "../components/EditCodeModal";

const NotePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id, edit, showLink } = router.query;
  const note = useAppSelector((state) => state.note.note);
  const loading = useAppSelector((state) => state.note.loading);
  const editDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();

  const onEdit = useCallback(
    async (args: OnInvokeArgs) => {
      args.setLoading(true);
      const isValid = await validateEditCodeAsync({
        id: id as string,
        editCode: args.editCode,
      });
      args.setLoading(false);
      if (isValid) {
        await router.push(`/edit/${id}?editCode=${args.editCode}`);
      } else {
        args.setErrors(["Edit code is not valid"]);
      }
    },
    [router, id]
  );

  const onDelete = useCallback(
    async (args: OnInvokeArgs) => {
      args.setLoading(true);
      try {
        await deleteNoteAsync({ id: note.id, editCode: args.editCode });
        await router.push("/");
      } catch (_) {
        args.setErrors(["Edit code is not valid"]);
      } finally {
        args.setLoading(false);
      }
    },
    [router, note]
  );

  // Load Note
  useEffect(() => {
    if (id && typeof id === "string") dispatch(loadNote({ id: id }));
  }, [id, dispatch]);

  // Scroll to Anchor
  useEffect(() => {
    if (note.content !== "" && window.location.hash) {
      const element = document.getElementById(
        window.location.hash.substring(1)
      );
      if (element !== null) {
        element.classList.add("target");
        window.scrollTo({
          top: element.offsetTop - 10,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [note]);

  return (
    <>
      <NextSeo
        title="Paste.md | Browse"
        description="Pastemd. Service for anonymous creating and sharing markdown files."
      />
      <Box mb={[0, 14]}>
        {loading === "failed" ? (
          <NotFound text="Note not found 👽" />
        ) : (
          <Box overflowX="auto">
            <Box
              maxW="container.lg"
              mx="auto"
              alignContent="center"
              mt={[0, 4]}
              mb={[0, 4]}
            >
              {showLink === "true" ? (
                <motion.div
                  animate={{ opacity: [0, 1], y: [-30, 0] }}
                  transition={{
                    default: { duration: 0.3 },
                  }}
                >
                  <NoteLink
                    mt={[6, 10, 14]}
                    mb={[6, 0]}
                    borderRadius={[0, 5]}
                    borderWidth={[0, 1]}
                    href={`${baseUrl}/${id}`}
                  />
                </motion.div>
              ) : (
                <></>
              )}
            </Box>

            <Skeleton
              id="viewer"
              isLoaded={loading === "succeeded"}
              minH="60vh"
              maxW="container.lg"
              mx="auto"
              mt={[0, 10, 16]}
            >
              <motion.div
                animate={{ opacity: [0, 1], y: [-30, 0] }}
                transition={{
                  default: { duration: 0.3 },
                }}
              >
                <NoteTitle
                  onEdit={() => {
                    editDisclosure.onOpen();
                  }}
                  onDelete={() => {
                    deleteDisclosure.onOpen();
                  }}
                />
                {edit ? (
                  <EditCode
                    // @ts-ignore
                    code={edit}
                    borderWidth={0}
                    borderLeftWidth={[0, 1]}
                    borderRightWidth={[0, 1]}
                    borderBottomWidth={1}
                    borderRadius={0}
                    px={["1.2rem", "2.5rem", "4rem"]}
                    py={6}
                  />
                ) : (
                  <></>
                )}

                <NoteViewer
                  borderWidth={[0, 1]}
                  borderTop={0}
                  borderTopRadius={0}
                  note={note!}
                  minW={["300px", "400px"]}
                  w="100%"
                  maxW="container.lg"
                  mx="auto"
                  px={["1.2rem", "2.5rem", "4rem"]}
                  py={["1.5rem", "2rem", "3rem"]}
                />
              </motion.div>
            </Skeleton>
          </Box>
        )}
      </Box>

      {/*Edit Note Modal*/}
      <EditCodeModal
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        initialEditCode={edit as string}
        buttonText="Edit"
        buttonColorScheme="orange"
        onInvoke={(args) => onEdit(args)}
      />
      {/*Delete Note Modal*/}
      <EditCodeModal
        isOpen={deleteDisclosure.isOpen}
        onClose={deleteDisclosure.onClose}
        initialEditCode={edit as string}
        buttonText="Delete"
        buttonColorScheme="red"
        onInvoke={(code) => onDelete(code)}
      />
    </>
  );
};

export default NotePage;
