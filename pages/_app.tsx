import type { AppProps } from "next/app";
import AppLayout from "../components/layouts/AppLayout";
import Fonts from "../components/Fonts";
import ChakraLayout from "../components/layouts/ChakraLayout";
import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/index.css";
import SeoLayout from "../components/layouts/SeoLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraLayout>
      <SeoLayout>
        <Provider store={store}>
          <Fonts />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Provider>
      </SeoLayout>
    </ChakraLayout>
  );
}

export default MyApp;
