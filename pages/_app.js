import Head from 'next/head';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="App">
      <Head>
        <title>Shiftmate</title>
        <meta name="description" content="Company scheduling and communication." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <footer></footer>
    </div>
  );
}

export default MyApp;
