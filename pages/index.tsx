import type { NextPage } from "next";
import {
  Box,
  Button,
  ChakraProps,
  Divider,
  Heading,
  Kbd,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useHotKeys } from "../app/hooks/useHotKeys";

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
  const router = useRouter();
  const createNoteHandler = useCallback(async () => {
    await router.push("/create");
  }, []);

  useHotKeys({
    Enter: {
      handler: createNoteHandler,
    },
  });

  return (
    <>
      <NextSeo
        title="Paste.md"
        description="Pastemd. Service for anonymous creating and sharing markdown files."
      />
      <Box px={6} h="100%" mx="auto" maxW="container.lg">
        <Block mt={[14, 24]} delay={0.1}>
          <Heading as="h1" fontSize={["3xl", "4xl"]} mb={[8, 12]}>
            Paste.md - improved paste.bin for markdown
          </Heading>
          <Text mb={8} fontSize={["xl", "2xl"]}>
            <strong>Paste.md</strong> - service for anonymous creating and
            sharing markdown files. There is beautiful markdown editor and{" "}
            <strong>VIM mode</strong>!
          </Text>
          <Link href="/create" passHref>
            <Button
              as="a"
              width={["100%", "100%", "auto"]}
              px={["6", "6", "10"]}
              height={["50px", "60px", "70px"]}
              colorScheme="orange"
              fontSize="xl"
            >
              <Box as="span" display={["none", "none", "inline-block"]} mr={8}>
                <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd>
              </Box>
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
            <strong>Open API</strong> - service for anonymous creating and
            sharing markdown files. There is beautiful markdown editor and{" "}
            <strong>VIM mode</strong>!
          </Text>
        </Block>
      </Box>
    </>
  );
};

export default Home;
