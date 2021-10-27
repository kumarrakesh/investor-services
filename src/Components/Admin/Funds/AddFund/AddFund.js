import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import AdNavbar from '../../Navbar/Navbar';
import './AddFund.css';

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
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

// const theme = createTheme({
//   palette: {
//     type: 'dark'
//   }
// });

const AddFund = () => {
  let history = useHistory();
  const [values, setValues] = React.useState({
    amount: ''
  });

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

  const [value, setValue] = React.useState(new Date());

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const BootstrapInput = styled(TextField)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,

      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      }
    }
  }));

  return (
    <div className="add-funds-main">
      <div>
        <AdNavbar />
      </div>

      <div id="add-funds-container">
        <h1 className="dtitle">Funds</h1>

        <div className="cross-btn">
          <h1 id="dtitle">Funds</h1>
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

        <div className="add-funds-div" id="add-funds-id1">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Fund Name
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" required />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={values.amount}
              onChange={handleChange('amount')}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="NAV"
              required
            />
          </FormControl>

          <div id="fund-st-date">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <small style={{ fontWeight: '300' }}>Start Date</small>
              <MobileDatePicker
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
                disableCloseOnSelect={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: '600px !important', marginTop: '0.5rem' }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className="add-funds-btn-div">
            <Button
              id="add-funds-btn"
              variant="outlined"
              className="download-btn"
              style={{ color: '#E95B3E', textTransform: 'none' }}
            >
              Add Fund
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFund;
