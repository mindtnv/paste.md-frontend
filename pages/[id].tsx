import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { useEffect, useState } from "react";
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

const NotePage = () => {
  const router = useRouter();
  const { id, edit, showLink } = router.query;
  const dispatch = useAppDispatch();
  const note = useAppSelector((state) => state.note.note);
  const loading = useAppSelector((state) => state.note.loading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState<"edit" | "delete">("edit");
  const [errors, setErrors] = useState<string[]>([]);
  const [validating, setValidating] = useState(false);
  const [editCode, setEditCode] = useState(edit as string);

  useEffect(() => {
    if (id && typeof id === "string") dispatch(loadNote({ id: id }));
  }, [id, dispatch]);

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
                    setAction("edit");
                    onOpen();
                  }}
                  onDelete={() => {
                    setAction("delete");
                    onOpen();
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#0F111A">
          <ModalHeader>Enter your edit code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errors.map((e) => (
              <Text color="red.300" mb={[2, 4]} key={e}>
                {e}
              </Text>
            ))}
            <Input
              value={editCode}
              onChange={(e) => setEditCode(e.target.value)}
              colorScheme="orange"
              autoFocus
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              variant="ghost"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant={action === "edit" ? "ghost" : "solid"}
              colorScheme={action === "edit" ? "blue" : "red"}
              onClick={() => {
                if (action === "edit") {
                  setValidating(true);
                  validateEditCodeAsync({
                    // @ts-ignore
                    id: id,
                    editCode,
                  })
                    .then((isValid) => {
                      if (isValid) {
                        router.push(`/edit/${id}?editCode=${editCode}`);
                      } else {
                        setErrors(["Edit code not valid"]);
                      }
                    })
                    .finally(() => {
                      setValidating(false);
                    });
                }

                if (action === "delete") {
                  setValidating(true);
                  deleteNoteAsync({ id: note.id, editCode })
                    .then((r) => {
                      if (r === true) {
                        router.push("/");
                      } else {
                        setErrors(["Edit code not valid"]);
                      }
                    })
                    .catch(() => {
                      setErrors(["Edit code not valid"]);
                    })
                    .finally(() => {
                      setValidating(false);
                    });
                }
              }}
            >
              {validating ? <Spinner /> : action === "edit" ? "Edit" : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotePage;
