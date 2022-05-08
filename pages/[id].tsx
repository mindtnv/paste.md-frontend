﻿import {
  Box,
  Button,
  Heading,
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
import { baseUrl, validateEditCodeAsync } from "../app/api/api";
import EditCode from "../components/EditCode";
import { loadNote } from "../app/noteSlice";

const NotePage = () => {
  const router = useRouter();
  const { id, edit } = router.query;
  const dispatch = useAppDispatch();
  const note = useAppSelector((state) => state.note.note);
  const loading = useAppSelector((state) => state.note.loading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState<string[]>([]);
  const [validating, setValidating] = useState(false);
  const [editCode, setEditCode] = useState("");

  useEffect(() => {
    if (id && typeof id === "string") dispatch(loadNote(id));
  }, [id, dispatch]);

  return (
    <>
      <Box>
        {loading === "failed" ? (
          <Heading>404 not found</Heading>
        ) : (
          <Box overflowX="auto">
            <Box
              maxW="container.lg"
              mx="auto"
              alignContent="center"
              mt={[0, 4]}
              mb={[4, 8]}
              px={[2, 0]}
            >
              {edit ? (
                // @ts-ignore
                <EditCode my={[6, 8, 10]} code={edit} />
              ) : (
                <></>
              )}
              <NoteLink href={`${baseUrl}/${id}`} />
            </Box>
            <Skeleton
              id="viewer"
              isLoaded={loading === "succeeded"}
              minH="80vh"
              maxW="container.lg"
              mx="auto"
            >
              <NoteViewer
                note={note!}
                minW={["300px", "400px"]}
                w="100%"
                maxW="container.lg"
                mx="auto"
                px={["1.2rem", "2.5rem", "4rem"]}
                py={["1.5rem", "2rem", "3rem"]}
              />
              <Box
                mt={[8, 6]}
                display="flex"
                mx={[2, 0]}
                justifyContent="flex-end"
              >
                <Button
                  minW={["100%", "200px"]}
                  colorScheme="orange"
                  size="lg"
                  onClick={onOpen}
                >
                  Edit paste
                </Button>
              </Box>
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
              onChange={(e) => setEditCode(e.target.value)}
              colorScheme="orange"
              autoFocus
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
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
              }}
            >
              {validating ? <Spinner /> : "Edit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotePage;