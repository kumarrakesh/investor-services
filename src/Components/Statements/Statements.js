import React, { useState, useEffect } from 'react'
import './Statements.css';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DatePicker from 'react-datepicker/dist/react-datepicker';



const Statements = () => {

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  
  const handleDateChange = (date) =>
  {
    setSelectedDate(date);
  };

  return (
    <div className = "header-container">
      {/* <div className = "nav">
        <Navbar />
      </div> */}

      <div className = "statement-container">
      <h1 className = "stats">Account Statements</h1>

      <div className = "switches">
      <Button variant="text" className = "overall" style={{ color: "#E95B3E" }}>Overall</Button>
      <Button variant="text" className = "inv-1"style={{ color: "#E95B3E" }}>Investment1</Button>
      <Button variant="text" className = "inv-2" style={{ color: "#E95B3E" }}>Investment2</Button>
      <Button variant="text" className = "inv-3"style={{ color: "#E95B3E" }}>Investment3</Button>
      <Button variant="text" className = "inv-4" style={{ color: "#E95B3E" }}>Investment4</Button>
      
      </div>

      <div className = "amount">
        <div className = "inv-amt">Investment</div>
        <div className = "total-gain">Total Gain</div>
        <div className = "net-gain">Net Gain</div>

      </div>

      <div className = "values">
        <div className = "inv-val">₦ 13947123</div>
        <div className = "total-gain-val">₦ 13947123</div>
        <div className = "net-gain-val">₦ 13947123</div>
      </div>
{/* 
      <div className = "dates">
        <div className = "st-date">Start Date</div>
        <div className ="end-date">End date</div>
      </div> */}

      <div className ="date-val">

        <div className="st-date-val" style={{marginLeft:"10px"}}>
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
          'aria-label': 'change date',
        }}
        />
          </Grid>
          </MuiPickersUtilsProvider>
        </div>

        <div className="end-date-val" style={{marginLeft:"10px"}}>
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
          'aria-label': 'change date',
        }}
        />
          </Grid>
          </MuiPickersUtilsProvider>
        </div>
    </div>

      

      </div>


    </div>
  );
};

export default Statements;
