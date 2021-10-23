import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Grievances.css';
import { UserContext } from '../../../userContext';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import TelegramIcon from '@mui/icons-material/Telegram';

import CustomizedTables from './table';
import Swal from 'sweetalert2';

const Grievances = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));

  const [subject, setSubject] = useState('TESTING');
  const [description, setDescription] = useState('TESTING');
  const [date, setDate] = useState('18 OCT 2021');
  const [data, setData] = useState('');

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
    Swal.fire('Great!', 'Query sent successfully!', 'success');
  };

  const [value, setValue] = useState('raise');
  const [rows, setRows] = useState([]);

  const handleRespone = async () => {
    setValue('response');
    const token = JSON.parse(localStorage.getItem('token'));

    const response = await fetch(
      'https://investorbackend.herokuapp.com/api/query',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        method: 'GET'
      }
    );

    const data = await response.json();
    console.log(data.data);
    setRows(data.data);
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
              style={{ backgroundColor: '#E95B3E', textTransform: 'none' }}
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
              style={{ backgroundColor: '#E95B3E', textTransform: 'none' }}
              id="apply-btn"
              onClick={handleRespone}
            >
              Query History
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
                  defaultValue=""
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
          {value === 'response' && <CustomizedTables rows={rows} />}
        </div>
      </div>
    </div>
  );
};

export default Grievances;
