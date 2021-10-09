import React, { useState } from 'react';
import './Dashboard.css';
import LoginPage from '../LoginPage/LoginPage';
const Dashboard = () => {
  return (
    <div id="header-container">
      <LoginPage />
      <img
        id="header-logo"
        src="https://tiwpe.com/image/tiw-logo.png"
        alt="tiwpe logo"
      />
      <button
        id="login-button"
        onClick={() => {
          alert(1);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Dashboard;
