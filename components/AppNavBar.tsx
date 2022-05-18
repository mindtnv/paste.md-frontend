import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import AppNavBarLink from "./AppNavBarLink";
import AppNavBarLogo from "./AppNavBarLogo";

const AppNavBar = () => {
  return (
    <Box
      as="nav"
      w="100%"
      px={3}
      py={3}
      bg={useColorModeValue("#ffffff60", "#1D2234")}
      css={{ backdropFilter: "blur(8px)" }}
      zIndex={10}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between">
          <AppNavBarLogo />
          <HStack spacing={7} display={{ base: "none", sm: "flex" }}></HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default AppNavBar;
