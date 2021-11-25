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
const Folios = () => {
  let history = useHistory();
  const [ogRows, setOgRows] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [loading, setLoading] = React.useState(true);
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

    getAllFolios();
  }, []);

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
        <h1 className="folio-title">Folios</h1>
        {/* <h1 className="folio-overview">Overview</h1> */}
        <div className="folio-oneline">
          <div>
            <p className="total-folios">Total Folios</p>
            <p className="total-folios-no">{displayRows.length}</p>
          </div>
          {/* <div className="add-folio-btn"> */}
          <Button
            className="add-folio-btn"
            variant="contained"
            onClick={handleAddfolios}
          >
            <AddIcon sx={{ marginRight: '10px' }} />
            Add New Folio
          </Button>
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
        <div>
          <CustomizedTables
            displayRows={displayRows}
            setDisplayRows={setDisplayRows}
            setLoading={setLoading}
            loading={loading}
          />
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
