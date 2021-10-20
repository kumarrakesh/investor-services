import React from 'react';
import DashContainer from '../../User/Dashboard/DashboardContainer';
import AdNavbar from '../Navbar/Navbar';

const AdminDashboard = () => {
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
