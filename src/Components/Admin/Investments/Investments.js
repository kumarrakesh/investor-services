import React from 'react';
import Button from '@mui/material/Button';
import AdNavbar from '../Navbar/Navbar';
import './Investments.css';
import CustomizedTables from './table';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const Investments = ()=>{

    const [selectedDate, setSelectedDate] = React.useState(new Date());

  
    const handleDateChange = (date) =>
    {
      setSelectedDate(date);
    };
    

    return(
        <div className="investors-main">
            
            <div><AdNavbar/></div>
            
            <div id= "investors-container">
                <h1 className="dtitle">Investments</h1>
                <h1 className = "overview">Overview</h1>    

                <p className = "total-investors">Total Investments</p> 
                <p className = "total-no">50</p> 

                <div className="inv-btns">
                <div><Button variant="contained" id = "apply-btn" href="#contained-buttons" style={{textTransform :"none"}}>
                    Record New Transaction +</Button></div>

                   

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

                        <div className="end-date-val"  style={{marginLeft:"10px"}}>
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
                    

                    <Button variant="outlined" className = "download-btn" style={{ color: "#E95B3E" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5 16.25V20.5H3.49996V16.25H0.666626V20.5C0.666626 22.0583 1.94163 23.3333 3.49996 23.3333H20.5C22.0583 23.3333 23.3333 22.0583 23.3333 20.5V16.25H20.5ZM19.0833 10.5833L17.0858 8.58582L13.4166 12.2408V0.666656H10.5833V12.2408L6.91412 8.58582L4.91663 10.5833L12 17.6667L19.0833 10.5833Z" fill="#E95B3E"/>
                    </svg>
                    Download 
                    {"\n"} List
                    </Button>
                </div>

                <div className = "inv-table"><CustomizedTables/></div>
                    
            </div>
            
            

        </div>

    )

}

export default Investments;