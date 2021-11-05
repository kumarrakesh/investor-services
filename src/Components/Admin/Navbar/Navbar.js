import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button, Divider, IconButton } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import RightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Swal from 'sweetalert2';
import './Navbar.css';
import useWindowSize from '../../../utils/useWindowSize';

const AdNavbar = () => {
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
  const [navbarOpen, setNavbarOpen] = useState(false);
  //hooks
  const size = useWindowSize();
  const history = useHistory();
  const location = useLocation();
  //handlers
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
        Swal.mixin({
          toast: true,
          position: 'top-end',
          timer: 2000
        }).fire('You have been logged out', '', 'success');
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
          <img src="https://via.placeholder.com/100" />
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

            <div
              className="prof-btn"
              style={{ color: '#E95B3E', textTransform: 'none' }}
            >
              <div className="pic">
                <img src="https://via.placeholder.com/100" alt="" />
              </div>

              <div className="prof-txt">
                <div className="welcome">
                  <h4>Welcome,</h4>
                </div>
                <div className="prof-name">Admin</div>
              </div>
            </div>
            <Divider
              style={{
                backgroundColor: '#E6E6E6 ',
                width: '100%',
                margin: '2px 0px'
              }}
            />
          </>
        )}

        <Button
          className="nav-dashboard-btn"
          onClick={() => {
            history.push('/admin/investors');
          }}
          style={{
            color: location.pathname.startsWith('/admin/investor')
              ? '#E95B3E'
              : '#8997ae',
            backgroundColor: location.pathname.startsWith('/admin/investor')
              ? '#F7F9FD'
              : 'inherit',
            textTransform: 'none'
          }}
        >
          <AccountBalanceIcon style={{ flex: 1 }} />

          <div className="dash-name" style={{ flex: 2 }}>
            Investors
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
            history.push('/admin/funds');
          }}
          style={{
            color: location.pathname.startsWith('/admin/fund')
              ? '#E95B3E'
              : '#8997ae',
            backgroundColor: location.pathname.startsWith('/admin/fund')
              ? '#F7F9FD'
              : 'inherit',

            textTransform: 'none'
          }}
        >
          <AttachMoneyIcon style={{ flex: 1 }} />

          <div className="dash-name" style={{ flex: 2 }}>
            Funds
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
            history.push('/admin/investments');
          }}
          style={{
            color: location.pathname.startsWith('/admin/investment')
              ? '#E95B3E'
              : '#8997ae',
            backgroundColor: location.pathname.startsWith('/admin/investment')
              ? '#F7F9FD'
              : 'inherit',

            textTransform: 'none'
          }}
        >
          <AccountBalanceWalletIcon style={{ flex: 1 }} />

          <div className="dash-name" style={{ flex: 2 }}>
            Investments
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
            history.push('/admin/grievances');
          }}
          style={{
            color:
              location.pathname == '/admin/grievances' ? '#E95B3E' : '#8997ae',
            backgroundColor:
              location.pathname == '/admin/grievances' ? '#F7F9FD' : 'inherit',

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
            color: location.pathname == '/' ? '#E95B3E' : '#8997ae',
            backgroundColor: location.pathname == '/' ? '#F7F9FD' : 'inherit',

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

export default AdNavbar;
