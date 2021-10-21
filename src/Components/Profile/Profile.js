import React,{useHistory, useEffect, useContext ,useState} from 'react';
import { UserContext } from '../../userContext';
import Navbar from '../User/Navbar/Navbar';
import Button from '@mui/material/Button';
import './Profile.css';

const Profile = () => {
  const { userData } = useContext(UserContext);
  const [token,setToken] = useState(userData.token); 
  const [profile, setProfile] = useState("");
  
  useEffect(() => {
    setToken(userData.token);
    console.log(token);
    getProfileData(); 
  }, []);

  const getProfileData=async ()=>{ 
    const  response = await fetch(
    'https://investorbackend.herokuapp.com/api/profile',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token':token,
      },
      method: 'GET',
    }
    ); 

    setProfile(await response.json());    
  }

  console.log(profile);
  const name = profile?.data?.name;
  const AmountInv = profile?.data?.amountInvested;
  const passport =profile?.data?.passport;
  const currInvVal = profile?.data?.currentInvestedValue;
  const maturity =   profile?.data?.maturity;
  const  tdate = new Date (maturity || 0);
  const maturityDate = tdate.toLocaleDateString('en-gb');


  const city = profile?.data?.city;
  const state = profile?.data?.state;
  const country = profile?.data?.country;
  const pin = profile?.data?.pincode;

  const setDate = async()=>{

  }



  return (
    <div id="header-container">
      <div className="nav">
        <Navbar />
      </div>

      <div className="profile-container">
        <div className="profile-up">
          <h1 className="profile">Profile</h1>
          <a href="/dashboard">
            <div className="image"></div>
          </a>

          <div className="edit-btn">
            <div>
              <Button
                variant="outlined"
                className="edit-pic"
                style={{ color: '#E95B3E' }}
              >
                Edit Picture
              </Button>{' '}
            </div>
          </div>
        </div>
        <div className="profile-down">
          <div className="row">
            <div className="item1">Name {'\n'}{name}</div>
            <div className="item2">Passport Number {'\n'} {passport}</div>
            <div className="item3">
              Address {'\n'} {city},{state} , {country},PIN - {pin}
            </div>
          </div>

          <div className="line"></div>

          <div className="row">
            <div className="item4">Amount Invested {'\n'} ₦ {AmountInv}</div>

            <div className="item5">Investment Date {'\n'} 14 May 2020</div>

            <div className="item6">Maturity Date {'\n'} {maturityDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
