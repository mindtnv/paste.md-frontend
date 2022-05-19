import { useToast } from "@chakra-ui/react";
import AppEditorWindow from "../components/AppEditorWindow";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { noteSaved } from "../app/noteSlice";
import { NextSeo } from "next-seo";

const CreatePage = () => {
  const saving = useAppSelector((state) => state.note.saving);
  const id = useAppSelector((state) => state.note.note.id);
  const editCode = useAppSelector((state) => state.note.note.editCode);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (saving === "failed") {
      toast({
        title: "Something went wrong!",
        status: "error",
        duration: 1500,
        variant: "solid",
      });
    }
    if (saving === "succeeded") {
      dispatch(noteSaved());
      router.push(`/${id}?edit=${editCode}&showLink=true`);
      toast({
        title: "Note created",
        status: "success",
        duration: 1500,
        variant: "solid",
      });
    }
  }, [id, editCode, router, dispatch, saving, toast]);

  return (
    <>
      <NextSeo
        title="Paste.md | Create"
        description="Pastemd. Service for anonymous creating and sharing markdown files."
      />
      <AppEditorWindow pt={[0, 4, 6]} actionType="create" />
    </>
  );
};

export default CreatePage;
