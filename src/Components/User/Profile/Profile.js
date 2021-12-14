import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
// import { UserContext } from '../../../userContext';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@mui/material';
import Swal from 'sweetalert2';
import './Profile.css';
const errorSwal = Swal.mixin({
  customClass: {
    container: 'add-folio-swal-container',
    popup: 'add-folio-swal swal-error-bg-color',
    title: 'add-folio-swal-title'
  },
  imageUrl: '',
  imageHeight: 10,
  imageWidth: 10,
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});
const successSwal = Swal.mixin({
  customClass: {
    container: 'add-folio-swal-container',
    popup: 'add-folio-swal swal-success-bg-color',
    title: 'add-folio-swal-title'
  },
  imageUrl: '',
  imageHeight: 10,
  imageWidth: 10,
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});
const Profile = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const imageInput = useRef(null);
  const [profile, setProfile] = useState({
    data: {
      name: 'Name',
      passport: 'passport',
      city: 'city',
      state: 'state',
      country: 'country',
      pincode: 'pincode',
      amountInvested: 0,
      maturity: new Date(0)
    },
    AmountInvested: 0
  });
  const [imgURL, setImgURL] = useState('https://tiwpe.com/image/tiw-logo.png');
  const [showImageDialog, setShowImageDialog] = useState(false);

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
  const handleOpenSelector = () => {
    imageInput.current.click();
  };
  const handleCloseImageDialog = () => {
    setShowImageDialog(false);
  };

  const handleUploadImage = async () => {
    var formData = new FormData();
    formData.append('profilePic', selectedImage);
    formData.append('name', profile?.data?.name);
    formData.append('passport', profile?.data?.passport);
    formData.append('city', profile?.data?.city);
    formData.append('state', profile?.data?.state);
    formData.append('country', profile?.data?.country);
    formData.append('pincode', profile?.data?.pincode);
    formData.append('amountInvested', profile?.data?.amountInvested);
    formData.append('maturity', profile?.data?.maturity);

    var requestOptions = {
      method: 'POST',
      headers: { 'x-access-token': JSON.parse(localStorage.getItem('token')) },
      body: formData,
      redirect: 'follow'
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/update/profile`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setImgURL(
          `${process.env.REACT_APP_API}/api/profilePic/` +
            data?.data?.profilePic
        );
        localStorage.setItem(
          'imageURL',
          `${process.env.REACT_APP_API}/api/profilePic/` +
            data?.data?.profilePic
        );
        successSwal.fire('Uploaded image!', '', 'success');
      } else errorSwal.fire('Something went wrong', '', 'error');
    } catch (err) {
      errorSwal.fire('Something went wrong', '', 'error');
    }

    setShowImageDialog(false);
  };
  const getProfileData = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API}/api/profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      method: 'GET'
    });
    const details = await response.json();
    setProfile(details);
    try {
      const tempResponse = await fetch(
        `${process.env.REACT_APP_API}/api/profilePic/` +
          details?.data?.profilePic,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          method: 'GET'
        }
      );
      if (tempResponse.ok)
        setImgURL(
          details?.data?.profilePic
            ? `${process.env.REACT_APP_API}/api/profilePic/` +
                details?.data?.profilePic
            : 'https://tiwpe.com/image/tiw-logo.png'
        );
      else setImgURL('https://tiwpe.com/image/tiw-logo.png');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setImgURL('https://tiwpe.com/image/tiw-logo.png');
    }

    localStorage.setItem(
      'imageURL',
      details?.data?.profilePic
        ? `${process.env.REACT_APP_API}/api/profilePic/` +
            details?.data?.profilePic
        : 'https://tiwpe.com/image/tiw-logo.png'
    );
    setLoading(false);
  };
  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-container-content">
        <div className="profile-heading">Profile</div>
        <div className="profile-pic-edit-btn-holder">
          <div className="profile-image-holder">
            <img
              src={imgURL}
              alt=""
              className="profile-image--img"
              style={
                !loading ? { display: 'inline-block' } : { display: 'none' }
              }
              onError={() => {
                setImgURL('https://tiwpe.com/image/tiw-logo.png');
              }}
            />
          </div>
          <Button
            variant="contained"
            className="edit-btn"
            onClick={() => {
              setShowImageDialog(true);
            }}
          >
            Edit Picture
          </Button>
        </div>

        <div className="profile-info">
          <div
            className="profile-info-row"
            style={{ borderBottom: ' 1.5px solid #E5E5E5' }}
          >
            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Name</div>
              <div className="profile-info-row-item-value">
                {profile?.data?.name}
              </div>
            </div>
            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Passport Number</div>
              <div
                className="profile-info-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {profile?.data?.passport}
              </div>
            </div>

            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Phone Number</div>
              <div
                className="profile-info-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {profile?.data?.phoneNo}
              </div>
            </div>
          </div>

          <div className="profile-info-row">
            {/* <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Amount Invested</div>
              <div className="profile-info-row-item-value">
                $
                {Math.round(profile.AmountContributed * 100 + Number.EPSILON) /
                  100}
              </div>
            </div> */}

            {/* <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">
                Commitment Amount
              </div>
              <div className="profile-info-row-item-value">
                $
                {Math.round(profile.AmountCommited * 100 + Number.EPSILON) /
                  100}
              </div>
            </div> */}

            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Email</div>
              <div
                className="profile-info-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {profile?.data?.email}
              </div>
            </div>

            <div
              className="profile-info-row-item"
              style={{ display: 'flex', flex: '2' }}
            >
              <div
                className="profile-info-row-item-label"
                style={{ display: 'flex', flex: '2' }}
              >
                Address
              </div>
              <div
                className="profile-info-row-item-value"
                id="address"
                style={{ display: 'flex', flex: '2' }}
              >
                {profile?.data?.city}, {profile?.data?.state},
                {profile?.data?.country}, PIN -{profile?.data?.pincode}
              </div>
            </div>

            {/* <div className="profile-info-row-item">
              <div className="profile-info-row-item-label"></div>
              <div className="profile-info-row-item-value">
               
              </div>
            </div> */}

            {/* <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Investment Date</div>
              <div className="profile-info-row-item-value">
                {'investmentDate' || 'NO DATE'}
              </div>
            </div>

            <div className="profile-info-row-item">
              <div className="profile-info-row-item-label">Maturity Date</div>
              <div className="profile-info-row-item-value">
                {(
                  new Date(profile?.data?.maturity) || new Date(0)
                ).toLocaleDateString('en-gb')}
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={showImageDialog} onClose={handleCloseImageDialog}>
        <DialogTitle>Select an image to upload</DialogTitle>
        <DialogContent>
          <img
            width={'100%'}
            src={selectedImage && URL.createObjectURL(selectedImage)}
          />
          <input
            ref={imageInput}
            type="file"
            name="myImage"
            style={{ display: 'none' }}
            accept="image/png, image/gif, image/jpeg"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
          <Button
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            onClick={handleOpenSelector}
          >
            Select
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog}>Cancel</Button>
          <Button onClick={handleUploadImage} disabled={!selectedImage}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Profile;
