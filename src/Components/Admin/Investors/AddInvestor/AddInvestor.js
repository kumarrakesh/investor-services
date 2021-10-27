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

const AddInvestor = () => {
  const history = useHistory();
  const [investorName, setInvestorName] = useState('');
  const [investorID, setInvestorID] = useState('');
  const [investorDate, setInvestorDate] = useState('');
  const [investorPassport, setInvestorPassport] = useState('');
  const [investorAddress1, setInvestorAddress1] = useState('');
  const [investorAddress2, setInvestorAddress2] = useState('');
  const [investorCity, setInvestorCity] = useState('');
  const [investorState, setInvestorState] = useState('');
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
      width: '400px',
      padding: '5px 12px',
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

  const handleAddInvestor = () => {};

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
        <div className="add-inv-all-inputs">
          <div className="investor-div" id="inv-id1">
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                Investor Name *
              </InputLabel>
              <BootstrapInput
                id="investorName"
                value={investorName}
                onChange={(e) => {
                  setInvestorName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                Investor ID *
              </InputLabel>
              <BootstrapInput
                // id="bootstrap-input"
                value={investorID}
                onChange={(e) => {
                  setInvestorID(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div className="investor-div" id="inv-id2">
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                Date *
              </InputLabel>

              <BootstrapInput
                id="bootstrap-input"
                name="investorDate"
                value={investorDate}
                onChange={(e) => {
                  setInvestorDate(e.target.value);
                }}
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                Passport Number *
              </InputLabel>
              <BootstrapInput
                id="bootstrap-input"
                name="passportNumber"
                value={investorPassport}
                onChange={(e) => {
                  setInvestorPassport(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div className="investor-div" id="inv-id3" required>
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                Address Line 1
              </InputLabel>
              <BootstrapInput1
                id="bootstrap-input"
                required
                name="address1"
                value={investorAddress1}
                onChange={(e) => {
                  setInvestorAddress1(e.target.value);
                }}
              />
            </FormControl>

            <FormControl variant="standard" style={{ marginTop: 20 }}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Address Line 2
              </InputLabel>
              <BootstrapInput1
                id="bootstrap-input"
                name="address2"
                value={investorAddress2}
                onChange={(e) => {
                  setInvestorAddress2(e.target.value);
                }}
              />
            </FormControl>
          </div>

          <div className="investor-div" id="inv-id4">
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                City
              </InputLabel>
              <BootstrapInput
                id="bootstrap-input"
                name="city"
                value={investorCity}
                onChange={(e) => {
                  setInvestorCity(e.target.value);
                }}
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                State
              </InputLabel>
              <BootstrapInput
                id="bootstrap-input"
                name="state"
                value={investorState}
                onChange={(e) => {
                  setInvestorState(e.target.value);
                }}
              />
            </FormControl>
          </div>
        </div>
        <div className="investor-div" id="add-inv-btn">
          <Button
            variant="outlined"
            className="download-btn"
            style={{ color: '#E95B3E', textTransform: 'none' }}
            onClick={handleAddInvestor}
          >
            Add Investor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddInvestor;
