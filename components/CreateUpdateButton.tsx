import { saveNote } from "../app/noteSlice";
import {
  Box,
  Button,
  Center,
  ChakraProps,
  Kbd,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";

export interface CreateUpdateButtonProps extends ChakraProps {
  actionType: "create" | "update";
}

const CreateUpdateButton = ({
  actionType,
  ...props
}: CreateUpdateButtonProps) => {
  const dispatch = useAppDispatch();
  const saving = useAppSelector((state) => state.note.saving);

  return (
    <Button
      minW={["100%", 250]}
      colorScheme="green"
      variant="solid"
      size="lg"
      onClick={() => {
        dispatch(saveNote());
      }}
    >
      <>
        <Box mr={2} display={["none", "none", "block"]}>
          <Kbd>Ctrl</Kbd>+<Kbd>S</Kbd>
        </Box>
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
      </>
    </Button>
  );
};

export default CreateUpdateButton;
