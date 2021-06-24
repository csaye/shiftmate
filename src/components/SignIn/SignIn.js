import firebase from 'firebase/app';

import './SignIn.css';
import logo from '../../img/logo.png';
import google from '../../img/google.svg';

function SignIn() {
  // creates user doc
  async function createUserDoc() {
    // get user doc
    const user = firebase.auth().currentUser;
    const userDoc = firebase.firestore().collection('users').doc(user.uid);
    const doc = await userDoc.get();
    // if user doc does not exist, set data
    if (!doc.exists) {
      await userDoc.set({
        name: user.displayName,
        profile: user.photoURL,
        admin: false,
        joined: new Date()
      });
    }
  }

  // opens google sign in popup
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    createUserDoc();
  }

  return (
    <div className="SignIn">
      <div className="center-box">
        <img className="logo" src={logo} alt="logo" />
        <h1>Shiftmate</h1>
        <button onClick={signInWithGoogle}>
          <div className="left-side">
            <img src={google} alt="google" />
          </div>
          <p>Sign in with Google</p>
        </button>
      </div>
    </div>
  );
}

export default SignIn;
