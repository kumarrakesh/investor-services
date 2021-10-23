import React, { useEffect, useContext } from 'react';
import DashContainer from '../../User/Dashboard/DashboardContainer';
import AdNavbar from '../Navbar/Navbar';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 2000
      });
      history.push('/');
    }
  });

  return (
    <div id="header-container" style={{ display: 'flex' }}>
      <div>
        <AdNavbar />
      </div>
      <div className="ad-dash-container">
        <DashContainer />
      </div>
    </div>
  );
};

export default AdminDashboard;
