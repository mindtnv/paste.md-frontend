import type {NextPage} from "next";
import {Button, Heading} from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Heading>Paste.md index</Heading>
      <Link href="/create" passHref>
        <Button as="a">Create note</Button>
      </Link>
    </>
  );
};

export default Home;
