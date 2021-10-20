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
  const [selectedDate, setSelectedDate] = React.useState(new Date());

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
          <DropDown />
        </div>
        {/* 
      <div className = "switches">
      <Button variant="text" className = "overall" style={{ color: "#E95B3E" }}>Overall</Button>
      <Button variant="text" className = "inv-1"style={{ color: "#E95B3E" }}>Investment 1</Button>
      <Button variant="text" className = "inv-2" style={{ color: "#E95B3E" }}>Investment 2</Button>
      <Button variant="text" className = "inv-3"style={{ color: "#E95B3E" }}>Investment 3</Button>
      <Button variant="text" className = "inv-4" style={{ color: "#E95B3E" }}>Investment 4</Button>
      
      </div> */}

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
          <CustomizedTables />
        </div>
      </div>
    </div>
  );
};

export default Statements;
