import "keen-slider/keen-slider.min.css";
import { Provider } from "next-auth/client";
import "../styles/globals.css";
import "../styles/slider.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </Provider>
  );
}

export default MyApp;
