import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { Backdrop, CircularProgress } from '@mui/material';
import AdNavbar from '../../Navbar/Navbar';
import './AddFolio.css';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
const AddFolio = () => {
  let history = useHistory();
  const [values, setValues] = React.useState({
    folioId: '',
    investorId: '',
    commitment: '',
    yield: '',
    folioNo: '',
    investorName: 'Name',
    address: 'address',
    city: 'city',
    state: 'state',
    country: 'country',
    pincode: 'PIN',
    userPassport: 'passport'
  });

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [helperText, setHelperText] = useState(true);

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

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/add/folio`,
        {
          method: 'POST',
          body: JSON.stringify({
            userId: values.userPassport,
            commitment: values.commitment,
            yield: values.yield,
            date: selectedDate,
            folioNumber: values.folioNo
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

      if (data.status) {
        Swal.fire('Folio added successfully!', '', 'success');
      } else Swal.fire('Something went wrong!', data?.error, 'error');
    } catch (e) {
      console.log(e);
    }
    history.push('/admin/folios');
  };

  const handleSearchInvestorName = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/user/search/passport`,
        {
          method: 'POST',
          body: JSON.stringify({
            passport: values.investorId
          }),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': JSON.parse(localStorage.getItem('token'))
          }
        }
      );
      const data = await response.json();
      console.log(data.user);
      if (!data.success) {
        setErrorName(true);
      } else {
        setValues({
          investorName: data?.user?.name,
          userPassport: data.user.passport,
          address: data.user.address,
          city: data.user.city,
          state: data.user.state,
          country: data.user.country,
          pincode: data.user.pincode
        });
        setErrorName(false);
        setHelperText(false);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div className="add-folios-main">
      <div>
        <AdNavbar />
      </div>

      <div id="add-folios-container">
        <div className="add-folio-header">
          <h1 className="add-folio-title">Folios</h1>
          <IconButton
            size="large"
            style={{ color: '#E95B3E' }}
            onClick={() => {
              history.push('/admin/folios');
            }}
          >
            <CancelIcon fontSize="inherit" />
          </IconButton>
        </div>

        <h1 id="add-folio-subtitle">Add New Folio</h1>

        <form action="" onSubmit={submitForm} className="add-folios-div">
          <div>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                label="Investor Passport No."
                value={values.investorId}
                onChange={handleChange('investorId')}
                defaultValue=""
                onKeyDown={(e) => {
                  if (e.key == 'Enter') {
                    e.preventDefault();
                    handleSearchInvestorName();
                    return;
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        style={{ color: 'red' }}
                        size="large"
                        onClick={handleSearchInvestorName}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {
                <small style={{ color: 'red' }}>
                  {errorName
                    ? 'Investor not found in system, Please add first'
                    : helperText
                    ? 'Add Passport Number to find Investor'
                    : ''}
                </small>
              }
            </FormControl>
          </div>

          <div className="add-folio-info">
            <div
              className="add-folio-info-row"
              style={{ borderBottom: ' 1px solid #E5E5E5' }}
            >
              <div className="add-folio-info-row-item">
                <div className="add-folio-info-row-item-label">
                  Investor Name
                </div>
                <div className="add-folio-info-row-item-value">
                  {values.investorName}
                </div>
              </div>

              <div className="add-folio-info-row-item">
                <div className="add-folio-info-row-item-label">
                  Passport Number
                </div>
                <div
                  className="add-folio-info-row-item-value"
                  style={{ textTransform: 'none' }}
                >
                  {values.userPassport}
                </div>
              </div>

              <div className="add-folio-info-row-item">
                <div className="add-folio-info-row-item-label">
                  Investor Address
                </div>
                <div
                  className="add-folio-info-row-item-value"
                  style={{ textTransform: 'none' }}
                >
                  {values.address},{values.city}, {values.state},
                  {values.country},PIN-{values.pincode}
                </div>
              </div>
            </div>
          </div>

          <div className="add-folio-input-1">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.folioNo}
                onChange={handleChange('folioNo')}
                label="Folio No."
              />
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  maxDate={new Date()}
                  label="Registration Date"
                  inputFormat="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  disableCloseOnSelect={false}
                  renderInput={(params) => (
                    <TextField required {...params} sx={{ width: '100%' }} />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </div>

          <div className="add-folio-input-3">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-number"
                label="Yield(%)"
                type="number"
                value={values.yield}
                onChange={handleChange('yield')}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ width: '100%' }}>
              <InputLabel required htmlFor="outlined-adornment-amount">
                Capital Commitment{' '}
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-amount"
                value={values.commitment}
                onChange={handleChange('commitment')}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Capital Commitment"
              />
            </FormControl>
          </div>

          <div className="add-folios-btn-div" style={{ width: '100%' }}>
            <Button
              id="add-folios-btn"
              type="submit"
              variant="contained"
              style={{
                color: 'white',
                textTransform: 'none',
                width: '16rem',
                backgroundColor: '#E95B3E'
              }}
            >
              Add Folio
            </Button>
          </div>
        </form>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default AddFolio;
