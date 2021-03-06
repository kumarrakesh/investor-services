import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Statements.css';
import Navbar from '../Navbar/Navbar';
import Swal from 'sweetalert2';
import {
  Button,
  Select,
  MenuItem,
  TextField,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import 'date-fns';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
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
    totalUnits: 0
  });
  const [loading, setLoading] = useState(true);
  //other hooks
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 3000
      });
      history.push('/');
    }

    fetch(`${process.env.REACT_APP_API}/api/user/fundnames`, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
        setUniqueFunds(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    getUserTransactions('');
  }, []);
  useEffect(() => {
    getUserTransactions(fundname);
    setSelectedStartDate(new Date());
    setSelectedEndDate(new Date());
  }, [fundname]);
  //functions and handlers
  const handleStartDateChange = (date) => {
    // console.log(date);
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const handleChangeFundname = (e) => {
    setFundname(e.target.value);
  };
  const getUserTransactions = async (fundname) => {
    setLoading(true);
    let modFundName = fundname === 'All' ? '' : fundname;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/transactions`,
        {
          headers: {
            'x-access-token': token,
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
      setLoading(false);
      // console.log('data.data', data);
    } catch (e) {
      // console.log(e);
    }
  };
  const handleDateFilter = async () => {
    Promise.all([getUserTransactions(fundname)]).then(() => {
      let modRows = [...rows];
      let modStartDate = new Date(selectedStartDate);
      modStartDate = modStartDate.setDate(modStartDate.getDate() - 1);
      let modEndDate = new Date(selectedEndDate);
      modEndDate = modEndDate.setDate(modEndDate.getDate() + 1);
      modRows = modRows.filter(
        (row) =>
          new Date(row.date) >= new Date(modStartDate) &&
          new Date(row.date) <= new Date(modEndDate)
      );
      setDisplayRows(modRows);
    });
  };
  return (
    <div className="statement-header-container">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="statement-container">
        <h1 className="stats">Account Statements</h1>

        <div className="statement-summary">
          <div className="statement-summary-col">
            <div className="statement-summary-name">Total Investment</div>
            <div className="statement-summary-val">
              {Math.round(summaryData?.totalInvested * 100 + Number.EPSILON) /
                100}
            </div>
          </div>
          <div className="statement-summary-col">
            <div className="statement-summary-name">Current Value</div>
            <div className="statement-summary-val">
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
              <MobileDatePicker
                label="Start Date"
                inputFormat="dd/MM/yyyy"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                disableCloseOnSelect={false}
                renderInput={(params) => <TextField {...params} />}
                maxDate={selectedEndDate}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="End Date"
                inputFormat="dd/MM/yyyy"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                disableCloseOnSelect={false}
                renderInput={(params) => <TextField {...params} />}
                minDate={selectedStartDate}
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </ThemeProvider>
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
          <MenuItem
            value={'All'}
            onClick={() => {
              getUserTransactions('');
            }}
          >
            All
          </MenuItem>
          {uniqueFunds.map((fund) => {
            return (
              <MenuItem value={fund.fundname} key={fund.fundname}>
                {fund.fundname}
              </MenuItem>
            );
          })}
        </Select>
        <CustomizedTables
          rows={displayRows}
          fundname={fundname}
          loading={loading}
        />
        {loading && (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={() => {}}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </div>
  );
};

export default Statements;
