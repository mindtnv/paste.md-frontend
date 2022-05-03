import {ReactElement} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../../theme";

const ChakraLayout = ({
                        children,
                      }: {
  children: ReactElement | ReactElement[];
}) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraLayout;
