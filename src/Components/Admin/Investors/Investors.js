import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import AdNavbar from '../Navbar/Navbar';
import './Investors.css';
import CustomizedTables from './table';
import Swal from 'sweetalert2';
import { Backdrop, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useWindowSize from '../../../utils/useWindowSize';
import SearchIcon from '@material-ui/icons/Search';
import {
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  Autocomplete
} from '@mui/material';

const Investors = () => {
  const size = useWindowSize();
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  const [loading, setLoading] = React.useState(true);
  const [displayRows, setDisplayRows] = useState([]);
  const [update, setUpdate] = useState(0);
  const [ogRows, setOgRows] = useState([]);
  const [folioNumber, setFolioNumber] = React.useState({});
  const [investorRow, setInvestorRow] = useState({});
  const [flag, setFlag] = useState(false);

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
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API}/api/users`, {
      headers: {
        'x-access-token': token
      }
    });
    const data = await response.json();
    setDisplayRows(data?.data);
    setOgRows(data?.data);
    setLoading(false);
  };

  const handleAddInvestor = () => {
    history.push('/admin/investor/add');
  };

  const handleSetSearch = async (investorRow) => {
    setLoading(true);
    let filtered = ogRows.filter((row) => {
      // console.log(row);
      return row?.passport === investorRow?.passport;
    });
    setDisplayRows(filtered);
    await setTimeout(() => {
      setLoading(false);
    }, 250);
  };

  useEffect(() => {
    if (
      !investorRow ||
      (Object.keys(investorRow).length === 0 &&
        investorRow.constructor === Object)
    ) {
      setDisplayRows(ogRows);
    } else {
      handleSetSearch(investorRow);
    }
  }, [investorRow]);

  return (
    <div className="investors-main">
      <div>
        <AdNavbar />
      </div>

      <div className="investors-container">
        <h1 id="inv-title">Investors</h1>

        <div className="investors-overview-div">
          <div className="total-investors-div">
            <p id="total-investors">Total Investors</p>
            <p id="total-no">{ogRows?.length}</p>
          </div>

          <Button
            variant="contained"
            className="add-investor-btn"
            style={{
              backgroundColor: '#E95B3E',
              textTransform: 'none',
              borderRadius: '8px !important'
            }}
            onClick={handleAddInvestor}
          >
            <AddIcon sx={{ marginRight: '0.5rem' }} />
            Add Investor
          </Button>
        </div>

        <FormControl variant="standard">
          <Autocomplete
            options={ogRows}
            renderInput={(params) => (
              <TextField
                {...params}
                className="folio-searchbar"
                placeholder={
                  size.width <= 768
                    ? 'Search by Name or Passport'
                    : "Search by Investor's Name or Passport"
                }
              />
            )}
            // className="folio-searchbar"
            placeholder="Search by folio number"
            // value={folioId}
            // onChange={(e) => {
            //   setFolioId(e.target.value);
            // }}
            value={investorRow}
            onChange={(event, newValue) => {
              setInvestorRow(newValue);
            }}
            getOptionLabel={(option) => {
              if (option?.passport)
                return `${option?.name} - ${option?.passport}`;
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
            Investor Detail
          </div>
        )}
        <div>
          {size.width <= 768 ? (
            <div className="investor-card-mobile-container">
              {displayRows?.map((row) => {
                console.log(row);
                return (
                  <div className="investor-card-mobile" key={row._id}>
                    <div className="investor-card-mobile-header-top">
                      <div className="investor-card-mobile-header-folio-date">
                        {new Date(row.dateOfCreation).toLocaleDateString(
                          'en-GB'
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div className="investor-card-mobile-header">
                        <div className="investor-card-mobile-header-name">
                          {row.name}
                        </div>
                        <p className="investor-card-mobile-header-folio">
                          {[row.city, row.state, row.country]
                            .filter((value) => value && value?.trim().length)
                            .join(', ')}
                        </p>
                      </div>
                      <div
                        className="investor-card-mobile-header"
                        style={{ textAlign: 'right' }}
                      >
                        <p style={{ color: '#666666' }}> Passport No.</p>
                        <p
                          className="investor-card-mobile-body-left-date"
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          <span style={{ color: ' #333333' }}>
                            {row.passport}{' '}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '0.5rem'
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          color: 'var(--primary-color)',
                          backgroundColor: 'white',
                          border: '1px solid var(--primary-color)',
                          fontSize: '0.8rem',
                          padding: '0.4rem 2rem',
                          textTransform: 'none'
                        }}
                        onClick={() => {
                          history.push({
                            pathname: '/admin/investor/add',
                            state: { row, from: history.location.pathname }
                          });
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <CustomizedTables
              displayRows={displayRows}
              setLoading={setLoading}
              loading={loading}
              setUpdate={setUpdate}
            />
          )}
        </div>
      </div>
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
};

export default Investors;
