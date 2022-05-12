import { useToast } from "@chakra-ui/react";
import AppEditorWindow from "../../components/AppEditorWindow";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks/storeHooks";
import { useEffect } from "react";
import { loadNote, noteSaved } from "../../app/noteSlice";
import { NextSeo } from "next-seo";

const EditPage = () => {
  const router = useRouter();
  const { id, editCode } = router.query;
  const saving = useAppSelector((state) => state.note.saving);
  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (saving === "failed") {
      toast({
        title: "Update failed. Check your edit code!",
        status: "error",
        duration: 1500,
        variant: "solid",
      });
    }

    if (saving === "succeeded") {
      dispatch(noteSaved());
      router.push(`/${id}`);
      toast({
        title: "Note updated",
        status: "success",
        duration: 1500,
        variant: "solid",
      });
    }
  }, [id, editCode, router, dispatch, saving, toast]);

  useEffect(() => {
    if (
      id &&
      typeof id === "string" &&
      editCode &&
      typeof editCode === "string"
    )
      dispatch(
        loadNote({
          id,
          editCode,
        })
      );
  }, [dispatch, id, editCode]);

  return (
    <>
      <NextSeo
        title="Paste.md | Edit"
        description="Pastemd. Service for anonymous creating and sharing markdown files."
      />
      <AppEditorWindow pt={[0, 4, 6]} actionType="update" />
    </>
  );
};

export default EditPage;
