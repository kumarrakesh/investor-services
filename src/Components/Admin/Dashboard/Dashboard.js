import React, { useEffect, useContext } from 'react';
import DashContainer from '../../User/Dashboard/DashboardContainer';
import AdNavbar from '../Navbar/Navbar';
import { UserContext } from '../../../userContext';
import { useHistory } from 'react-router';

const AdminDashboard = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    // console.log(userData);
    if (userData.role !== 'ADMIN') history.replace('/dashboard');
  }, []);
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
