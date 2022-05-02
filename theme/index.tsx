import {extendTheme, ThemeConfig} from "@chakra-ui/react";
import fonts from "./fonts";
import styles from "./styles";

const theme: ThemeConfig = extendTheme({
  fonts,
  styles,
  config: {initialColorMode: "dark", useSystemColorMode: true},
});

export default theme;
