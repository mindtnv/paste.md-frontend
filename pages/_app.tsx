import type { AppProps } from "next/app";
import AppLayout from "../components/layouts/AppLayout";
import Fonts from "../components/Fonts";
import ChakraLayout from "../components/layouts/ChakraLayout";
import { Provider } from "react-redux";
import { store } from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraLayout>
      <Provider store={store}>
        <Fonts />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </ChakraLayout>
  );
}

export default MyApp;
