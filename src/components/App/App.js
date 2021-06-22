import Calendar from '../Calendar/Calendar.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../../util/firebaseConfig.js';

import './App.css';

// initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
