import type { NextPage } from "next";
import { Box, Button, Divider, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Box px={6} h="100%" mx="auto" maxW="container.lg">
      <Box mt={[14, 24]}>
        <Heading as="h1" fontSize={["3xl", "4xl"]} mb={[8, 12]}>
          Paste.md - improved paste.bin for markdown
        </Heading>
        <Text mb={8} fontSize={["xl", "2xl"]}>
          <strong>Paste.md</strong> - service for anonymous creating and sharing
          markdown files. There is beautiful markdown editor and{" "}
          <strong>VIM mode</strong>!
        </Text>
        <Link href="/create" passHref>
          <Button
            as="a"
            width={["100%", "250px"]}
            height={["50px", "60px", "70px"]}
            colorScheme="orange"
          >
            Create note
          </Button>
        </Link>
      </Box>
      <Divider my={10} />
      <Box>
        <Heading as="h2" fontSize={["2xl", "3xl"]} my={[8, 10]}>
          Vim mode
        </Heading>
        <Text mb={8} fontSize={["xl", "2xl"]}>
          <strong>Paste.md</strong> - service for anonymous creating and sharing
          markdown files. There is beautiful markdown editor and{" "}
          <strong>VIM mode</strong>!
        </Text>
      </Box>
      <Divider my={10} />
      <Box>
        <Heading as="h2" fontSize={["2xl", "3xl"]} my={[8, 10]}>
          API
        </Heading>
        <Text mb={8} fontSize={["xl", "2xl"]}>
          <strong>Open API</strong> - service for anonymous creating and sharing
          markdown files. There is beautiful markdown editor and{" "}
          <strong>VIM mode</strong>!
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
