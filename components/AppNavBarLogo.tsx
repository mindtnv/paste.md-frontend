import {Heading, HStack} from "@chakra-ui/react";
import AppNavBarLink from "./AppNavBarLink";

const AppNavBarLogo = () => {
  return (
    <AppNavBarLink href="/" _hover={{textDecoration: "none"}}>
      <HStack alignContent="center" h="100%">
        <Heading as="h2" fontSize={26}>
          Paste.md
        </Heading>
      </HStack>
    </AppNavBarLink>
  );
};

export default AppNavBarLogo;
