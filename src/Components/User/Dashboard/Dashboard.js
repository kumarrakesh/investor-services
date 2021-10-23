import React, {useEffect} from 'react';
import {useHistory} from 'react-router';
import Navbar from '../Navbar/Navbar';
import DashContainer from './DashboardContainer';

const Dashboard = () => {
  const history = useHistory();
  
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      history.push("/");
    }
  },[]);
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
