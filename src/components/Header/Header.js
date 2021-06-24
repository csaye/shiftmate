import firebase from 'firebase/app';

import './Header.css';

function Header() {
  return (
    <div className="Header">
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
    </div>
  );
}

export default Header;
