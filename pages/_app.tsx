import { AppProps } from 'next/app';
import '../styles/globals.css'; // adjust the path to where your global styles are located

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
