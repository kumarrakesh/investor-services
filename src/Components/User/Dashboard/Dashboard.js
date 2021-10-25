import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Navbar from '../Navbar/Navbar';
import DashContainer from './DashboardContainer';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 3000
      });
      history.push('/');
    }
  }, []);
  return (
    <div id="header-container" style={{ display: 'flex' }}>
      <div>
        <Navbar />
      </div>
      <div>
        <DashContainer />
      </div>
    </div>
  );
};

export default Dashboard;
