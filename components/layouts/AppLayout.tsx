import {ReactElement} from "react";
import {Box, ChakraProps, Container} from "@chakra-ui/react";
import AppNavBar from "../AppNavBar";

export type AppLayoutProps = {
  children: ReactElement;
} & ChakraProps;

const AppLayout = ({children, ...props}: AppLayoutProps) => {
  return (
    <Box as="main" minH="100vh" position="relative">
      <AppNavBar/>
      <Container py={5} maxW="container.2xl" {...props}>
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;
