import {
  Box,
  Code,
  Divider,
  Heading,
  Image,
  Link,
  OrderedList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import { Options } from "react-markdown/lib/ast-to-react";

const headerFabric = (headerLevel: number) => {
  const fontSize = (headerLevel: number) => {
    if (headerLevel <= 4) return `${6 - headerLevel}xl`;
    if (headerLevel === 5) return "xl";
    if (headerLevel === 6) return "lg";
    return "md";
  };

  function header({ children, ...props }: any) {
    return (
      <>
        <Heading
          as={`h${headerLevel}`}
          color="white"
          fontSize={[fontSize(headerLevel + 1), fontSize(headerLevel)]}
          my={[6, 6, 8]}
          mt={[10, 12, 14]}
          {...props}
        >
          {children}
        </Heading>
        {headerLevel < 3 ? <Divider mb={[6, 6, 8]} /> : <></>}
      </>
    );
  }

  return header;
};

export const documentViewerComponents: Options["components"] = {
  h1: headerFabric(1),
  h2: headerFabric(2),
  h3: headerFabric(3),
  h4: headerFabric(4),
  h5: headerFabric(5),
  h6: headerFabric(6),
  p: ({ children }: any) => <Text mb={[6, 8]}>{children}</Text>,
  ol: ({ children }: any) => <OrderedList mb={[6, 8]}>{children}</OrderedList>,
  ul: ({ children }: any) => (
    <UnorderedList mb={[6, 8]}>{children}</UnorderedList>
  ),
  li: ({ children }: any) => <li>{children}</li>,
  a: ({ children, href }: any) => (
    <Link color="#80cbc4" href={href} target="_blank">
      {children}
    </Link>
  ),
  blockquote: ({ children }: any) => (
    <Box pl={4} pb={4} pt={2} borderLeft="4px solid #FFFFFF30">
      {children}
    </Box>
  ),
  code: ({ children }: any) => (
    <Code
      as="code"
      fontFamily="Iosevka"
      display="inline-block"
      borderRadius={2}
      colorScheme="red"
      fontSize="xl"
      px={2}
    >
      {children}
    </Code>
  ),
  pre: ({ children }: any) => (
    <Box mt={[-4, -4, -6]} as="pre" mb={[6, 6, 8]} overflow="auto">
      {children}
    </Box>
  ),

  table: ({ children }: any) => (
    <TableContainer mb={[6, 6, 8]}>
      <Table variant="simple" size="lg">
        {children}
      </Table>
    </TableContainer>
  ),

  thead: ({ children }: any) => <Thead>{children}</Thead>,
  tbody: ({ children }: any) => <Tbody>{children}</Tbody>,
  tr: ({ children }: any) => <Tr>{children}</Tr>,
  th: ({ children }: any) => <Th>{children}</Th>,
  td: ({ children }: any) => <Td>{children}</Td>,
  img: ({ children, src, alt }: any) => (
    <Image maxW="35%" display="inline-block" src={src} alt={alt}>
      {children}
    </Image>
  ),
};
