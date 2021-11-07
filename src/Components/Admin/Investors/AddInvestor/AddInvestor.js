import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import AdNavbar from '../../Navbar/Navbar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import './AddInvestor.css';

import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Backdrop, CircularProgress } from '@mui/material';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';

const AddInvestor = () => {
  const history = useHistory();
  const location = useLocation();

  const [investorDate, setInvestorDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const [values, setValues] = React.useState({
    investorName: '',
    investorPassword: '',
    investorPassport: '',
    investorAddress1: '',
    investorCity: '',
    investorState: '',
    investorCountry: '',
    investorZipCode: '',
    role: '616d2f588d908648c28d63a1',
    Id: '',
    showPassword: false
  });

  useEffect(() => {
    if (location?.state?.row) {
      setFlag(true);
    }
    setInvestorBody();
  }, [location]);

  const setInvestorBody = async () => {
    setValues({
      investorName: location?.state?.row.name,
      investorPassword: '',
      investorPassport: location?.state?.row.passport,
      investorAddress1: location?.state?.row.address,
      investorCity: location?.state?.row.city,
      investorState: location?.state?.row.state,
      investorCountry: location?.state?.row.country,
      investorZipCode: location?.state?.row.pincode,
      Id: location?.state?.row._id
    });
  };

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

    if (flag) {
      setLoading(true);
      console.log('abcd', {
        name: values.investorName,
        password: values.investorPassword,
        passport: values.investorPassport,
        address: values.investorAddress1,
        city: values.investorCity,
        state: values.investorState,
        country: values.investorCountry,
        pincode: values.investorZipCode,
        maturity: investorDate,
        userId: values.Id
      });
      const response = await fetch(
        'https://investorbackend.herokuapp.com/api/update/profile/admin',
        {
          method: 'POST',
          body: JSON.stringify({
            name: values.investorName,
            password: values.investorPassword,
            passport: values.investorPassport,
            address: values.investorAddress1,
            city: values.investorCity,
            state: values.investorState,
            country: values.investorCountry,
            pincode: values.investorZipCode,
            maturity: investorDate,
            userId: values.Id
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

      if (data?.success) {
        Swal.fire('Updated successfully!', '', 'success');
      } else Swal.fire('Error while updating!', data?.error, 'error');
    } else {
      setLoading(true);
      const response = await fetch(
        'https://investorbackend.herokuapp.com/api/admin/user/register',
        {
          method: 'POST',
          body: JSON.stringify({
            name: values.investorName,
            username: values.investorPassport,
            password: values.investorPassword,
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

      if (data?.success) {
        Swal.fire('Added successfully!', '', 'success');
      } else Swal.fire('Error while updating!', data?.error, 'error');
    }

    history.push('/admin/investors');
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="add-investors-main">
      <div>
        <AdNavbar />
      </div>

      <div id="add-investors-container">
        <div className="add-investors-title-div">
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
        </div>

        <h1 id="add-investors-subtitle">{flag ? 'Update' : 'Add'} Investor</h1>

        <form action="" onSubmit={submitForm} className="add-inv-all-inputs">
          <div id="inv-id1">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.investorName}
                onChange={handleChange('investorName')}
                label=" Investor Name"
                autoComplete="off"
              />
            </FormControl>

            <FormControl variant="outlined" sx={{ width: '100%' }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password *
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.investorPassword}
                onChange={handleChange('investorPassword')}
                autoComplete="off"
                inputProps={{
                  autocomplete: 'off',
                  form: {
                    autocomplete: 'off'
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>

          <div id="inv-id2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                required
                label="Registration Date "
                inputFormat="MM/dd/yyyy"
                value={investorDate}
                onChange={handleDateChange}
                disableCloseOnSelect={false}
                renderInput={(params) => (
                  <TextField required {...params} sx={{ width: '100%' }} />
                )}
              />
            </LocalizationProvider>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.investorPassport}
                onChange={handleChange('investorPassport')}
                label="Passport Number"
              />
            </FormControl>
          </div>

          <div id="inv-id3">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                label="Address Line 1"
                value={values.investorAddress1}
                onChange={handleChange('investorAddress1')}
              />
            </FormControl>
          </div>

          <div id="inv-id4">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.investorCity}
                onChange={handleChange('investorCity')}
                label="City"
              />
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.investorState}
                onChange={handleChange('investorState')}
                label="State"
              />
            </FormControl>
          </div>

          <div id="inv-id4">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.investorCountry}
                onChange={handleChange('investorCountry')}
                label="Country"
              />
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-number"
                label="Zip Code"
                type="number"
                value={values.investorZipCode}
                onChange={handleChange('investorZipCode')}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
          </div>

          <div id="add-inv-btn">
            <Button
              variant="outlined"
              type="submit"
              style={{
                color: '#E95B3E',
                textTransform: 'none',
                width: '16rem'
              }}
            >
              {flag ? 'Update' : 'Add'} Investor
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
