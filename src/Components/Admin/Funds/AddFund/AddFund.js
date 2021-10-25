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

const AddFund = () => {
  let history = useHistory();

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
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Fund ID
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>
        </div>

        <div className="add-funds-div" id="add-funds-id2">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Date
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              NAV
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>
        </div>

        <div className="add-funds-div" id="add-funds-btn">
          <Button
            variant="outlined"
            className="download-btn"
            style={{ color: '#E95B3E', textTransform: 'none' }}
          >
            Add Fund
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFund;
