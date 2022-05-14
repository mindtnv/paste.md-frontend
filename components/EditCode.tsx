import { Box, ChakraProps, Kbd, Text, useToast } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useCallback } from "react";
import { useHotKeys } from "../app/hooks/useHotKeys";

export interface EditCodeProps extends ChakraProps {
  code: string;
}

const EditCode = ({ code, ...props }: EditCodeProps) => {
  const toast = useToast();
  const copyHandler = useCallback(() => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Edit code copied to clipboard",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  }, [toast]);
  useHotKeys({
    c: {
      handler: copyHandler,
    },
    с: {
      handler: copyHandler,
    },
  });
  return (
    <Box
      borderRadius={5}
      borderWidth={1}
      bgColor="#0F111A"
      fontSize={["sm", "md", "lg", "xl"]}
      {...props}
    >
      <Text as="p" fontSize={["sm", "md", "lg"]} mb={2}>
        Edit code - save it for edit note
      </Text>

      <Text
        as="span"
        color="green.400"
        fontWeight="bold"
        fontSize={["lg", "xl", "2xl"]}
        cursor="pointer"
        _hover={{
          color: "green.300",
        }}
        transition="ease-in"
        transitionProperty="color"
        transitionDuration=".1s"
        onClick={copyHandler}
      >
        <CopyIcon /> {code}
      </Text>
      <Box as="span" display={["none", "none", "inline-block"]} ml={4}>
        <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>
      </Box>
    </Box>
  );
};

export default EditCode;
