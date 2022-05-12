import type { NextPage } from "next";
import {
  Box,
  Button,
  ChakraProps,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const Block = ({
  children,
  delay,
  ...props
}: ChakraProps & { children: any; delay: number }) => {
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{
        default: { duration: 0.3, delay },
      }}
    >
      <Box {...props}>{children}</Box>
    </motion.div>
  );
};

const Home: NextPage = () => {
  return (
    <Box px={6} h="100%" mx="auto" maxW="container.lg">
      <Block mt={[14, 24]} delay={0.1}>
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
            fontSize="xl"
          >
            Create note
          </Button>
        </Link>
      </Block>
      <Divider my={10} />
      <Block delay={0.2}>
        <Heading as="h2" fontSize={["2xl", "3xl"]} my={[8, 10]}>
          Vim mode
        </Heading>
        <Text mb={8} fontSize={["xl", "2xl"]}>
          Vim mode available in <strong>Editor</strong> and{" "}
          <strong>Document Viewer</strong>.
        </Text>
        <Divider my={10} />
        <Heading as="h2" fontSize={["2xl", "3xl"]} my={[8, 10]}>
          API
        </Heading>
        <Text mb={8} fontSize={["xl", "2xl"]}>
          <strong>Open API</strong> - service for anonymous creating and sharing
          markdown files. There is beautiful markdown editor and{" "}
          <strong>VIM mode</strong>!
        </Text>
      </Block>
    </Box>
  );
};

export default Home;
