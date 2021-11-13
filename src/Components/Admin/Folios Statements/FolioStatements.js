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
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@mui/material/IconButton';
import { tokenToString } from 'typescript';

const FolioStatements = () => {
  // states
  const token = JSON.parse(localStorage.getItem('token'));
  const [rows, setRows] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [loading, setLoading] = useState(false);
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
            'x-access-token': token
          },
          body: JSON.stringify({
            folioId: '618a4a03537eb2a3707aaf45'
          })
        }
      );

      const data = await response.json();
      console.log(data);
      setDisplayRows(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleSearchFolioName = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://investorbackend.herokuapp.com/api/get/folio',
        {
          method: 'POST',
          body: JSON.stringify({
            folioId: '618a4a03537eb2a3707aaf45'
          }),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.status) {
        setErrorName(true);
        setFolioName('');
      } else {
        setFolioName(data.data.folioName);
        setErrorName(false);
        getFolioStatement();
      }
    } catch (e) {
      console.log(e);
    }
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
              label="Folio ID"
              value={folioId}
              onChange={(e) => {
                setFolioId(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      style={{ color: 'red' }}
                      size="large"
                      onClick={handleSearchFolioName}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
