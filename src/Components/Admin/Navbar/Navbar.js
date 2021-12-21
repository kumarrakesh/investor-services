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
import HelpIcon from '@mui/icons-material/Help';
import Swal from 'sweetalert2';
import './Navbar.css';
import logo from '../../../assets/images/logo.jpeg';
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
        // Swal.mixin({
        //   toast: true,
        //   position: 'top-end',
        //   timer: 2000
        // }).fire('You have been logged out', '', 'success');
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
        <div
          id="navbar-top-header-logo"
          onClick={() => {
            history.push('/admin/investors');
          }}
        >
          <img src={logo} alt="tiwpe logo" />
        </div>
        <div className="navbar-top-profile-pic">
          <img src="https://via.placeholder.com/50" />
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
              <img src={logo} alt="tiwpe logo" />
            </div>

            <Divider
              style={{
                backgroundColor: '#E6E6E6 ',
                width: '100%',
                margin: '2px 0px'
              }}
            />

            <div
              className="prof-btn"
              style={{ color: '#E95B3E', textTransform: 'none' }}
            >
              <div className="pic">
                <img src="https://via.placeholder.com/50" alt="" />
              </div>

              <div className="prof-txt">
                <div className="welcome">
                  <p>Welcome,</p>
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

          <RightIcon
            style={{
              flex: 1,
              color: location.pathname.startsWith('/admin/investor')
                ? '#E95B3E'
                : 'transparent'
            }}
          />
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
            history.push('/admin/folios');
          }}
          style={{
            color: location.pathname.startsWith('/admin/folios')
              ? '#E95B3E'
              : '#8997ae',
            backgroundColor: location.pathname.startsWith('/admin/folios')
              ? '#F7F9FD'
              : 'inherit',

            textTransform: 'none'
          }}
        >
          <AttachMoneyIcon style={{ flex: 1 }} />

          <div className="dash-name" style={{ flex: 2 }}>
            Folios
          </div>
          <RightIcon
            style={{
              flex: 1,
              color: location.pathname.startsWith('/admin/folios')
                ? '#E95B3E'
                : 'transparent'
            }}
          />
        </Button>

        {/* <Button
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
        </Button> */}
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
            history.push('/admin/folioStatements');
          }}
          style={{
            color: location.pathname.startsWith('/admin/folioStatements')
              ? '#E95B3E'
              : '#8997ae',
            backgroundColor: location.pathname.startsWith(
              '/admin/folioStatements'
            )
              ? '#F7F9FD'
              : 'inherit',

            textTransform: 'none'
          }}
        >
          <AccountBalanceWalletIcon style={{ flex: 1 }} />

          <div className="dash-name" style={{ flex: 2 }}>
            Folio Statements
          </div>

          <RightIcon
            style={{
              flex: 1,
              color: location.pathname.startsWith('/admin/folioStatements')
                ? '#E95B3E'
                : 'transparent'
            }}
          />
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
            history.push('/admin/queries');
          }}
          style={{
            color:
              location.pathname == '/admin/queries' ? '#E95B3E' : '#8997ae',
            backgroundColor:
              location.pathname == '/admin/queries' ? '#F7F9FD' : 'inherit',

            textTransform: 'none'
          }}
        >
          <HelpIcon style={{ flex: 1 }} />
          <div className="dash-name" style={{ flex: 2 }}>
            Queries
          </div>

          <RightIcon
            style={{
              flex: 1,
              color: location.pathname.startsWith('/admin/queries')
                ? '#E95B3E'
                : 'transparent'
            }}
          />
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
          {/* <RightIcon style={{ flex: 1 }} /> */}
          <div style={{ flex: 1 }}></div>
        </Button>
      </div>
    </div>
  );
};

export default AdNavbar;
