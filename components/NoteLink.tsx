import {
  Box,
  ChakraProps,
  Heading,
  Kbd,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

export interface NoteLinkProps extends ChakraProps {
  href: string;
}

const NoteLink = ({ href, ...props }: NoteLinkProps) => {
  const toast = useToast();
  return (
    <Box
      textAlign="center"
      borderRadius={5}
      borderWidth={1}
      bgColor="#0F111A"
      py={4}
      px={2}
      fontSize={["sm", "md", "lg", "xl"]}
      {...props}
    >
      <Heading as="h2" fontSize="2xl" mb={2}>
        Your paste link
      </Heading>
      <Text>
        <Text
          as="span"
          color="green.400"
          borderRadius={5}
          px={3}
          py={1}
          textDecoration="underline"
          cursor="pointer"
          _hover={{
            color: "green.300",
          }}
          transition="ease-in"
          transitionProperty="color"
          transitionDuration=".1s"
          onClick={() => {
            navigator.clipboard.writeText(href);
            toast({
              title: "Copied to clipboard",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          {href}
        </Text>
        <Box as="span" display={["none", "none", "inline-block"]}>
          <Kbd ml={2} mr={1}>
            Ctrl
          </Kbd>
          +<Kbd ml={1}>C</Kbd>
        </Box>
      </Text>
    </Box>
  );
};

export default NoteLink;
