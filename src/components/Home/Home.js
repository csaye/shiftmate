import React, { useEffect, useState } from 'react';
import Calendar from '../Calendar/Calendar.js';
import Header from '../Header/Header.js';

import firebase from 'firebase/app';

import './Home.css';

function Home() {
  const [userData, setUserData] = useState(undefined);

  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const userDoc = firebase.firestore().collection('users').doc(uid);

  // retrieves user data from firebase and creates it if none
  async function getUserData() {
    const doc = await userDoc.get();
    // if user doc exists, set data
    if (doc.exists) setUserData(doc.data());
    // if user doc does not exist, create it
    else {
      const data = {
        name: user.displayName,
        profile: user.photoURL,
        admin: false,
        joined: new Date()
      };
      // update data
      await userDoc.set(data);
      setUserData(data);
    }
  }

  // get user data on start
  useEffect(() => {
    getUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if no user data, return loading
  if (!userData) {
    return <h1>Loading user...</h1>;
  }

  return (
    <div className="Home">
      <Header userData={userData} />
      <Calendar />
    </div>
  );
}

export default Home;
