import { Box, ChakraProps, Text, useToast } from "@chakra-ui/react";

export interface EditCodeProps extends ChakraProps {
  code: string;
}

const EditCode = ({ code, ...props }: EditCodeProps) => {
  const toast = useToast();

  return (
    <Box textAlign="center" {...props}>
      <Text fontSize={["md", "xl", "xl"]}>
        Your edit code:{" "}
        <Text
          as="span"
          color="green.400"
          fontWeight="bold"
          cursor="pointer"
          _hover={{
            color: "green.300",
          }}
          transition="ease-in"
          transitionProperty="color"
          transitionDuration=".1s"
          onClick={() => {
            navigator.clipboard.writeText(code);
            toast({
              title: "Copied to clipboard",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          {code}
        </Text>{" "}
        - it show once, so save it
      </Text>
    </Box>
  );
};

export default EditCode;
