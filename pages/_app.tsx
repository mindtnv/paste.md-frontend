import type {AppProps} from "next/app";
import AppLayout from "../components/layouts/AppLayout";
import Fonts from "../components/Fonts";
import ChakraLayout from "../components/layouts/ChakraLayout";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ChakraLayout>
      <Fonts/>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ChakraLayout>
  );
}

export default MyApp;
