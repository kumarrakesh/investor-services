import React, { useState } from 'react';
import './Header.css';
import LoginModal from '../LoginModal/LoginModal';
const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);

  return (
    <div id="header-container">
      <LoginModal handleClose={handleClose} modalShow={modalShow} />
      <img
        id="header-logo"
        src="https://tiwpe.com/image/tiw-logo.png"
        alt="tiwpe logo"
      />
      <button
        id="login-button"
        onClick={() => {
          setModalShow(true);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Header;
