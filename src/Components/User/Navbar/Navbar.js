import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button, Divider, IconButton } from '@mui/material';

import Swal from 'sweetalert2';
import './Navbar.css';
import useWindowSize from '../../../utils/useWindowSize';
//icons
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import RightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {
  const navbarOpenStyles = {
    zIndex: 10,
    width: '100vw',
    height: 'calc( 100vh - 80px ) !important',
    alignItems: 'center',
    boxShadow: '3px 0px 6px 1px #0000001a',
    marginTop: '0px',
    display: 'flex',
    transform: 'translateX(0%)'
  };
  //states
  const [imgURL, setImgURL] = useState('https://tiwpe.com/image/tiw-logo.png');
  const [navbarOpen, setNavbarOpen] = useState(false);
  //hooks
  const size = useWindowSize();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    console.log(localStorage.getItem('imageURL'));
    if (
      localStorage.getItem('imageURL') ==
        'https://investorbackend.herokuapp.com/api/profilePic/' ||
      localStorage.getItem('imageURL') ==
        'https://investorbackend.herokuapp.com/api/profilePic/undefined'
    ) {
      setImgURL('https://tiwpe.com/image/tiw-logo.png');
    } else setImgURL(localStorage.getItem('imageURL'));
    // setImgURL(localStorage.getItem('username'));
  }, []);
  //handlers
  const GoToStatments = () => {
    history.push('/statements');
  };

  const GoToGrievances = () => {
    history.push('/grievances');
  };

  const handleLogout = () => {
    setNavbarOpen(false);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You have to login again',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire('Logged out!', 'You have been logged out.', 'success');
        history.push('/');
      }
    });
  };

  return (
    <div className="navbar-both-container">
      <div id="navbar-top">
        <div id="navbar-top-close" onClick={() => setNavbarOpen(!navbarOpen)}>
          <IconButton onClick={() => setNavbarOpen(!navbarOpen)}>
            <MenuIcon />
          </IconButton>
        </div>
        <div id="navbar-top-header-logo">
          <img src="https://tiwpe.com/image/tiw-logo.png" alt="tiwpe logo" />
        </div>
        <div className="navbar-top-profile-pic">
          <img
            src={imgURL}
            alt=""
            onError={() => {
              setImgURL('https://tiwpe.com/image/tiw-logo.png');
            }}
          />
        </div>
      </div>

      <div
        id="sidebar-main"
        style={
          navbarOpen
            ? navbarOpenStyles
            : size.width < 770
            ? { transform: 'translateX(-100%)' }
            : {}
        }
      >
        {size.width > 770 && (
          <>
            <div id="header-logo">
              <img
                src="https://tiwpe.com/image/tiw-logo.png"
                alt="tiwpe logo"
              />
            </div>

            <Divider
              style={{
                backgroundColor: '#E6E6E6 ',
                width: '100%',
                margin: '3px 0px'
              }}
            />
          </>
        )}

        <div
          className="prof-btn"
          style={{
            color: '#E95B3E',
            backgroundColor: 'inherit',
            textTransform: 'none'
          }}
        >
          <div className="pic">
            <img
              src={imgURL}
              alt=""
              onError={() => {
                setImgURL('https://tiwpe.com/image/tiw-logo.png');
              }}
            />
          </div>

          <div className="prof-txt">
            <div className="welcome">
              <h4>Welcome,</h4>
            </div>
            <div className="prof-name">
              {localStorage.getItem('username')?.toUpperCase()}
            </div>
          </div>
        </div>
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
            history.push('/profile');
          }}
          style={{
            color: location.pathname == '/profile' ? '#E95B3E' : '#8997ae',
            backgroundColor:
              location.pathname == '/profile' ? '#F7F9FD' : 'inherit',
            textTransform: 'none',
            display: 'flex'
          }}
        >
          <AccountBoxIcon style={{ flex: 1 }} />

          <div className="dash-name" style={{ flex: 2 }}>
            Profile
          </div>
          <RightIcon style={{ flex: 1 }} />
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
          <DashboardIcon style={{ flex: 1 }} />

          <div className="dash-name" style={{ flex: 2 }}>
            Dashboard
          </div>
          <RightIcon style={{ flex: 1 }} />
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
          <AccountBalanceIcon style={{ flex: 1 }} />
          <div className="dash-name" style={{ flex: 2 }}>
            Account Statements
          </div>
          <RightIcon style={{ flex: 1 }} />
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
          <AccountCircleSharpIcon style={{ flex: 1 }} />
          <div className="dash-name" style={{ flex: 2 }}>
            Grievances
          </div>
          <RightIcon style={{ flex: 1 }} />
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
          onClick={handleLogout}
          style={{
            color:
              location.pathname == '/admin/grievances' ? '#E95B3E' : '#8997ae',
            backgroundColor:
              location.pathname == '/admin/grievances' ? '#F7F9FD' : 'inherit',
            textTransform: 'none'
          }}
        >
          <LogoutIcon style={{ flex: 1 }} />
          <div className="dash-name" style={{ flex: 2 }}>
            Logout
          </div>
          <RightIcon style={{ flex: 1 }} />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
