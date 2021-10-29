import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './Navbar.css';

const Navbar = () => {
  const [imgURL, setImgURL] = useState('');
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setImgURL(localStorage.getItem('imageURL'));
    // setImgURL(localStorage.getItem('username'));
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
        className="prof-btn"
        onClick={GotoProfile}
        style={{
          color: location.pathname == '/profile' ? '#E95B3E' : '#8997ae',
          backgroundColor:
            location.pathname == '/profile' ? '#F7F9FD' : 'inherit',
          textTransform: 'none'
        }}
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
      <Divider
        style={{
          backgroundColor: '#E6E6E6 ',
          width: '100%',
          margin: '2px 0px'
        }}
      />
      <Button
        className="nav-dashboard-btn"
        onClick={() => {
          history.push('/dashboard');
        }}
        style={{
          color: location.pathname == '/dashboard' ? '#E95B3E' : '#8997ae',
          backgroundColor:
            location.pathname == '/dashboard' ? '#F7F9FD' : 'inherit',
          textTransform: 'none'
        }}
      >
        <DashboardIcon />

        <div className="dash-name"> Dashboard </div>
        <ChevronRightIcon />
      </Button>
      <Divider
        style={{
          backgroundColor: '#E6E6E6 ',
          width: '100%',
          margin: '2px 0px'
        }}
      />
      <Button
        className="nav-dashboard-btn"
        onClick={GoToStatments}
        style={{
          color: location.pathname == '/statements' ? '#E95B3E' : '#8997ae',
          backgroundColor:
            location.pathname == '/statements' ? '#F7F9FD' : 'inherit',
          textTransform: 'none'
        }}
      >
        <AccountBalanceIcon />
        <div className="dash-name"> Account Statements </div>
        <ChevronRightIcon />
      </Button>
      <Divider
        style={{
          backgroundColor: '#E6E6E6 ',
          width: '100%',
          margin: '2px 0px'
        }}
      />
      <Button
        className="nav-dashboard-btn"
        onClick={GoToGrievances}
        style={{
          color: location.pathname == '/grievances' ? '#E95B3E' : '#8997ae',
          backgroundColor:
            location.pathname == '/grievances' ? '#F7F9FD' : 'inherit',
          textTransform: 'none'
        }}
      >
        <AccountCircleSharpIcon />
        <div className="dash-name">Grievances</div>
        <ChevronRightIcon />
      </Button>
      <Divider
        style={{
          backgroundColor: '#E6E6E6 ',
          width: '100%',
          margin: '2px 0px'
        }}
      />
      <Button
        className="nav-dashboard-btn"
        onClick={() => {
          localStorage.clear();
          history.push('/');
        }}
        style={{
          color:
            location.pathname == '/admin/grievances' ? '#E95B3E' : '#8997ae',
          backgroundColor:
            location.pathname == '/admin/grievances' ? '#F7F9FD' : 'inherit',
          textTransform: 'none'
        }}
      >
        <LogoutIcon />
        <div className="dash-name"> Logout </div>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default Navbar;
