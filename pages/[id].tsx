import { Box, Heading, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { useEffect } from "react";
import { loadDocument } from "../app/documentSlice";
import DocumentViewer from "../components/DocumentViewer";
import NoteLink from "../components/NoteLink";
import { baseUrl } from "../app/api/api";
import EditCode from "../components/EditCode";

const NotePage = () => {
  const router = useRouter();
  const { id, edit } = router.query;
  const dispatch = useAppDispatch();
  const document = useAppSelector((state) => state.document.document);
  const loading = useAppSelector((state) => state.document.loading);

  useEffect(() => {
    if (id && typeof id === "string") dispatch(loadDocument(id));
  }, [id, dispatch]);

  return (
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
              <EditCode code={edit} />
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
            <DocumentViewer
              document={document!}
              minW="400px"
              w="100%"
              maxW="container.lg"
              mx="auto"
              px={["1.2rem", "2.5rem", "4rem"]}
              py={["1.5rem", "2rem", "3rem"]}
            />
          </Skeleton>
        </Box>
      )}
    </Box>
  );
};

export default NotePage;
