import "../styles/globals.css";
import NextNProgress from 'nextjs-progressbar';

import initAuth from "../initAuth";

initAuth();

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <NextNProgress color="#d62"/>
      <Component {...pageProps} /> 
    </>
  )
}

export default MyApp;
