import React, { useState, useEffect } from 'react';
import './Grievances.css';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import TelegramIcon from '@mui/icons-material/Telegram';

const Grievances = () => {
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
      width: 'auto',
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

  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="header-container">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="grievances-container">
        <h1 id="grievances-header">Investors and Funds</h1>
        <h1 className="query-header">Query Generate</h1>

        <div className="btns-div">
          <div>
            <Button
              variant="contained"
              id="apply-btn"
              href="#contained-buttons"
            >
              Raise Query
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              id="apply-btn"
              href="#contained-buttons"
            >
              Query Response
            </Button>
          </div>
        </div>

        <div className="query-subject">
          <TextField fullWidth label="Query Subject" required id="fullWidth" />
        </div>

        <div className="query-box">
          <TextField
            id="outlined-multiline-static"
            label="Query"
            fullWidth
            multiline
            rows={11}
            defaultValue="Write your query..."
          />
        </div>

        <div className="send-btn-div">
          <Button
            variant="outlined"
            className="send-btn"
            style={{ color: '#E95B3E', textTransform: 'none' }}
          >
            <div>
              <TelegramIcon />
            </div>
            <div>Send Query</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Grievances;
