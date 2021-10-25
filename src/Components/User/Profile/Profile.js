import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
// import { UserContext } from '../../../userContext';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import './Profile.css';

const Profile = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  const [profile, setProfile] = useState({
    name: 'Name',
    passport: 'passport',
    city: 'city',
    state: 'state',
    country: 'country',
    pincode: 'pincode',
    amountInvested: 0,
    maturity: new Date(0)
  });
  const [imgURL, setImgURL] = useState('https://via.placeholder.com/100');

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
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const response = await fetch(
      'https://investorbackend.herokuapp.com/api/profile',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        method: 'GET'
      }
    );
    const details = await response.json();
    setProfile(details.data);
    console.log(
      `https://investorbackend.herokuapp.com/api/profilePic/${details.profilePic}`
    );
    // try {
    //   const imgResponse = await fetch(
    //     `https://investorbackend.herokuapp.com/api/profilePic/${details.profilePic}`,
    //     {
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         'x-access-token': token
    //       },
    //       method: 'GET'
    //     }
    //   );
    //   const imgData = await imgResponse.json();
    //   console.log(imgData);
    //   // setImgURL;
    // } catch (e) {
    //   console.log(e);
    // }
  };
  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-container-content">
        <div className="profile-heading">Profile</div>
        <div className="profile-pic-edit-btn-holder">
          <a href="/dashboard">
            <div className="profile-image-holder">
              <img src={imgURL} alt="" className="profile-image--img" />
            </div>
          </a>

          <Button variant="contained" className="edit-btn">
            Edit Picture
          </Button>
        </div>

        <div className="profile-info">
          <div
            className="profile-info-row"
            style={{ borderBottom: ' 1px solid #E5E5E5' }}
          >
            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Name</div>
              <div className="profile-info-row-item-value">{profile.name}</div>
            </div>
            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Passport Number</div>
              <div className="profile-info-row-item-value">
                {profile.passport}
              </div>
            </div>
            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Address</div>
              <div className="profile-info-row-item-value" id="address">
                {profile.city}, {profile.state}, {profile.country}, PIN -{' '}
                {profile.pincode}
              </div>
            </div>
          </div>

          <div className="profile-info-row">
            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Amount Invested</div>
              <div className="profile-info-row-item-value">
                ₦{profile.amountInvested}
              </div>
            </div>

            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Investment Date</div>
              <div className="profile-info-row-item-value">
                {'investmentDate' || 'NO DATE'}
              </div>
            </div>

            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Maturity Date</div>
              <div className="profile-info-row-item-value">
                {(
                  new Date(profile?.maturity) || new Date(0)
                ).toLocaleDateString('en-gb')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
