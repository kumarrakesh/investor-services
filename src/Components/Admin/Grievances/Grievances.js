import React from 'react';
import Button from '@mui/material/Button';
import AdNavbar from '../Navbar/Navbar';
import './Grievances.css';
import CustomizedTables from './table';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const AdminGrievances = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="grievances-main">
      <div>
        <AdNavbar />
      </div>

      <div id="grievances-container">
        <h1 className="dtitle">Grievances</h1>
        <h1 className="overview">Overview</h1>

        <p className="total-investors">Total Queries</p>
        <p className="total-no">30</p>

        <div className="inv-btns">
          <div>
            <Button
              variant="contained"
              id="apply-btn"
              href="#contained-buttons"
              style={{ textTransform: 'none' }}
            >
              Record New Transaction +
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
            {'\n'} List
          </Button>
        </div>

        <div className="inv-table">
          <CustomizedTables />
        </div>
      </div>
    </div>
  );
};

export default AdminGrievances;
