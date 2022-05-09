import { Box, Center, ChakraProps, Heading, Text } from "@chakra-ui/react";

export interface NotFoundProps extends ChakraProps {
  text: string;
}

const NotFound = ({ text, ...props }: NotFoundProps) => {
  return (
    <Center flexDirection="column" height="50vh" {...props}>
      <Box mb={2}>
        <Heading textAlign="center" as="h2" size="2xl">
          404
        </Heading>
      </Box>
      <Box>
        <Text textAlign="center" fontSize="xl">
          {text}
        </Text>
      </Box>
    </Center>
  );
};

export default NotFound;
