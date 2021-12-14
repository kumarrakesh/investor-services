import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import Swal from 'sweetalert2';
import {
  Button,
  Select,
  MenuItem,
  TextField,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import 'date-fns';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CustomizedTables from './Table/table';
import { ThemeProvider } from '@mui/styles';
const theme = createTheme({
  palette: {
    type: 'dark'
  }
});

const Dashboard = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  //states
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [rows, setRows] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [fundname, setFundname] = useState('All');

  const [loading, setLoading] = useState(true);
  //other hooks
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 3000
      });
      history.push('/');
    }
    getUserFolios();
  }, []);

  const getUserFolios = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/user/folio`,
        {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      setRows(data.data);
      console.log(data.data);
      setDisplayRows(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="statement-header-container">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="statement-container">
        <h1 className="stats">Dashboard</h1>

        <div className="statement-summary">
          <div className="statement-summary-col">
            <div className="statement-summary-name">Total Folios</div>
            <div className="statement-summary-val">{displayRows.length}</div>
          </div>
        </div>

        <CustomizedTables
          rows={displayRows}
          fundname={fundname}
          loading={loading}
          setLoading={setLoading}
        />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

export default Dashboard;
