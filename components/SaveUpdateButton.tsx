import { saveNote } from "../app/noteSlice";
import { Button, Center, ChakraProps, Spinner } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";

export interface SaveUpdateButton extends ChakraProps {
  actionType: "create" | "update";
}

const SaveUpdateButton = ({ actionType, ...props }: SaveUpdateButton) => {
  const dispatch = useAppDispatch();
  const saving = useAppSelector((state) => state.note.saving);

  return (
    <Button
      minW={["100%", 250]}
      colorScheme="green"
      size="lg"
      onClick={() => {
        dispatch(saveNote());
      }}
    >
      {saving === "idle" || saving === "failed" || saving === "succeeded" ? (
        actionType === "create" ? (
          "Create new paste"
        ) : (
          "Update paste"
        )
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </Button>
  );
};

export default SaveUpdateButton;
