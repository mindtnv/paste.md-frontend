import { Box, Container, Text } from "@chakra-ui/react";

const AppFooter = () => {
  return (
    <Box
      as="footer"
      w="100%"
      px={3}
      py={5}
      css={{ backdropFilter: "blur(8px)" }}
      zIndex={10}
      bottom={0}
      position="absolute"
    >
      <Container maxW="container.lg">
        <Text align="center">
          🛠 Builded by
          <Box color="orange.300" as="strong" mx={1}>
            <a href="https://gbms.site" target="_blank" rel="noreferrer">
              gbms
            </a>
          </Box>
          with <strong>Next</strong>/<strong>Chakra UI</strong>
        </Text>
      </Container>
    </Box>
  );
};

export default AppFooter;
