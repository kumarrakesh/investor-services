import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Grievances.css';
import { UserContext } from '../../../userContext';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Tabs, Tab, Box, Typography } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import CustomizedTables from './table';
import Swal from 'sweetalert2';
const errorSwal = Swal.mixin({
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
});
const successSwal = Swal.mixin({
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
});
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography> */}
          {children}
          {/* </Typography> */}
        </Box>
      )}
    </div>
  );
}
const Grievances = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('18 OCT 2021');
  const [data, setData] = useState('');

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

  const handleSendQuery = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API}/api/add/query`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        method: 'POST',
        body: JSON.stringify({ subject, description, date: new Date() })
      });
      const data = await response.json();
      setData(data);
      console.log(data);
      successSwal.fire(
        'Query sent successfully!',
        'Query Ref ID is: ' + data.data.queryId,
        'success'
      );
    } catch (e) {
      console.log(e);
      errorSwal.fire('Something went wrong', '', 'error');
    }
  };

  const [value, setValue] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRespone = async () => {
    setLoading(true);
    setValue('response');
    const token = JSON.parse(localStorage.getItem('token'));

    const response = await fetch(`${process.env.REACT_APP_API}/api/query`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      method: 'GET'
    });

    const data = await response.json();
    setLoading(false);
    // console.log(data.data);
    setRows(data.data);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="grievances-header-container">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="grievances-container">
        <h1 id="grievances-header-label">Investors and Funds</h1>
        <h1 className="query-header-label">Queries Generate</h1>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            outline: '1px solid #CECECE'
          }}
        >
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Raise Query" {...a11yProps(0)} />
            <Tab label="Query History" {...a11yProps(1)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <div className="query-container">
            <div className="query-container-title">Raise New Query</div>
            <div className="query-subject">
              <small className="add-folio-find-investor-label">
                Query Subject*
              </small>
              <TextField
                fullWidth
                name="subject"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                required
                id="fullWidth"
                className="add-folio-searchbar"
              />
            </div>
            <div className="user-query-box">
              <small className="add-folio-find-investor-label">
                Query Detail*
              </small>
              <TextField
                id="outlined-multiline-static"
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                fullWidth
                // multiline
                // rows={3}
                className="add-folio-searchbar"
              />
            </div>
            <div className="send-btn-div">
              <Button
                variant="outlined"
                className="send-btn"
                onClick={handleSendQuery}
                style={{
                  textTransform: 'none',
                  color: !subject || !description ? 'silver' : 'white',
                  backgroundColor:
                    !subject || !description ? 'white' : 'var(--primary-color)'
                }}
                disabled={!subject || !description}
              >
                Submit Query
              </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomizedTables rows={rows} loading={loading} />
        </TabPanel>

        {/* <div className="btns-div">
          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor:
                  value == 'raise' ? '#E95B3E' : 'hsl(10, 30%, 60%)',
                textTransform: 'none'
              }}
              onClick={() => {
                setValue('raise');
              }}
            >
              Raise Query
              <EditIcon sx={{ marginLeft: '10px' }} />
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor:
                  value == 'response' ? '#E95B3E' : 'hsl(10, 30%, 60%)',
                textTransform: 'none',
                marginLeft: '3rem'
              }}
              onClick={handleRespone}
            >
              Query History
              <HistoryIcon sx={{ marginLeft: '10px' }} />
            </Button>
          </div>
        </div> */}

        {/* <div>
          {value === 'raise' && (
            <div className="query-container">
              <div className="query-subject">
                <TextField
                  fullWidth
                  label="Query Subject"
                  name="subject"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  required
                  id="fullWidth"
                />
              </div>

              <div className="user-query-box">
                <TextField
                  id="outlined-multiline-static"
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  label="Query"
                  fullWidth
                  multiline
                  rows={3}
                />
              </div>

              <div className="send-btn-div">
                <Button
                  variant="outlined"
                  className="send-btn"
                  onClick={handleSendQuery}
                  style={{
                    textTransform: 'none',
                    color: !subject || !description ? 'gray' : '#E95B3E'
                  }}
                  disabled={!subject || !description}
                >
                  Send Query
                  <TelegramIcon />
                </Button>
              </div>
            </div>
          )}
          {value === 'response' && (
            <CustomizedTables rows={rows} loading={loading} />
          )}
        </div> */}
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

export default Grievances;
