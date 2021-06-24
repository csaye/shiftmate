import React, { useEffect, useState } from 'react';
import Calendar from '../Calendar/Calendar.js';
import Header from '../Header/Header.js';
import SignIn from '../SignIn/SignIn.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../../util/firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';

// initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [loaded, setLoaded] = useState(false);

  useAuthState(firebase.auth());

  // set loaded after auth initialization
  useEffect(() => {
    firebase.auth().onAuthStateChanged(() => setLoaded(true));
  }, []);

  // if auth not loaded, return
  if (!loaded) {
    return (
      <div className="App">
        <h1>Loading auth...</h1>
      </div>
    );
  }

  return (
    <div className="App">
      {
        firebase.auth().currentUser ?
        <>
          <Header />
          <Calendar />
        </> :
        <SignIn />
      }
    </div>
  );
}

export default App;
