import Calendar from '../Calendar/Calendar.js';
import Header from '../Header/Header.js';

import firebase from 'firebase/app';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import './Home.css';

function Home() {
  const uid = firebase.auth().currentUser.uid;
  const userDoc = firebase.firestore().collection('users').doc(uid);
  const [userData] = useDocumentData(userDoc);

  // if no user data, return loading
  if (!userData) {
    return <h1>Loading user...</h1>;
  }

  return (
    <div className="Home">
      <Header userData={userData} />
      <Calendar userData={userData} />
    </div>
  );
}

export default Home;
