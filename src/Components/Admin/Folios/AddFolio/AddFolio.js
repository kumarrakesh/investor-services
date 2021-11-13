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

const AddFolio = () => {
  let history = useHistory();
  const [values, setValues] = React.useState({
    folioId: '',
    investorId: '',
    commitment: '',
    yield: '',
    folioName: '',
    investorName: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorName, setErrorName] = useState(false);

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
        'https://investorbackend.herokuapp.com/api/add/folio',
        {
          method: 'POST',
          body: JSON.stringify({
            userId: values.investorId,
            commitment: values.commitment,
            yield: values.yield,
            date: selectedDate,
            folioName: values.folioName
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
        'https://investorbackend.herokuapp.com/api/user/name/get',
        {
          method: 'POST',
          body: JSON.stringify({
            passport: values.investorId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setErrorName(true);
        setValues({ ...values, investorName: '' });
      } else {
        setValues({ ...values, investorName: data.name });
        setErrorName(false);
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

        <h1 id="add-folio-subtitle">Add Folio</h1>

        <form action="" onSubmit={submitForm} className="add-folios-div">
          <div className="add-folio-input-1">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                value={values.folioName}
                onChange={handleChange('folioName')}
                label="Folio Name"
              />
            </FormControl>

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
          </div>

          <div className="add-folio-input-2">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                label="Investor Passport No."
                value={values.investorId}
                onChange={handleChange('investorId')}
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
              {errorName && (
                <small style={{ color: 'red' }}>
                  Please enter correct Passport No.
                </small>
              )}
            </FormControl>

            {/* <PageviewIcon /> */}

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                required
                disabled
                id="outlined-required"
                value={values.investorName}
                onChange={handleChange('investorName')}
                label="Investor Name"
              />
            </FormControl>
          </div>

          <div className="add-folio-input-3">
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
          </div>

          <div className="add-folio-input-4"></div>

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
