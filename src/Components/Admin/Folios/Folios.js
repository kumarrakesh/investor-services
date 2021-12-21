import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { Backdrop, CircularProgress } from '@mui/material';
import AdNavbar from '../Navbar/Navbar';
import './Folios.css';
import CustomizedTables from './table';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@material-ui/icons/Search';
import {
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  Autocomplete
} from '@mui/material';
import useWindowSize from '../../../utils/useWindowSize';
const Folios = ({ role }) => {
  const size = useWindowSize();
  let history = useHistory();
  const [ogRows, setOgRows] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [folioNumber, setFolioNumber] = React.useState({});

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 3000
      });
      history.push('/');
    }
    setFolioNumber({});
    getAllFolios();
  }, [history.location.pathname]);

  const getAllFolios = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/all/folio`,
        {
          method: 'POST',
          headers: {
            'x-access-token': token
          }
        }
      );
      const data = await response.json();
      setDisplayRows(data.data);
      setOgRows(data.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleAddfolios = () => {
    history.push('/admin/folios/add');
  };
  const handleSearchFolioNumber = async (folioNumber) => {
    setLoading(true);
    let filtered = ogRows.filter((row) => {
      // console.log(row);
      return row?.folioNumber === folioNumber?.folioNumber;
    });
    setDisplayRows(filtered);
    // sleep for 1 second
    await setTimeout(() => {
      setLoading(false);
    }, 250);
  };
  useEffect(() => {
    if (!folioNumber || folioNumber.length < 1) {
      setDisplayRows(ogRows);
    } else handleSearchFolioNumber(folioNumber);
  }, [folioNumber]);
  return (
    <div className="folios-main">
      <div>
        <AdNavbar />
      </div>

      <div id="folios-container">
        <h1 className="folio-title">
          {role == 'folio' ? 'Folios' : 'Folio Statements'}
        </h1>
        {/* <h1 className="folio-overview">Overview</h1> */}
        <div className="folio-oneline">
          <div>
            <p className="total-folios">
              {role == 'folio' ? 'Total Folios' : 'Total Transactions'}
            </p>
            <p className="total-folios-no">{ogRows.length}</p>
          </div>
          {/* <div className="add-folio-btn"> */}
          {role == 'folio' && (
            <Button
              className="add-folio-btn"
              variant="contained"
              onClick={handleAddfolios}
            >
              <AddIcon sx={{ marginRight: '0.5rem' }} />
              Add New Folio
            </Button>
          )}
        </div>
        {/* <Button variant="outlined" style={{ color: '#E95B3E' }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 16.25V20.5H3.49996V16.25H0.666626V20.5C0.666626 22.0583 1.94163 23.3333 3.49996 23.3333H20.5C22.0583 23.3333 23.3333 22.0583 23.3333 20.5V16.25H20.5ZM19.0833 10.5833L17.0858 8.58582L13.4166 12.2408V0.666656H10.5833V12.2408L6.91412 8.58582L4.91663 10.5833L12 17.6667L19.0833 10.5833Z"
                fill="#E95B3E"
              />
            </svg>
            Download
            {'\n'} List
          </Button> */}
        {/* </div> */}
        <FormControl variant="standard">
          <Autocomplete
            options={ogRows}
            renderInput={(params) => (
              <TextField
                {...params}
                className="folio-searchbar"
                placeholder="Search by folio number"
              />
            )}
            // className="folio-searchbar"
            placeholder="Search by folio number"
            // value={folioId}
            // onChange={(e) => {
            //   setFolioId(e.target.value);
            // }}
            value={folioNumber}
            onChange={(event, newValue) => {
              setFolioNumber(newValue);
            }}
            getOptionLabel={(option) => {
              if (option?.folioNumber)
                return `${option?.folioNumber} - ${option?.user?.name}`;
              return '';
            }}
            forcePopupIcon={true}
            popupIcon={<SearchIcon htmlColor="var(--primary-color)" />}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            // onKeyDown={(e) => {
            //   if (e.key == 'Enter') {
            //     e.preventDefault();
            //     console.log(folioNumber);
            //     handleSearchFolioNumber(folioNumber);
            //     return;
            //   }
            // }}
          />
          {/* {errorName && (
            <small style={{ color: 'red' }}>Folio with ID not found!</small>
          )} */}
        </FormControl>
        {size.width <= 768 && (
          <div
            style={{
              fontSize: '1.5rem',
              marginLeft: '0.5rem',
              color: 'var(--secondary-color)'
            }}
          >
            Folio Detail
          </div>
        )}
        <div>
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
                      <div
                        style={{
                          height: '5px',
                          width: '5px',
                          backgroundColor: 'gray',
                          borderRadius: '1rem'
                        }}
                      ></div>
                      <p className="folio-card-mobile-header-name">
                        {row.folioNumber}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div
                        className="folio-card-mobile-header"
                        style={{ flexDirection: 'row', flex: '1.3' }}
                      >
                        <div className="folio-card-mobile-header-name">
                          {row.user?.name}
                        </div>
                        <p className="folio-card-mobile-header-folio">
                          {row.user?.passport}
                        </p>
                      </div>

                      <div
                        className="folio-card-mobile-header"
                        style={{
                          textAlign: 'left',
                          flex: '1',
                          fontSize: '14px',
                          marginTop: '0.5rem'
                        }}
                      >
                        <p className="folio-card-mobile-body-row-item">
                          <span style={{ color: '#666' }}>Commit. </span>
                          <span>
                            {' '}
                            {Math.round(
                              (row.commitment + Number.EPSILON) * 100
                            ) / 100}
                          </span>
                        </p>
                        <p className="folio-card-mobile-body-row-item">
                          <span style={{ color: '#666' }}>Tot. Contri. </span>
                          <span>
                            {' '}
                            {Math.round(
                              (row.contribution + Number.EPSILON) * 100
                            ) / 100}
                          </span>
                        </p>

                        <p className="folio-card-mobile-body-row-item">
                          <span style={{ color: '#666' }}>Pending Amt. </span>
                          <span
                            style={{
                              color: '#333333'
                            }}
                          >
                            {' '}
                            {Math.round(
                              (row.commitment -
                                row.contribution +
                                Number.EPSILON) *
                                100
                            ) / 100}
                          </span>
                        </p>
                      </div>
                    </div>
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
                          if (role == 'folio') {
                            history.push({
                              pathname: '/admin/folios/addTransaction',
                              state: { row, from: history.location.pathname }
                            });
                          } else {
                            history.push({
                              pathname: '/admin/folioStatements/viewDetail',
                              state: { row, from: history.location.pathname }
                            });
                          }
                        }}
                      >
                        {role == 'folio' ? 'Add Transaction' : 'View Detail'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <CustomizedTables
              displayRows={displayRows}
              setDisplayRows={setDisplayRows}
              setLoading={setLoading}
              loading={loading}
              role={role}
            />
          )}
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

export default Folios;
