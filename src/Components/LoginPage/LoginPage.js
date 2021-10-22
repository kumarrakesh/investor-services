import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import './LoginPage.css';
import logo from '../../assets/images/tiwpe-logo.png';
import { UserContext } from '../../userContext';

const LoginPage = () => {
  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const handleLogin = async () => {
    let response = await fetch(
      'https://investorbackend.herokuapp.com/api/user/signin',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username, password })
      }
    );
    let data = await response.json();
    console.log(data);
    setUserData({ role: data.role, token: data.token });
    if (data.status) {
        if ( data.role === 'ADMIN')
            history.push('/admin/dashboard');
        else history.push('/dashboard');
    }
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id="login-background">
      <div id="login-page-content">
        <div id="login-logo">
          <img src={logo} alt="Brand Logo" />
        </div>
        <div id="login-box">
          <span id="login-welcome-text">Welcome to TIW Private Equity</span>
          <span id="login-login-type">Nominee Login</span>
          <span className="login-input-helper">User name</span>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <span className="login-input-helper">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span
            id="login-forgot-password"
            onClick={() => {
              alert('action for forgot password');
            }}
          >
            Forgot Password?
          </span>
          <button id="login-submit-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
