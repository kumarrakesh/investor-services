import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { Backdrop, CircularProgress } from '@mui/material';
import AdNavbar from '../../Navbar/Navbar';
import './AddFund.css';

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

const AddFund = () => {
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
    } else alert('Error while updating');

    history.push('/admin/funds');
  };

  const handleLoadingDone = () => {
    // setLoading(false);
  };

  return (
    <div className="add-funds-main">
      <div>
        <AdNavbar />
      </div>

      <div id="add-funds-container">
        <div className="cross-btn">
          <h1 className="add-fund-title">Funds</h1>
          <IconButton
            size="large"
            style={{ color: '#E95B3E' }}
            onClick={() => {
              history.push('/admin/funds');
            }}
          >
            <CancelIcon fontSize="inherit" />
          </IconButton>
        </div>

        <h1 id="overview">Add Fund</h1>

        <form
          action=""
          onSubmit={submitForm}
          className="add-funds-div"
          id="add-funds-id1"
        >
          <TextField
            required
            id="outlined-required"
            value={values.fname}
            onChange={handleChange('fname')}
            label="Fund Name"
          />

          <FormControl>
            <InputLabel htmlFor="outlined-adornment-amount">NAV *</InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-amount"
              value={values.amount}
              onChange={handleChange('amount')}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>

          <div id="fund-st-date">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                disableCloseOnSelect={false}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    sx={{ width: '600px !important', marginTop: '0.3rem' }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className="add-funds-btn-div">
            <Button
              id="add-funds-btn"
              type="submit"
              variant="outlined"
              className="download-btn"
              style={{ color: '#E95B3E', textTransform: 'none' }}
            >
              Add Fund
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

export default AddFund;
