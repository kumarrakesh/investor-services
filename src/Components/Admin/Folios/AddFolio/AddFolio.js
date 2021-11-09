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

const AddFolio = () => {
  let history = useHistory();
  const [values, setValues] = React.useState({ amount: '', fname: '' });

  const [loading, setLoading] = useState(false);

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
    const response = await fetch(
      'https://investorbackend.herokuapp.com/api/add/fund',
      {
        method: 'POST',
        body: JSON.stringify({
          fundname: values.fname,
          nav: values.amount,
          date: selectedDate
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
      Swal.fire('Fund added successfully!', '', 'success');
    } else Swal.fire('Something went wrong!', data?.error, 'error');

    history.push('/admin/folios');
  };

  const handleLoadingDone = () => {
    // setLoading(false);
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

        <h1 id="add-folio-subtitle">Add Folio</h1>

        <form action="" onSubmit={submitForm} className="add-folios-div">
          <div className="add-folio-input-1">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                id="outlined-required"
                value={values.fname}
                onChange={handleChange('fname')}
                label="Folio Name"
              />
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.fname}
                onChange={handleChange('fname')}
                label="Folio ID"
              />
            </FormControl>
          </div>

          <div className="add-folio-input-2">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.fname}
                onChange={handleChange('fname')}
                label="Investor Name"
              />
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.fname}
                onChange={handleChange('fname')}
                label="Investor ID"
              />
            </FormControl>
          </div>

          <div className="add-folio-input-3">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Registration Date"
                  inputFormat="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  disableCloseOnSelect={false}
                  renderInput={(params) => (
                    <TextField required {...params} sx={{ width: '100%' }} />
                  )}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-number"
                label="Yield(%)"
                type="number"
                value={values.investorZipCode}
                onChange={handleChange('investorZipCode')}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
          </div>

          <div className="add-folio-input-4">
            <FormControl fullWidth sx={{ width: '100%' }}>
              <InputLabel required htmlFor="outlined-adornment-amount">
                Capital Commitment{' '}
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Capital Commitment"
              />
            </FormControl>

            <FormControl fullWidth sx={{ width: '100%' }}>
              <InputLabel required htmlFor="outlined-adornment-amount">
                Capital Contribution
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Capital Contribution"
              />
            </FormControl>
          </div>

          <div className="add-folios-btn-div">
            <Button
              id="add-folios-btn"
              type="submit"
              variant="outlined"
              style={{
                color: '#E95B3E',
                textTransform: 'none',
                width: '16rem'
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
