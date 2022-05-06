import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import fonts from "./fonts";
import styles from "./styles";
import sizes from "./sizes";

const theme: ThemeConfig = extendTheme({
  fonts,
  styles,
  sizes,
  config: { initialColorMode: "dark", useSystemColorMode: true },
});

export default theme;
