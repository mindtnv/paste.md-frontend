import { ReactElement } from "react";
import { Box, ChakraProps, Container, HStack, VStack } from "@chakra-ui/react";
import AppNavBar from "../AppNavBar";
import AppFooter from "../AppFooter";

export type AppLayoutProps = {
  children: ReactElement;
} & ChakraProps;

const AppLayout = ({ children, ...props }: AppLayoutProps) => {
  return (
    <Box as="main" height="100vh" position="relative">
      <AppNavBar />
      <Container
        height="100%"
        pb={"7rem"}
        paddingInline={[0, 4]}
        maxW="container.2xl"
        {...props}
      >
        {children}
      </Container>
      <AppFooter />
    </Box>
  );
};

export default AppLayout;
