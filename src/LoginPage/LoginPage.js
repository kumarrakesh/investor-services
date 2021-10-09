import './LoginPage.css';
import logo from '../assets/images/tiwpe-logo.png';
import { useHistory } from 'react-router';

const LoginPage = () => {
  const history = useHistory();
  const handleLogin = () => {
    history.push('/dashboard');
  };

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
          <input type="text" />
          <span className="login-input-helper">Password</span>
          <input type="password" name="" id="" />
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
