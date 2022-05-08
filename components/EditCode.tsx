import { Box, ChakraProps, Heading, Text, useToast } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

export interface EditCodeProps extends ChakraProps {
  code: string;
}

const EditCode = ({ code, ...props }: EditCodeProps) => {
  const toast = useToast();

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
        <CopyIcon /> {code}
      </Text>
    </Box>
  );
};

export default EditCode;
