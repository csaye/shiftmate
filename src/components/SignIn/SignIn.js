import firebase from 'firebase/app';

import './SignIn.css';
import logo from '../../img/logo.png';
import google from '../../img/google.svg';

function SignIn() {
  // opens google sign in popup
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
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
