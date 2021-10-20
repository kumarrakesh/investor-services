import React from 'react';
import Navbar from '../Navbar/Navbar'; 
import DashContainer from './DashboardContainer';

const Dashboard = () => {
  return (
    <div id="header-container" style={{ display: "flex"}}>
      <div><Navbar/></div>  
      <div><DashContainer/></div>        
    </div>
  );
};

export default Dashboard;
