import {
  Box,
  Divider,
  Heading,
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
          my={6}
          {...props}
        >
          {children}
        </Heading>
        {headerLevel < 3 ? <Divider mb={6} /> : <></>}
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
  p: ({ children }: any) => <Text mb={4}>{children}</Text>,
  ol: ({ children }: any) => <OrderedList mb={4}>{children}</OrderedList>,
  ul: ({ children }: any) => <UnorderedList mb={4}>{children}</UnorderedList>,
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
    <Box
      as="code"
      fontFamily="Iosevka"
      display="inline-block"
      borderRadius={2}
      px={2}
      bgColor="#FFFFFF30"
    >
      {children}
    </Box>
  ),
  pre: ({ children }: any) => (
    <Box as="pre" mb={4}>
      {children}
    </Box>
  ),

  table: ({ children }: any) => (
    <TableContainer mb={6}>
      <Table variant="simple">{children}</Table>
    </TableContainer>
  ),

  thead: ({ children }: any) => <Thead>{children}</Thead>,
  tbody: ({ children }: any) => <Tbody>{children}</Tbody>,
  tr: ({ children }: any) => <Tr>{children}</Tr>,
  th: ({ children }: any) => <Th>{children}</Th>,
  td: ({ children }: any) => <Td>{children}</Td>,
};
