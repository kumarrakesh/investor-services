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

import {
  LocalizationProvider,
  MobileDatePicker,
  DesktopDatePicker
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Backdrop, CircularProgress } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import useWindowSize from '../../../../utils/useWindowSize';

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
const AddInvestor = () => {
  const size = useWindowSize();
  const history = useHistory();
  const location = useLocation();

  const [investorDate, setInvestorDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [zipError, setZipError] = useState(false);

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
    showPassword: false,
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (location?.state?.row) {
      setFlag(true);
      console.log(location?.state?.row);
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
      Id: location?.state?.row._id,
      email: location?.state?.row.email,
      phone: location?.state?.row.phoneNo
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

  const handleValidation = () => {
    let formIsValid = true;

    if (isNaN(values.phone)) {
      formIsValid = false;
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }

    if (values?.investorZipCode?.trim() && isNaN(+values.investorZipCode)) {
      formIsValid = false;
      setZipError(true);
    } else {
      setZipError(false);
    }

    return formIsValid;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
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
          `${process.env.REACT_APP_API}/api/update/profile/admin`,
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
              userId: values.Id,
              phoneNo: values.phone,
              email: values.email
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
          successSwal.fire(
            'Investor "' + values.investorName + '" Updated successfully!',
            '',
            'success'
          );
        } else
          errorSwal.fire(data.error || 'Error while updating!', '', 'error');
      } else {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/admin/user/register`,
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
              maturity: investorDate,
              phoneNo: values.phone,
              email: values.email
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
          Swal.mixin({
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
          }).fire(
            'New Investor " ' + values.investorName + ' " sucessfully added ' ||
              'the investor!',
            '',
            'success'
          );
        } else
          Swal.mixin({
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
          }).fire(data.error || 'Something went wrong!', '', 'error');
      }

      history.push('/admin/investors');
    }
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

  useEffect(() => {
    if (values.investorZipCode == '') {
      setZipError(false);
    }
  }, [values.investorZipCode]);

  return (
    <div className="add-investors-main">
      {size.width > 768 ? (
        <div>
          <AdNavbar />
        </div>
      ) : (
        <div className="add-folio-header">
          <IconButton
            size="large"
            style={{ color: '#132f5e' }}
            onClick={() => {
              history.push('/admin/investors');
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <h2 className="add-folio-title">Add Investor</h2>
        </div>
      )}

      <div id="add-investors-container">
        {size.width > 768 && (
          <div>
            <div className="add-folio-header-pc">
              <h2 className="add-folio-title">Investors</h2>
              <IconButton
                size="large"
                style={{ color: '#132f5e' }}
                onClick={() => {
                  history.push('/admin/investors');
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </div>
            <h1 id="add-investors-subtitle">
              {flag ? 'Update' : 'Add'} Investor
            </h1>
          </div>
        )}

        <form action="" onSubmit={submitForm} className="add-inv-all-inputs">
          <div id="inv-id1">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">
                Investor Name *
              </small>
              <TextField
                required
                id="outlined-required"
                value={values.investorName}
                onChange={handleChange('investorName')}
                autoComplete="off"
                className="add-folio-searchbar"
              />
            </FormControl>

            <FormControl variant="outlined" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">
                Password *
              </small>
              <TextField
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                style={{ backgroundColor: 'white', color: '#132f5e' }}
                className="add-folio-searchbar"
              />
            </FormControl>
          </div>

          <div id="inv-id2">
            <FormControl
              variant="standard"
              sx={{ width: '100%' }}
              className="add-folio-registration-div"
            >
              <small className="add-folio-find-investor-label">
                Registration Date *
              </small>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  required
                  inputFormat="MM/dd/yyyy"
                  value={investorDate}
                  onChange={handleDateChange}
                  disableCloseOnSelect={false}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      className="add-folio-searchbar"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: '#132f5e',
                        svg: 'var(--primary-color)'
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">
                Passport Number *
              </small>
              <TextField
                required
                id="outlined-required"
                value={values.investorPassport}
                onChange={handleChange('investorPassport')}
                className="add-folio-searchbar"
              />
            </FormControl>
          </div>

          <div id="inv-id1">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">Email *</small>
              <TextField
                required
                id="outlined-required"
                value={values.email}
                onChange={handleChange('email')}
                autoComplete="off"
                className="add-folio-searchbar"
              />
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">
                Phone Number *
              </small>
              <TextField
                required
                id="outlined-required"
                value={values.phone}
                onChange={handleChange('phone')}
                autoComplete="off"
                className="add-folio-searchbar"
              />
              {phoneError && (
                <small className="input-field-helper-text">
                  Enter only digits!
                </small>
              )}
            </FormControl>
          </div>

          <div id="inv-id3">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">
                Address Line 1 *
              </small>
              <TextField
                required
                value={values.investorAddress1}
                onChange={handleChange('investorAddress1')}
                className="add-folio-searchbar"
              />
            </FormControl>
          </div>

          <div id="inv-id4">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">City</small>
              <TextField
                id="outlined-required"
                value={values.investorCity}
                onChange={handleChange('investorCity')}
                className="add-folio-searchbar"
              />
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">State</small>
              <TextField
                id="outlined-required"
                value={values.investorState}
                onChange={handleChange('investorState')}
                className="add-folio-searchbar"
              />
            </FormControl>
          </div>

          <div id="inv-id4">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">Country *</small>
              <TextField
                required
                id="outlined-required"
                value={values.investorCountry}
                onChange={handleChange('investorCountry')}
                className="add-folio-searchbar"
              />
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">Zip Code</small>
              <TextField
                id="outlined-number"
                value={values.investorZipCode}
                onChange={handleChange('investorZipCode')}
                InputLabelProps={{
                  shrink: true
                }}
                className="add-folio-searchbar"
              />
              {zipError && (
                <small className="input-field-helper-text">
                  Enter only digits!
                </small>
              )}
            </FormControl>
          </div>

          <div id="add-inv-btn">
            <Button
              variant="outlined"
              type="submit"
              id="add-folios-btn"
              style={{
                color: 'white',
                textTransform: 'none',
                width: '14rem',
                backgroundColor: '#E95B3E'
              }}
            >
              {flag ? 'Update' : 'Add'} Investor
            </Button>
          </div>
        </form>
      </div>
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
};

export default AddInvestor;
