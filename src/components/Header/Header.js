import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import firebase from 'firebase/app';

import './Header.css';
import logo from '../../img/logo.png';

function Header(props) {
  return (
    <div className="Header">
      <h1>Shiftmate</h1>
      <img src={logo} alt="logo" />
      <span className="flex-fill" />
      <p>Signed in as {props.userData.name}</p>
      <button
        className="icon-button"
        onClick={() => firebase.auth().signOut()}
      >
        <ExitToAppIcon />
      </button>
    </div>
  );
}

export default Header;
