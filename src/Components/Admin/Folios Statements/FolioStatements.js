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
  const [invPassport, setInvPassport] = useState('');
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
        `${process.env.REACT_APP_API}/api/get/folio/transaction`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({
            folioId: folioId
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
        `${process.env.REACT_APP_API}/api/get/folio`,
        {
          method: 'POST',
          body: JSON.stringify({
            folioId: folioId
          }),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.data) {
        setErrorName(true);
        setFolioName('');
        setDisplayRows([]);
      } else {
        setFolioName(data.data.folioName);
        setInvPassport(data.data.user.passport);
        setErrorName(false);
        getFolioStatement();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div className="folio-statements-main">
      <AdNavbar />

      <div id="folio-statements-container">
        <h1 className="folio-statements-heading">Folios Statements</h1>
        <h1 className="folio-statements-subheading">Overview</h1>

        <div className="folio-input-div">
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <TextField
              required
              label="Folio ID"
              value={folioId}
              onChange={(e) => {
                setFolioId(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  e.preventDefault();
                  handleSearchFolioName();
                  return;
                }
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
                Please enter correct Folio ID
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
          folioId={folioId}
          invPassport={invPassport}
        />
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
