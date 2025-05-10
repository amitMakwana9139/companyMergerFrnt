// pages/_app.tsx

import { Provider } from 'react-redux';
import { store } from '../store/store'; // Make sure this is correct
import '../styles/globals.css';
import Head from 'next/head'; // Import Head from next/head

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Integrating Poppins font from Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
