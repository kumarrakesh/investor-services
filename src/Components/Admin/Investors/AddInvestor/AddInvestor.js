import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import AdNavbar from '../../Navbar/Navbar';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import './AddInvestor.css';

import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Backdrop, CircularProgress } from '@mui/material';

const AddInvestor = () => {
  const history = useHistory();

  const [investorDate, setInvestorDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [values, setValues] = React.useState({
    investorName: '',
    investorPassword: '',
    investorPassport: '',
    investorAddress1: '',
    investorCity: '',
    investorState: '',
    investorCountry: '',
    investorZipCode: '',
    role: '616d2f528d908648c28d639e'
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDateChange = (newValue) => {
    setInvestorDate(newValue);
  };

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

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      'https://investorbackend.herokuapp.com/api/admin/user/register',
      {
        method: 'POST',
        body: JSON.stringify({
          name: values.investorName,
          username: values.investorPassport,
          password: values.password,
          passport: values.investorPassport,
          address: values.investorAddress1,
          city: values.investorCity,
          state: values.investorState,
          country: values.investorCountry,
          pincode: values.investorZipCode,
          role: values.role,
          maturity: investorDate
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': JSON.parse(localStorage.getItem('token'))
        }
      }
    );
    const data = await response.json();
    console.log(data);
    setLoading(false);

    if (data.success) {
      Swal.fire('Investor added successfully!', '', 'success');
    } else alert('Error while Adding');

    history.push('/admin/investors');
  };

  return (
    <div className="add-investors-main">
      <div>
        <AdNavbar />
      </div>

      <div id="add-investors-container">
        <h1 id="add-investors-title">Investors</h1>

        <div className="add-investors-cross-btn">
          <IconButton
            size="large"
            style={{ color: '#E95B3E' }}
            onClick={() => {
              history.push('/admin/investors');
            }}
          >
            <CancelIcon fontSize="inherit" />
          </IconButton>
        </div>

        <h1 id="add-investors-subtitle">Add Investor</h1>

        <form action="" onSubmit={submitForm} className="add-inv-all-inputs">
          <div className="investor-div" id="inv-id1">
            <FormControl variant="standard">
              <TextField
                required
                id="outlined-required"
                value={values.investorName}
                onChange={handleChange('investorName')}
                label=" Investor Name"
                style={{ width: '24rem' }}
              />
            </FormControl>

            <FormControl variant="standard">
              <TextField
                required
                id="outlined-required"
                value={values.investorPassword}
                onChange={handleChange('investorPassword')}
                label="Password"
                style={{ width: '24rem' }}
              />
            </FormControl>
          </div>

          <div className="investor-div" id="inv-id2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                required
                label="Registration Date "
                inputFormat="MM/dd/yyyy"
                value={investorDate}
                onChange={handleDateChange}
                disableCloseOnSelect={false}
                renderInput={(params) => (
                  <TextField required {...params} sx={{ width: '24rem ' }} />
                )}
              />
            </LocalizationProvider>

            <FormControl variant="standard">
              <TextField
                required
                id="outlined-required"
                value={values.investorPassport}
                onChange={handleChange('investorPassport')}
                label="Passport Number"
                style={{ width: '24rem' }}
              />
            </FormControl>
          </div>

          <div className="investor-div" id="inv-id3" required>
            <FormControl variant="standard">
              <TextField
                required
                id="outlined-required"
                value={values.investorAddress1}
                onChange={handleChange('investorAddress1')}
                label="Address Line 1"
              />
            </FormControl>
          </div>

          <div className="investor-div" id="inv-id4">
            <FormControl variant="standard">
              <TextField
                required
                id="outlined-required"
                value={values.investorCity}
                onChange={handleChange('investorCity')}
                label="City"
                style={{ width: '24rem' }}
              />
            </FormControl>

            <FormControl variant="standard">
              <TextField
                required
                id="outlined-required"
                value={values.investorState}
                onChange={handleChange('investorState')}
                label="State"
                style={{ width: '24rem' }}
              />
            </FormControl>
          </div>

          <div className="investor-div" id="inv-id4">
            <FormControl variant="standard">
              <TextField
                id="outlined-required"
                value={values.investorCountry}
                onChange={handleChange('investorCountry')}
                label="Country"
                style={{ width: '24rem' }}
              />
            </FormControl>

            <FormControl variant="standard">
              <TextField
                required
                id="outlined-required"
                value={values.investorZipCode}
                onChange={handleChange('investorZipCode')}
                label="Zip Code"
                style={{ width: '24rem' }}
              />
            </FormControl>
          </div>

          <div className="investor-div" id="add-inv-btn">
            <Button
              variant="outlined"
              type="submit"
              className="download-btn"
              style={{ color: '#E95B3E', textTransform: 'none' }}
            >
              Add Investor
            </Button>
          </div>
        </form>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default AddInvestor;
