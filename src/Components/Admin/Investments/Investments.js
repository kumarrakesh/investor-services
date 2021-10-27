import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import AdNavbar from '../Navbar/Navbar';
import './Investments.css';
import CustomizedTables from './table';
import Swal from 'sweetalert2';
import { Button, TextField } from '@mui/material';
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
      <div>
        <AdNavbar />
      </div>

      <div id="investments-container">
        <h1 className="dtitle">Investments</h1>
        <h1 className="overview">Overview</h1>

        <p className="total-investors">Total Investments</p>
        <p className="total-no">50</p>

        <div className="inv-btns">
          <div>
            <Button
              variant="contained"
              onClick={handleAddTranscation}
              style={{ textTransform: 'none' }}
            >
              Record New Transaction +
            </Button>
          </div>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Start Date"
              inputFormat="dd/MM/yyyy"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              disableCloseOnSelect={false}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Start Date"
              inputFormat="dd/MM/yyyy"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              disableCloseOnSelect={false}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Button variant="contained" id="apply-btn">
            Apply
          </Button>
        </div>

        <div className="inv-table">
          <CustomizedTables />
        </div>
      </div>
    </div>
  );
};

export default Investments;
