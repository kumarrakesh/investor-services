import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Statements.css';
import Navbar from '../Navbar/Navbar';
import Swal from 'sweetalert2';
import { Button, Select, MenuItem, TextField } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import 'date-fns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CustomizedTables from './Table/table';
import { ThemeProvider } from '@mui/styles';

const theme = createTheme({
  palette: {
    type: 'dark'
  }
});

const Statements = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  //states
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [rows, setRows] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [fundname, setFundname] = useState('All');
  const [uniqueFunds, setUniqueFunds] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalInvested: 0,
    currentValue: 0,
    totalUnit: 0
  });
  //other hooks
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

    fetch('https://investorbackend.herokuapp.com/api/user/fundnames', {
      headers: {
        'x-access-token': token,
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
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const handleChangeFundname = (e) => {
    setFundname(e.target.value);
  };
  const getUserTransactions = async (fundname) => {
    let modFundName = fundname === 'All' ? '' : fundname;
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
            fundname: modFundName
          })
        }
      );
      const data = await response.json();
      setRows(data.data);
      setDisplayRows(data.data);
      setSummaryData(data.header);
      console.log('data.data', data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDateFilter = async () => {
    Promise.all([getUserTransactions(fundname)]).then(() => {
      console.log('rows', rows);
      let modRows = [...rows];
      console.log('before', modRows.length);
      modRows = modRows.filter(
        (row) =>
          new Date(row.date) >= new Date(selectedStartDate) &&
          new Date(row.date) <= new Date(selectedEndDate)
      );
      console.log('after', modRows.length);
      setDisplayRows(modRows);
    });
  };
  return (
    <div className="header-container">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="statement-container">
        <h1 className="stats">Account Statements</h1>

        <div className="statement-summary">
          <div className="statement-summary-col">
            <div className="statement-summary-name">Total Investment</div>
            <div className="statement-summary-val">
              ₦
              {Math.round(summaryData?.totalInvested * 100 + Number.EPSILON) /
                100}
            </div>
          </div>
          <div className="statement-summary-col">
            <div className="statement-summary-name">Current Value</div>
            <div className="statement-summary-val">
              ₦
              {Math.round(summaryData?.currentValue * 100 + Number.EPSILON) /
                100}
            </div>
          </div>
          <div className="statement-summary-col">
            <div className="statement-summary-name">Net Gain/Loss</div>
            <div
              className="statement-summary-val"
              style={{
                color:
                  summaryData?.currentValue - summaryData?.totalInvested >= 0
                    ? '#16D112'
                    : 'red'
              }}
            >
              ₦
              {Math.round(
                (summaryData?.currentValue - summaryData?.totalInvested) * 100 +
                  Number.EPSILON
              ) / 100}
            </div>
          </div>
          <div className="statement-summary-col">
            <div className="statement-summary-name">Total Units</div>
            <div className="statement-summary-val">
              {Math.round(summaryData?.totalUnits * 10000 + Number.EPSILON) /
                10000}
            </div>
          </div>
        </div>

        <div className="date-div">
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="dd/MM/yyyy"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </ThemeProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="End Date"
              inputFormat="dd/MM/yyyy"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button variant="contained" id="apply-btn" onClick={handleDateFilter}>
            Apply
          </Button>
        </div>
        <Select
          labelId="fund-name-select-label"
          id="fund-name-select"
          value={fundname}
          style={{ width: '200px', paddingLeft: 5, paddingRight: 5 }}
          onChange={handleChangeFundname}
          variant="outlined"
        >
          <MenuItem value={'All'}>All</MenuItem>
          {uniqueFunds.map((fund) => {
            return <MenuItem value={fund.fundname}>{fund.fundname}</MenuItem>;
          })}
        </Select>
        <CustomizedTables rows={displayRows} />
      </div>
    </div>
  );
};

export default Statements;
