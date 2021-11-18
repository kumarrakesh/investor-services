import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import './LoginPage.css';
import logo from '../../assets/images/tiwpe-logo.png';
import { UserContext } from '../../userContext';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const LoginPage = () => {
  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const [progress, setProgress] = useState(false);
  const [disability, setDisability] = useState(false);

  const handleLogin = async () => {
    setProgress(true);
    setDisability(true);
    let response = await fetch(`${process.env.REACT_APP_API}/api/user/signin`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    let data = await response.json();
    // console.log(data);
    setDisability(false);
    if (!data.status) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Username or Password is incorrect'
      });
      setProgress(false);
      return;
    }
    localStorage.setItem('token', JSON.stringify(data.token));
    let imgResponse = await fetch(`${process.env.REACT_APP_API}/api/profile`, {
      headers: {
        'x-access-token': data.token
      }
    });
    let imgData = await imgResponse.json();
    // console.log(imgData);
    localStorage.setItem('username', imgData.data.name);
    localStorage.setItem(
      'imageURL',
      `${process.env.REACT_APP_API}/api/profilePic/` + imgData.data.profilePic
    );
    setUserData({ role: data.role, token: data.token });
    if (data.status && data.role === 'ADMIN') {
      history.push('/admin/investors');
    } else if (data.status && data.role === 'USER') {
      history.push('/dashboard');
    } else {
      setProgress(false);
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Username or Password is incorrect'
      });
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
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%'
            }}
          >
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
            {/* <span
            id="login-forgot-password"
            onClick={() => {
              alert('action for forgot password');
            }}
          >
            Forgot Password?
          </span> */}
            <Button
              id="login-submit-button"
              onClick={handleLogin}
              disabled={disability}
              type="submit"
            >
              Login
            </Button>
          </form>
          {progress === true && <CircularProgress />}
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
