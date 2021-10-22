import React, { useState, useEffect } from 'react';
import './Statements.css';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import CustomizedTables from './Table/table';
import DropDown from './DropDown';

const Statements = () => {
  //states
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [rows, setRows] = useState([]);
  const [fundname, setFundname] = useState('');
  const [uniqueFunds, setUniqueFunds] = useState([]);
  //other hooks
  useEffect(() => {
    fetch('https://investorbackend.herokuapp.com/api/user/fundnames', {
      headers: {
        'x-access-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNmQzOThmMWEwZDkzYTgxZTZlZTA2YSIsInVzZXJuYW1lIjoidXNlckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiR4NnUxSlN2dHpZTEN1M28yUkxFT25lRFdMN0FFMUJZdERKQ1l6YmZJUVZyOE1jeGNmeUVweSIsIm5hbWUiOiJ1c2VyIiwicHJvZmlsZVBpYyI6ImU5ZjllM2UxLWNiYmItNDFhMi04MTYzLWJiMjdlYTMzNzQ2Zi5wbmciLCJwYXNzcG9ydCI6InVzZXIiLCJtYXR1cml0eSI6IjIwMDUtMDktMTlUMTg6MzA6MDAuMDAwWiIsImFkZHJlc3MiOiJoZWxsbyIsImNpdHkiOiJndXJnYW9uIiwic3RhdGUiOiJEZWxoaSIsImNvdW50cnkiOiJpbmRpYSIsInBpbmNvZGUiOiIxMjIwMDIiLCJyb2xlIjoiNjE2ZDJmNTg4ZDkwODY0OGMyOGQ2M2ExIiwiYW1vdW50SW52ZXN0ZWQiOjAsImN1cnJlbnRJbnZlc3RlZFZhbHVlIjowLCJfX3YiOjB9LCJpYXQiOjE2MzQ1NTY2MjgsImV4cCI6MTYzNzE0ODYyOH0.bahD4jni57l8AEE3xPyrZfVwCaDEXqg3AwtuuDcjWmE',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setUniqueFunds(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    getUserTransactions('');
  }, []);
  useEffect(() => {
    getUserTransactions(fundname);
  }, [fundname]);
  //functions and handlers
  const getUserTransactions = async (fundname) => {
    try {
      const response = await fetch(
        'https://investorbackend.herokuapp.com/api/transactions',
        {
          headers: {
            'x-access-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNmQzOThmMWEwZDkzYTgxZTZlZTA2YSIsInVzZXJuYW1lIjoidXNlckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiR4NnUxSlN2dHpZTEN1M28yUkxFT25lRFdMN0FFMUJZdERKQ1l6YmZJUVZyOE1jeGNmeUVweSIsIm5hbWUiOiJ1c2VyIiwicHJvZmlsZVBpYyI6ImU5ZjllM2UxLWNiYmItNDFhMi04MTYzLWJiMjdlYTMzNzQ2Zi5wbmciLCJwYXNzcG9ydCI6InVzZXIiLCJtYXR1cml0eSI6IjIwMDUtMDktMTlUMTg6MzA6MDAuMDAwWiIsImFkZHJlc3MiOiJoZWxsbyIsImNpdHkiOiJndXJnYW9uIiwic3RhdGUiOiJEZWxoaSIsImNvdW50cnkiOiJpbmRpYSIsInBpbmNvZGUiOiIxMjIwMDIiLCJyb2xlIjoiNjE2ZDJmNTg4ZDkwODY0OGMyOGQ2M2ExIiwiYW1vdW50SW52ZXN0ZWQiOjAsImN1cnJlbnRJbnZlc3RlZFZhbHVlIjowLCJfX3YiOjB9LCJpYXQiOjE2MzQ1NTY2MjgsImV4cCI6MTYzNzE0ODYyOH0.bahD4jni57l8AEE3xPyrZfVwCaDEXqg3AwtuuDcjWmE',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            fundname: fundname
          })
        }
      );
      const data = await response.json();
      console.log(data.data);
      setRows(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="header-container">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="statement-container">
        <h1 className="stats">Account Statements</h1>

        <div className="switches">
          <DropDown options={uniqueFunds} setFundname={setFundname} />
        </div>

        <div className="amount">
          <div className="inv-amt">Investment</div>
          <div className="total-gain">Total Gain</div>
          <div className="net-gain">Net Gain</div>
        </div>

        <div className="values">
          <div className="inv-val">₦ 13947123</div>
          <div className="total-gain-val">₦ 13947123</div>
          <div className="net-gain-val">₦ 13947123</div>
        </div>

        <div className="date-div">
          <div className="date-val">
            <div className="st-date-val" style={{ marginLeft: '10px' }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                  <KeyboardDatePicker
                    margin="normal"
                    name="dob"
                    id="date-picker-dialog"
                    label="Start Date"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>

            <div className="end-date-val" style={{ marginLeft: '10px' }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                  <KeyboardDatePicker
                    margin="normal"
                    name="dob"
                    id="date-picker-dialog"
                    label="End Date"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="date-btns">
            <div>
              <Button
                variant="contained"
                id="apply-btn"
                href="#contained-buttons"
                style={{ textTransform: 'none' }}
              >
                Apply
              </Button>
            </div>

            <Button
              variant="outlined"
              className="download-btn"
              style={{ color: '#E95B3E', textTransform: 'none' }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 16.25V20.5H3.49996V16.25H0.666626V20.5C0.666626 22.0583 1.94163 23.3333 3.49996 23.3333H20.5C22.0583 23.3333 23.3333 22.0583 23.3333 20.5V16.25H20.5ZM19.0833 10.5833L17.0858 8.58582L13.4166 12.2408V0.666656H10.5833V12.2408L6.91412 8.58582L4.91663 10.5833L12 17.6667L19.0833 10.5833Z"
                  fill="#E95B3E"
                />
              </svg>
              Download
              {'\n'} Report
            </Button>
          </div>
        </div>

        <div className="stat-table">
          <CustomizedTables rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default Statements;
