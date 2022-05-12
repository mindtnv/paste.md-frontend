import {
  Box,
  Button,
  Center,
  ChakraProps,
  Kbd,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../app/hooks/storeHooks";

export interface CreateUpdateButtonProps extends ChakraProps {
  actionType: "create" | "update";
  onClick?: () => void;
}

const CreateUpdateButton = ({
  actionType,
  onClick,
  ...props
}: CreateUpdateButtonProps) => {
  const saving = useAppSelector((state) => state.note.saving);

  return (
    <Button
      minW={["100%", 250]}
      colorScheme="green"
      variant="solid"
      size="lg"
      onClick={() => {
        if (onClick) onClick();
      }}
      {...props}
    >
      <>
        <Box mr={2} display={["none", "none", "block"]} as="span">
          <Kbd>Ctrl</Kbd>+<Kbd>S</Kbd>
        </Box>
        {saving === "idle" || saving === "failed" || saving === "succeeded" ? (
          actionType === "create" ? (
            "Create new paste"
          ) : (
            "Update paste"
          )
        ) : (
          <Box justifyContent="center">
            <Spinner />
          </Box>
        )}
      </>
    </Button>
  );
};

export default CreateUpdateButton;
