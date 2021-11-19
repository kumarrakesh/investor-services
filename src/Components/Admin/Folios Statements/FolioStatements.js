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
  const [values, setValues] = React.useState({
    folioName: '',
    investorName: '',
    investorPassport: '',
    commitment: '',
    yield: '',
    registrationDate: new Date(),
    folioId: ''
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
    if (
      localStorage.getItem('folioId') &&
      localStorage.getItem('folioId') != ''
    ) {
      console.log(localStorage.getItem('folioId'));
      setFolioId(localStorage.getItem('folioId'));
      handleSearchFolioName(localStorage.getItem('folioId'));
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
            folioId: folioId || localStorage.getItem('folioId')
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

  const handleSearchFolioName = async (folioId) => {
    console.log('insice', folioId);
    localStorage.setItem('folioId', folioId);
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
        setValues({
          investorName: data.data.user.name,
          investorPassport: data.data.user.passport,
          commitment: data.data.commitment,
          yield: data.data.yield,
          registrationDate: data.data.date
        });
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
        {/* <h1 className="folio-statements-subheading">Overview</h1> */}

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
                  handleSearchFolioName(folioId);
                  return;
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      style={{ color: 'red' }}
                      size="large"
                      onClick={() => {
                        handleSearchFolioName(folioId);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {errorName && (
              <small style={{ color: 'red' }}>Folio with ID not found!</small>
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

        <div className="folio-add-transaction">
          <div
            className="folio-add-transaction-row"
            style={{ borderBottom: ' 1px solid #E5E5E5' }}
          >
            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Folio Name
              </div>
              <div className="folio-add-transaction-row-item-value">
                {folioName}
              </div>
            </div>

            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Investor Name
              </div>
              <div
                className="folio-add-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {values.investorName}
              </div>
            </div>

            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Passport Number
              </div>
              <div
                className="folio-add-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {values.investorPassport}
              </div>
            </div>
          </div>

          <div
            className="folio-add-transaction-row"
            style={{ borderBottom: ' 1px solid #E5E5E5' }}
          >
            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Registration Date
              </div>
              <div className="folio-add-transaction-row-item-value">
                {new Date(values.registrationDate).toLocaleDateString('en-GB')}
              </div>
            </div>

            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                commitment
              </div>
              <div
                className="folio-add-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {values.commitment}
              </div>
            </div>

            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Yield(%)
              </div>
              <div
                className="folio-add-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {values.yield}
              </div>
            </div>
          </div>
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
