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
import useWindowSize from '../../../utils/useWindowSize';
const theme = createTheme({
  palette: {
    type: 'dark'
  }
});

const Dashboard = () => {
  const size = useWindowSize();
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
  //handlers
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
  const handleShowFolioData = async (row) => {
    console.log(row);
    return history.push({
      pathname: '/dashboard/folioStatement',
      state: { row }
    });
  };
  return (
    <div className="statement-header-container">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="statement-container">
        <h1 className="stats">Dashboard</h1>

        <div className="statement-summary" style={{ marginLeft: '0.5rem' }}>
          <div className="statement-summary-col">
            <div className="statement-summary-name">Total Folios</div>
            <div className="statement-summary-val">{displayRows.length}</div>
            <div className="statement-summary-val">
              {size.width <= 768 && (
                <div
                  style={{
                    fontSize: '1.5rem',
                    color: 'var(--secondary-color)',
                    fontWeight: '400'
                  }}
                >
                  Folios
                </div>
              )}
            </div>
          </div>
        </div>
        {size.width <= 768 ? (
          <div className="folio-card-mobile-container">
            {displayRows.map((row) => {
              console.log(row);
              return (
                <div className="folio-card-mobile" key={row._id}>
                  <div className="folio-card-mobile-header-top">
                    <div className="folio-card-mobile-header-folio-date">
                      {new Date(row.date).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                  {/*  */}
                  <div style={{ display: 'flex' }}>
                    <div
                      className="folio-card-mobile-header"
                      style={{
                        textAlign: 'left',
                        flex: '1',
                        fontSize: '14px',
                        // marginTop: '0.5rem',
                        flexDirection: 'column'
                      }}
                    >
                      <div className="folio-card-mobile-body-row-item">
                        <span>{row.folioNumber}</span>
                      </div>
                    </div>
                    <div
                      className="folio-card-mobile-header"
                      style={{
                        textAlign: 'right',
                        flex: '1.5 !important',
                        fontSize: '14px',
                        marginTop: '1rem',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                      }}
                    >
                      <div className="folio-card-mobile-body-row-item">
                        Contri.
                        <span style={{ color: '#333', fontWeight: 500 }}>
                          {row.contribution}
                        </span>
                      </div>
                      <div className="folio-card-mobile-body-row-item">
                        Commit.
                        <span style={{ color: '#333', fontWeight: 500 }}>
                          {row.commitment}
                        </span>
                      </div>
                      <div className="folio-card-mobile-body-row-item">
                        Expected Yield
                        <span style={{ color: '#333', fontWeight: 500 }}>
                          {row.yield}%
                        </span>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '0.3rem'
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        color: 'var(--primary-color)',
                        backgroundColor: 'white',
                        border: '1px solid var(--primary-color)',
                        fontSize: '0.7rem',
                        width: '9rem',
                        textTransform: 'none'
                      }}
                      onClick={() => {
                        handleShowFolioData(row);
                      }}
                    >
                      View Detail
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <CustomizedTables
            rows={displayRows}
            fundname={fundname}
            loading={loading}
            setLoading={setLoading}
          />
        )}

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
