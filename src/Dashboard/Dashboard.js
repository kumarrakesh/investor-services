import React from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
const Dashboard = () => {
  return (
    <div id="header-container">
      <Navbar />

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
