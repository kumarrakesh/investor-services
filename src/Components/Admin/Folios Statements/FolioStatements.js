import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AdNavbar from '../Navbar/Navbar';
import './FolioStatements.css';
import CustomizedTables from './table';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';
import { TextField, Backdrop, CircularProgress } from '@mui/material';
import 'date-fns';
import FormControl from '@mui/material/FormControl';

const FolioStatements = () => {
  // states
  const [rows, setRows] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [folioId, setFolioId] = useState('');
  const [folioName, setFolioName] = useState('');
  const [errorName, setErrorName] = useState(false);

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
  //handlers and functions
  const getFolioStatement = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://investorbackend.herokuapp.com/api/get/folio/transaction',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxN2JlYzNhYTFjYjc1ODEyNGRmOTc0MSIsInVzZXJuYW1lIjoidGFydW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkOU5XTzllYVphdjRKcG1qRVozVDdFLld3cnBaL3VwQUFXVDllRkR2akJNZzNjUkhSN3NMTWUiLCJ1c2VySWQiOiI0IiwibmFtZSI6IlRhcnVuIiwicHJvZmlsZVBpYyI6IjdjZDNjOWY3LTBhN2QtNDg5NC1hYmFlLWIzM2UwOTczM2E2OS5KUEciLCJwYXNzcG9ydCI6InRhcnVuQGdtYWlsLmNvbSIsIm1hdHVyaXR5IjoiMjAyMS0xMC0yOVQxMjozODoxNC4wNjNaIiwiY2l0eSI6Imd1cnVncmFtIiwic3RhdGUiOiJIYXJ5YW5hIiwiY291bnRyeSI6IkluZGlhIiwicGluY29kZSI6IjEyMjAwMiIsInJvbGUiOiI2MTZkMmY1ODhkOTA4NjQ4YzI4ZDYzYTEiLCJhbW91bnRJbnZlc3RlZCI6MCwiY3VycmVudEludmVzdGVkVmFsdWUiOjAsIl9fdiI6MH0sImlhdCI6MTYzNjQ0NDQ1MCwiZXhwIjoxNjM5MDM2NDUwfQ.H1yj4n_-uO8kYR7dhVgUhmp0IXD-IJ-6Dd03K-_rsH4'
          },
          body: JSON.stringify({
            folioId: '618a4a03537eb2a3707aaf45'
          })
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

  const handleApplyDateFilter = () => {
    setLoading(true);
    const filteredRows = rows.filter((row) => {
      let modStartDate = new Date(selectedStartDate);
      modStartDate = modStartDate.setDate(modStartDate.getDate() - 1);
      let modEndDate = new Date(selectedEndDate);
      modEndDate = modEndDate.setDate(modEndDate.getDate() + 1);
      return (
        new Date(row.date) >= modStartDate &&
        new Date(row.date) <= new Date(modEndDate)
      );
    });
    setDisplayRows(filteredRows);
    setLoading(false);
  };

  const handleAddTranscation = () => {
    history.push('/admin/folioStatements/add');
  };

  return (
    <div className="investments-main">
      <AdNavbar />

      <div id="investments-container">
        <h1 className="investments-heading">Folios Statements</h1>
        <h1 className="investments-subheading">Overview</h1>

        <div className="folio-input-div">
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <TextField
              required
              id="outlined-required"
              value={folioId}
              onChange={(e) => {
                setFolioId(e.target.value);
              }}
              label="Folio ID"
            />
            {errorName && (
              <small style={{ color: 'red' }}>
                Please enter correct Passport No.
              </small>
            )}
          </FormControl>

          <FormControl variant="standard" sx={{ width: '100%' }}>
            <TextField
              required
              disabled
              id="outlined-required"
              value={folioName}
              onChange={(e) => {
                setFolioName(e.target.value);
              }}
              label="Folio Name"
            />
          </FormControl>
        </div>

        <CustomizedTables
          rows={rows}
          setRows={setRows}
          setDisplayRows={setDisplayRows}
          displayRows={displayRows}
          loading={loading}
          setLoading={setLoading}
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

export default FolioStatements;