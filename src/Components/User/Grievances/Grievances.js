import React, { useState, useContext, useEffect } from 'react';
import './Grievances.css';
import { UserContext } from '../../../userContext';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import TelegramIcon from '@mui/icons-material/Telegram';

import CustomizedTables from './table';

const Grievances = () => {
  const { userData } = useContext(UserContext);
  const token = userData.token;

  const [subject, setSubject] = useState('TESTING');
  const [description, setDescription] = useState('TESTING');
  const [date, setDate] = useState('18 OCT 2021');
  const [data, setData] = useState('');

  const handleSendQuery = async () => {
    let response = await fetch(
      'https://investorbackend.herokuapp.com/api/add/query',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        method: 'POST',
        body: JSON.stringify({ subject, description, date })
      }
    );
    setData(await response.json());
  };

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

  const [value, setValue] = useState('raise');

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
              onClick={() => {
                setValue('raise');
              }}
            >
              Raise Query
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              id="apply-btn"
              onClick={() => {
                setValue('response');
              }}
            >
              Query Response
            </Button>
          </div>
        </div>

        <div>
          {value === 'raise' && (
            <div className="query-container">
              <div className="query-subject">
                <TextField
                  fullWidth
                  label="Query Subject"
                  name="subject"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  required
                  id="fullWidth"
                />
              </div>

              <div className="query-box">
                <TextField
                  id="outlined-multiline-static"
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
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
                  onClick={handleSendQuery}
                  style={{ color: '#E95B3E', textTransform: 'none' }}
                >
                  <div>
                    <TelegramIcon />
                  </div>
                  <div>Send Query</div>
                </Button>
              </div>
            </div>
          )}
          {value === 'response' && <CustomizedTables data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Grievances;
