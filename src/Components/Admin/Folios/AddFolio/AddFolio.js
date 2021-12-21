import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { Backdrop, CircularProgress, Autocomplete } from '@mui/material';
import AdNavbar from '../../Navbar/Navbar';
import './AddFolio.css';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  LocalizationProvider,
  MobileDatePicker,
  DesktopDatePicker
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import useWindowSize from '../../../../utils/useWindowSize';
import { Select, MenuItem } from '@mui/material';
const AddFolio = () => {
  const size = useWindowSize();
  let history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  const [values, setValues] = React.useState({
    folioId: '',
    commitment: '',
    yield: '',
    folioNo: '',
    investorName: 'Name',
    address: 'address',
    city: 'city',
    state: 'state',
    country: 'country',
    pincode: 'PIN',
    userPassport: 'passport',
    currency: 'USD'
  });

  const [loading, setLoading] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [helperText, setHelperText] = useState(true);
  const [investorRow, setInvestorRow] = useState({});
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [ogRows, setOgRows] = useState([]);
  const [flag, setFlag] = useState(false);

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
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/users`, {
        method: 'GET',
        headers: {
          'x-access-token': token
        }
      });
      const data = await response.json();
      setOgRows(data.data);
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/add/folio`,
        {
          method: 'POST',
          body: JSON.stringify({
            userId: investorRow.passport,
            commitment: values.commitment,
            yield: values.yield,
            date: selectedDate,
            folioNumber: values.folioNo,
            currency: values.currency
          }),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': JSON.parse(localStorage.getItem('token'))
          }
        }
      );
      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (data.status) {
        Swal.mixin({
          customClass: {
            container: 'add-folio-swal-container',
            popup: 'add-folio-swal swal-success-bg-color',
            title: 'add-folio-swal-title'
          },
          imageUrl: '',
          imageHeight: 10,
          imageWidth: 10,
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        }).fire(
          'New folio successfully created for ' + investorRow?.name ||
            'the investor!',
          '',
          'success'
        );
      } else
        Swal.mixin({
          customClass: {
            container: 'add-folio-swal-container',
            popup: 'add-folio-swal swal-error-bg-color',
            title: 'add-folio-swal-title'
          },
          imageUrl: '',
          imageHeight: 10,
          imageWidth: 10,
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        }).fire(data.error || 'Something went wrong!', '', 'error');
    } catch (e) {
      console.log(e);
    }
    history.push('/admin/folios');
  };

  useEffect(() => {
    if (
      !investorRow ||
      (Object.keys(investorRow).length === 0 &&
        investorRow.constructor === Object)
    ) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [investorRow]);

  return (
    <div className="add-folios-main">
      {size.width > 768 ? (
        <div>
          <AdNavbar />
        </div>
      ) : (
        <div className="add-folio-header">
          <IconButton
            size="large"
            style={{ color: '#132f5e' }}
            onClick={() => {
              history.push('/admin/folios');
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <h2 className="add-folio-title">Add New Folio</h2>
        </div>
      )}

      <div id="add-folios-container">
        <form action="" onSubmit={submitForm} className="add-folios-div">
          <div>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">
                Find Investor
              </small>
              <Autocomplete
                options={ogRows}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="add-folio-searchbar"
                    placeholder={
                      size.width <= 768
                        ? 'Search by Name or Passport'
                        : "Search by Investor's Name or Passport"
                    }
                  />
                )}
                value={investorRow}
                onChange={(event, newValue) => {
                  setInvestorRow(newValue);
                  console.log(newValue);
                }}
                getOptionLabel={(option) => {
                  if (option?.passport)
                    return `${option?.name} - ${option?.passport}`;
                  return '';
                }}
                forcePopupIcon={true}
                popupIcon={
                  <ArrowDropDownIcon htmlColor="var(--primary-color)" />
                }
              />
              {/* {errorName && (
            <small style={{ color: 'red' }}>Folio with ID not found!</small>
          )} */}
            </FormControl>
          </div>

          <div className="add-folio-info">
            <div
              className="add-folio-info-row"
              // style={{ borderBottom: ' 1px solid #E5E5E5' }}
            >
              <div className="add-folio-info-row-item">
                <div className="add-folio-info-row-item-label">
                  Investor Name
                </div>
                <div className="add-folio-info-row-item-value">
                  {flag ? investorRow?.name : 'NA'}
                </div>
              </div>

              <div className="add-folio-info-row-item">
                <div className="add-folio-info-row-item-label">
                  Passport Number
                </div>
                <div
                  className="add-folio-info-row-item-value"
                  style={{ textTransform: 'none' }}
                >
                  {flag ? investorRow?.passport : 'NA'}
                </div>
              </div>
            </div>
          </div>
          <div className="add-folio-info-row">
            <div className="add-folio-info-row-item">
              <div className="add-folio-info-row-item-label">
                Investor Address
              </div>
              <div
                className="add-folio-info-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {flag
                  ? investorRow?.address +
                    ',' +
                    investorRow?.city +
                    ',' +
                    ' ' +
                    investorRow?.state +
                    ',' +
                    investorRow?.country
                  : 'NA'}
              </div>
            </div>
          </div>

          <div className="add-folio-input-1">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">
                Folio No. *
              </small>
              <TextField
                required
                disabled={!flag}
                id="outlined-required"
                value={values.folioNo}
                onChange={handleChange('folioNo')}
                style={{ backgroundColor: 'white', color: '#132f5e' }}
                className="add-folio-searchbar"
              />
            </FormControl>

            <FormControl
              variant="standard"
              sx={{ width: '100%' }}
              className="add-folio-registration-div"
            >
              <small className="add-folio-find-investor-label">
                Registration Date *
              </small>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  required
                  maxDate={new Date()}
                  disabled={!flag}
                  inputFormat="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  disableCloseOnSelect={false}
                  minDate={new Date('2017-01-01')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="add-folio-searchbar"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: '#132f5e',
                        svg: 'var(--primary-color)'
                      }}
                    />
                  )}
                />
                {/* <MobileDatePicker
                  maxDate={new Date()}
                  disabled={!flag}
                  label="Registration Date"
                  inputFormat="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  disableCloseOnSelect={false}
                  renderInput={(params) => (
                    <TextField required {...params} sx={{ width: '100%' }} />
                  )}
                /> */}
              </LocalizationProvider>
            </FormControl>
          </div>

          <div className="add-folio-input-3">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">
                {'Yield (%) *'}
              </small>
              <TextField
                required
                disabled={!flag}
                id="outlined-number"
                type="number"
                value={values.yield}
                onChange={handleChange('yield')}
                InputLabelProps={{
                  shrink: true
                }}
                style={{ backgroundColor: 'white', color: '#132f5e' }}
                className="add-folio-searchbar"
              />
            </FormControl>

            <FormControl fullWidth sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">
                Capital Commitment *
              </small>
              <TextField
                required
                disabled={!flag}
                id="outlined-adornment-amount"
                value={values.commitment}
                onChange={handleChange('commitment')}
                // startAdornment={
                //   <InputAdornment position="start">
                //     <AttachMoneyIcon />
                //   </InputAdornment>
                // }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  )
                }}
                style={{ backgroundColor: 'white', color: '#132f5e' }}
                className="add-folio-searchbar"
              />
            </FormControl>
          </div>
          <div className="add-folio-input-3">
            <FormControl fullWidth sx={{ width: '100%' }}>
              <small className="add-folio-find-investor-label">Currency</small>
              <Select
                value={values.currency}
                onChange={handleChange('currency')}
                required
                className="add-folio-searchbar"
              >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'GBP'}>GBP</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="add-folios-btn-div">
            <Button
              id="add-folios-btn"
              type="submit"
              variant="contained"
              disabled={!flag}
              style={{
                display: 'flex',
                color: 'white',
                textTransform: 'none',
                width: '14rem',
                backgroundColor: '#E95B3E',
                marginLeft: '3.5rem'
              }}
            >
              Add Folio
            </Button>
          </div>
        </form>
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

export default AddFolio;
