import '@/styles/globals.css';
import {AppProps} from "next/app";

function App({ pageProps, Component }: AppProps) {
  return <Component {...pageProps} />
};

export default App;