import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import AdNavbar from '../../Navbar/Navbar';
import Swal from 'sweetalert2';
import { alpha, styled } from '@mui/material/styles';
import {
  TextField,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './AddTransaction.css';

const AddTransaction = () => {
  //states
  const [users, setUsers] = useState([]);
  const [fundNames, setFundNames] = useState([]);
  const [formDataError, setFormDataError] = useState({
    invName: false,
    fundname: false,
    totalValue: false,
    units: false,
    nav: false
  });
  const [formData, setFormData] = useState({
    invName: '',
    fundname: '',
    navDate: new Date(),
    action: 'Invest',
    totalValue: 0,
    units: 0,
    nav: 0,
    remarks: ''
  });
  const [loading, setLoading] = useState(false);
  //hooks
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 3000
      });
      history.replace('/');
    } else {
      getUserAndFundNames();
    }
  }, []);
  const history = useHistory();
  //handlers
  const handleSubmitNewTransaction = async () => {
    try {
      setLoading(true);
      var flag = false;
      let tempObj = {};
      if (!formData.invName) {
        flag = true;
        tempObj = { ...tempObj, invName: true };
      } else {
        tempObj = { ...tempObj, invName: false };
      }
      if (!formData.fundname) {
        flag = true;
        tempObj = { ...tempObj, fundname: true };
      } else {
        tempObj = { ...tempObj, fundname: false };
      }
      if (!formData.navDate) {
        flag = true;
        tempObj = { ...tempObj, navDate: true };
      } else {
        tempObj = { ...tempObj, navDate: false };
      }
      if (!+formData.units && formData.action != 'Invest') {
        flag = true;
        tempObj = { ...tempObj, units: true };
      } else {
        tempObj = { ...tempObj, units: false };
      }
      if (!+formData.totalValue && formData.action == 'Invest') {
        flag = true;
        tempObj = { ...tempObj, totalValue: true };
      } else {
        tempObj = { ...tempObj, totalValue: false };
      }
      if (!+formData.nav) {
        flag = true;
        tempObj = { ...tempObj, nav: true };
      } else {
        tempObj = { ...tempObj, nav: false };
      }
      setFormDataError({ ...formDataError, ...tempObj });
      if (flag) {
        setLoading(false);
        return;
      }
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/add/transaction`,
        {
          method: 'POST',
          body: JSON.stringify({
            userId: formData.invName,
            fundname: formData.fundname,
            date: formData.navDate,
            narration: formData.remarks,
            nav: formData.nav,
            investedAmount:
              formData.action == 'Invest' ? formData.totalValue : 0,
            units: formData.action == 'Invest' ? 0 : -1 * formData.units
          }),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': JSON.parse(localStorage.getItem('token'))
          }
        }
      );
      const data = await response.json();
      setLoading(false);
      if (data.status) {
        history.push('/admin/investments');
        Swal.fire('Created Successfully!', '', 'success');
      } else Swal.fire('Something went wrong', data.error, 'error');
    } catch (e) {
      Swal.fire('Something went wrong', 'some server issue', 'error');
    }
  };
  const getUserAndFundNames = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API}/api/users`, {
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('token'))
        }
      });
      const response1 = await fetch(`${process.env.REACT_APP_API}/api/funds`, {
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('token'))
        }
      });
      const data = await response.json();
      const data1 = await response1.json();
      setUsers(data.data);
      setFundNames(data1.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleChangeFormData = async (e) => {
    if (e.target.name == 'fundname') {
      let navOfFund = fundNames.filter((el) => el.fundname == e.target.value)[0]
        ?.nav;
      // console.log(navOfFund);
      setFormData({
        ...formData,
        nav: navOfFund || 0,
        [e.target.name]: e.target.value
      });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeNavDate = (e) => {
    setFormData({ ...formData, navDate: new Date(e) });
  };
  //components
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '400px',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      }
    }
  }));

  const BootstrapInput1 = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '1100px',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      }
    }
  }));

  return (
    <div className="add-transaction-main">
      <AdNavbar />
      <div className="add-investments-cross-btn">
        <IconButton
          size="large"
          style={{ color: '#E95B3E' }}
          onClick={() => {
            history.push('/admin/investments');
          }}
        >
          <CancelIcon fontSize="inherit" />
        </IconButton>
      </div>
      <div id="add-transaction-container">
        <div className="add-transaction-title">Investments</div>
        <div className="add-transaction-subtitle">Record New Transaction</div>
        <div className="add-investments-forms">
          <div>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              {formDataError.invName && (
                <small style={{ color: 'red' }}>Please select a name</small>
              )}
              <FormHelperText>Investor Name *</FormHelperText>
              <Select
                value={formData.invName}
                name="invName"
                onChange={handleChangeFormData}
                variant="outlined"
              >
                {users
                  .filter((el) => el.name != 'admin')
                  .sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                  )
                  .map((el) => (
                    <MenuItem value={el._id} key={el._id}>
                      {el.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              {formDataError.fundname && (
                <small style={{ color: 'red' }}>
                  Please select a fund name
                </small>
              )}
              <FormHelperText>Fund Name *</FormHelperText>
              <Select
                name="fundname"
                variant="outlined"
                value={formData.fundname}
                onChange={handleChangeFormData}
              >
                {fundNames
                  .sort((a, b) =>
                    a.fundname > b.fundname
                      ? 1
                      : b.fundname > a.fundname
                      ? -1
                      : 0
                  )
                  .map((el) => (
                    <MenuItem value={el.fundname} key={el._id}>
                      {el.fundname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl
              variant="standard"
              sx={{ width: '100%', marginTop: '1rem' }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={formData.navDate}
                  onChange={handleChangeNavDate}
                  disableCloseOnSelect={false}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%' }}>
              <FormHelperText>Action *</FormHelperText>
              <Select
                name="action"
                variant="outlined"
                value={formData.action}
                onChange={handleChangeFormData}
              >
                <MenuItem value="Invest">Invest</MenuItem>
                <MenuItem value="Withdraw">Withdraw</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div id="transcation-id3">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              {formDataError.nav && (
                <small style={{ color: 'red', marginBottom: 10 }}>
                  Please enter NAV
                </small>
              )}
              <TextField
                label="NAV"
                required
                name="nav"
                type="number"
                value={formData.nav}
                onChange={handleChangeFormData}
              />
            </FormControl>

            {formData.action == 'Invest' && (
              <FormControl variant="standard" sx={{ width: '100%' }}>
                {formDataError.totalValue && (
                  <small style={{ color: 'red', marginBottom: 10 }}>
                    Please enter this field
                  </small>
                )}
                <TextField
                  type="number"
                  label="Total Value"
                  required
                  name="totalValue"
                  value={formData.totalValue}
                  onChange={handleChangeFormData}
                  disabled={formData.action != 'Invest'}
                />
              </FormControl>
            )}
            {formData.action != 'Invest' && (
              <FormControl variant="standard" sx={{ width: '100%' }}>
                {formDataError.units && (
                  <small style={{ color: 'red', marginBottom: 10 }}>
                    Please enter this field
                  </small>
                )}
                <TextField
                  label="Number of Units"
                  required
                  type="number"
                  name="units"
                  value={formData.units}
                  onChange={handleChangeFormData}
                  disabled={formData.action == 'Invest'}
                />
              </FormControl>
            )}
          </div>
          {formData.action != 'Invest' ? (
            <h3>
              Total Amount:
              {Math.round(
                formData.units * formData.nav * 100 + Number.EPSILON
              ) / 100 || 0}
            </h3>
          ) : (
            <h3>
              Units:
              {Math.round(
                (formData.totalValue / formData.nav) * 100 + Number.EPSILON
              ) / 100 || 0}
            </h3>
          )}
          <div id="transcation-id4">
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <TextField
                label="Narration"
                name="remarks"
                value={formData.remarks}
                onChange={handleChangeFormData}
              />
            </FormControl>
          </div>

          <div id="add-transaction-btn">
            <Button
              variant="outlined"
              className="download-btn"
              style={{
                color: '#fff',
                textTransform: 'none',
                width: '300px',
                backgroundColor: 'var(--primary-color)'
              }}
              onClick={handleSubmitNewTransaction}
            >
              Record New Transaction
            </Button>
          </div>
        </div>
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

export default AddTransaction;
