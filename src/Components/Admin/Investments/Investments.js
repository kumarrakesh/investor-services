import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AdNavbar from '../Navbar/Navbar';
import './Investments.css';
import CustomizedTables from './table';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';
import { TextField, Backdrop, CircularProgress } from '@mui/material';
import 'date-fns';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Investments = () => {
  // states
  const [rows, setRows] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  //hooks

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
    } else {
      getInvestments();
    }
  }, []);
  //handlers and functions
  const getInvestments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://investorbackend.herokuapp.com/api/transactions/all',
        {
          method: 'POST',
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem('token'))
          }
        }
      );
      const data = await response.json();
      console.log(data);
      setRows(data.data);
      setDisplayRows(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleLoadingDone = () => {
    setLoading(false);
  };

  const handleApplyDateFilter = () => {
    setLoading(true);
    const filteredRows = rows.filter((row) => {
      let modStartDate = new Date(selectedStartDate);
      modStartDate = modStartDate.setDate(modStartDate.getDate() - 1);
      return (
        new Date(row.date) >= modStartDate &&
        new Date(row.date) <= new Date(selectedEndDate)
      );
    });
    setDisplayRows(filteredRows);
    setLoading(false);
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
        <p className="investments-total-no">{rows.length}</p>
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
              className="padding-for-inputs"
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="To Date"
              inputFormat="dd/MM/yyyy"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              disableCloseOnSelect={false}
              className="padding-for-inputs"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            id="investors-apply-btn"
            onClick={handleApplyDateFilter}
          >
            Apply
          </Button>
        </div>

        <CustomizedTables
          rows={rows}
          setRows={setRows}
          setDisplayRows={setDisplayRows}
          displayRows={displayRows}
          loading={loading}
        />
        <Button
          variant="contained"
          onClick={handleAddTranscation}
          style={{
            textTransform: 'none',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            padding: '1rem'
          }}
        >
          Record New Transaction
        </Button>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Investments;
