import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import AdNavbar from '../Navbar/Navbar';
import './Investments.css';
import CustomizedTables from './table';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';
import { TextField } from '@mui/material';
import 'date-fns';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Investments = () => {
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const history = useHistory();
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

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  // const handleDateFilter = async () => {
  //   Promise.all([getUserTransactions(fundname)]).then(() => {
  //     console.log('rows', rows);
  //     let modRows = [...rows];
  //     console.log('before', modRows.length);
  //     modRows = modRows.filter(
  //       (row) =>
  //         new Date(row.date) >= new Date(selectedStartDate) &&
  //         new Date(row.date) <= new Date(selectedEndDate)
  //     );
  //     console.log('after', modRows.length);
  //     setDisplayRows(modRows);
  //   });
  // };

  const handleAddTranscation = () => {
    history.push('/admin/investments/add');
  };

  return (
    <div className="investments-main">
      <AdNavbar />

      <div id="investments-container">
        <h1 className="investments-heading">Investments</h1>
        <h1 className="investments-subheading">Overview</h1>
        <p className="investments-total-investors">Total Investments</p>
        <p className="investments-total-no">50</p>
        <div className="investments-inv-btns">
          <div>Filter by date:</div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="From Date"
              variant="outlined"
              inputFormat="dd/MM/yyyy"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              disableCloseOnSelect={false}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="To Date"
              inputFormat="dd/MM/yyyy"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              disableCloseOnSelect={false}
              style={{ padding: '10px 20px !important' }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            id="investors-apply-btn"
            style={{ padding: '10px 20px !important' }}
          >
            Apply
          </Button>
        </div>

        {/* <div className="inv-table"> */}
        <CustomizedTables style={{ marginTop: '-10px !important' }} />
        {/* </div> */}
        <Button
          variant="contained"
          onClick={handleAddTranscation}
          style={{ textTransform: 'none' }}
        >
          Record New Transaction +
        </Button>
      </div>
    </div>
  );
};

export default Investments;
