import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import AdNavbar from '../../Navbar/Navbar';
import './AddTransaction.css';
import Swal from 'sweetalert2';

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const AddTransaction = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 3000
      });
      history.replace('/');
    }
  });

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '400px',
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

  const BootstrapInput1 = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '1100px',
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
    <div className="add-transaction-main">
      <div>
        <AdNavbar />
      </div>

      <div id="add-transaction-container">
        <h1 className="dtitle">Investments</h1>
        <h1 id="overview">Record New Transaction</h1>

        <div className="investor-div" id="transcation-id1">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Investor Name
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Fund Name
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>
        </div>

        <div className="investor-div" id="transcation-id2">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Date of Transaction
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Action
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>
        </div>

        <div className="investor-div" id="transcation-id3">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              NAV
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Number of Units
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>
        </div>

        <div className="investor-div" id="transcation-id4" required>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Total Value
            </InputLabel>
            <BootstrapInput1 defaultValue="" id="bootstrap-input" required />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Remarks
            </InputLabel>
            <BootstrapInput1 defaultValue="" id="bootstrap-input" required />
          </FormControl>
        </div>

        <div className="investor-div" id="add-transaction-btn">
          <Button
            variant="outlined"
            className="download-btn"
            style={{ color: '#E95B3E', textTransform: 'none', width: '300px' }}
          >
            Record New Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
