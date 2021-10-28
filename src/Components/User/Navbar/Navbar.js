import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './Navbar.css';

const Navbar = () => {
  const [imgURL, setImgURL] = useState('');
  const history = useHistory();
  useEffect(() => {
    setImgURL(localStorage.getItem('imageURL'));
    setImgURL(localStorage.getItem('username'));
  }, []);
  const GotoProfile = () => {
    history.push('/profile');
  };

  const GoToStatments = () => {
    history.push('/statements');
  };

  const GoToGrievances = () => {
    history.push('/grievances');
  };

  return (
    <div id="sidebar-main">
      <div id="header-logo">
        <img src="https://tiwpe.com/image/tiw-logo.png" alt="tiwpe logo" />
      </div>

      <Button
        variant="outlined"
        className="prof-btn"
        onClick={GotoProfile}
        style={{ color: '#E95B3E', textTransform: 'none' }}
      >
        <div className="pic">
          <img src={localStorage.getItem('imageURL')} alt="" />
        </div>

        <div className="prof-txt">
          <div className="welcome">
            <h4>Welcome,</h4>
          </div>
          <div className="prof-name">
            {localStorage.getItem('username')?.toUpperCase()}
          </div>
        </div>
      </Button>

      <Button
        variant="outlined"
        className="nav-dashboard-btn"
        onClick={() => {
          history.push('/dashboard');
        }}
        style={{ color: '#E95B3E', textTransform: 'none' }}
      >
        <div className="dash-icon">
          <DashboardIcon />
        </div>

        <div className="dash-name"> Dashboard </div>
        <div className="right-sign">
          <ChevronRightIcon />
        </div>
      </Button>

      <Button
        variant="outlined"
        className="nav-dashboard-btn"
        onClick={GoToStatments}
        style={{ color: '#E95B3E', textTransform: 'none' }}
      >
        <div className="dash-icon">
          <AccountBalanceIcon />
        </div>
        <div className="dash-name"> Account Statements </div>
        <div className="right-sign">
          <ChevronRightIcon />
        </div>
      </Button>

      <Button
        variant="outlined"
        className="nav-dashboard-btn"
        onClick={GoToGrievances}
        style={{ color: '#E95B3E', textTransform: 'none' }}
      >
        <div className="dash-icon">
          <AccountCircleSharpIcon />
        </div>
        <div className="dash-name">Grievances</div>
        <div className="right-sign">
          <ChevronRightIcon />
        </div>
      </Button>

      <Button
        variant="outlined"
        className="nav-dashboard-btn"
        onClick={() => {
          localStorage.clear();
          history.push('/');
        }}
        style={{ color: '#E95B3E', textTransform: 'none' }}
      >
        <div className="dash-icon">
          <LogoutIcon />
        </div>
        <div className="dash-name"> Logout </div>
        <div className="right-sign">
          <ChevronRightIcon />
        </div>
      </Button>
    </div>
  );
};

export default Navbar;
