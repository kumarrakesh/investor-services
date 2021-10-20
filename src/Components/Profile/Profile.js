import React from 'react';
import Navbar from '../User/Navbar/Navbar';
import Button from '@mui/material/Button';
import './Profile.css';

const Profile = () => {
  return (
    <div id="header-container">
      <div className = "nav">
        <Navbar />
      </div>

      <div className = "profile-container">
        <div className = "profile-up">
          <h1 className = "profile">Profile</h1>
          <a href="/dashboard">
          <div className = "image"> 
          </div>
          </a>

          <div className = "edit-btn">
            <div><Button variant="outlined" className = "edit-pic" style={{ color: "#E95B3E" }}>Edit Picture</Button> </div>            
          </div>


        </div>
        <div className = "profile-down">
          <div className = "row">
            <div className = "item1">
            Name 
            Mr. John Smith
            </div>
            <div className = "item2">
            Passport Number
            XXSDJWE
            </div>
            <div className = "item3">
            Address
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>

          <div className="line"></div>

          <div className = "row">
            <div className = "item4">
            Amount  Invested
            ₦ 13947123
            </div>

            <div className = "item5">Investment Date
            14 May 2020</div>

            <div className = "item6">
            Maturity Date
            14 June 2020
            </div>
          </div>

        </div>
        
      </div>
    </div>

  )
};

export default Profile;
