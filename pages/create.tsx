import { Box } from "@chakra-ui/react";
import AppEditorWindow from "../components/AppEditorWindow";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { documentSaved } from "../app/documentSlice";

const CreatePage = () => {
  const saving = useAppSelector((state) => state.document.saving);
  const meta = useAppSelector((state) => state.document.meta);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (saving === "succeeded") {
      const id = meta.id;
      const editCode = meta.editCode;
      dispatch(documentSaved());
      router.push(`/${id}?edit=${editCode}`);
    }
  }, [meta, router, dispatch, saving]);

  return (
    <>
      <Box>
        <AppEditorWindow maxH="75vh" />
      </Box>
    </>
  );
};

export default CreatePage;
