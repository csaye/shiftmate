import Head from 'next/head';

import firebase from 'firebase/app';
import { firebaseConfig } from '/util/firebaseConfig.js';

import '../styles/globals.css';

// initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
