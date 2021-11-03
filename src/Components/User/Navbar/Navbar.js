import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Swal from 'sweetalert2';
import './Navbar.css';

const Navbar = () => {
  const [imgURL, setImgURL] = useState('https://tiwpe.com/image/tiw-logo.png');
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

  const GoToStatments = () => {
    history.push('/statements');
  };

  const GoToGrievances = () => {
    history.push('/grievances');
  };

  const handleLogout = () => {
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
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarOpenStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '2rem',
    top: 0,
    width: '100% !important'
  };
  return (
    <div className="navbar-both-container">
      <div
        id="navbar-top"
        style={
          navbarOpen
            ? navbarOpenStyles
            : { display: 'none', padding: '0px 2rem' }
        }
      >
        <div id="navbar-top-close" onClick={() => setNavbarOpen(false)}>
          x
        </div>
        <div id="navbar-top-header-logo">
          <img src="https://tiwpe.com/image/tiw-logo.png" alt="tiwpe logo" />
        </div>
        <div className="navbar-top-profile-pic">
          <img src="https://tiwpe.com/image/tiw-logo.png" alt="tiwpe logo" />
        </div>
      </div>

      <div id="sidebar-main">
        <div id="header-logo">
          <img src="https://tiwpe.com/image/tiw-logo.png" alt="tiwpe logo" />
        </div>

        <Divider
          style={{
            backgroundColor: '#E6E6E6 ',
            width: '100%',
            margin: '3px 0px'
          }}
        />

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
            textTransform: 'none'
          }}
        >
          <AccountBoxIcon />

          <div className="dash-name"> Profile </div>
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
          onClick={handleLogout}
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
    </div>
  );
};

export default Navbar;
