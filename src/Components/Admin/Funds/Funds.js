import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { Backdrop, CircularProgress } from '@mui/material';
import AdNavbar from '../Navbar/Navbar';
import './Funds.css';
import CustomizedTables from './table';
import Swal from 'sweetalert2';

const Funds = () => {
  let history = useHistory();
  const [displayRows, setDisplayRows] = useState([]);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = React.useState(true);

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

    getAllFunds();
  }, []);

  useEffect(() => {
    getAllFunds();
  }, [update]);

  const getAllFunds = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API}/api/funds`, {
      headers: {
        'x-access-token': token
      }
    });
    const data = await response.json();
    console.log(data);
    setDisplayRows(data.data);
    setLoading(false);
  };

  const handleAddFunds = () => {
    history.push('/admin/funds/add');
  };

  const handleLoadingDone = () => {
    // setLoading(false);
  };

  return (
    <div className="funds-main">
      <div>
        <AdNavbar />
      </div>

      <div id="funds-container">
        <h1 className="dtitle">Funds</h1>
        <h1 className="overview">Overview</h1>

        <p className="total-investors">Total Funds</p>
        <p className="total-no">{displayRows.length}</p>

        <div className="inv-btns">
          <div>
            <Button
              variant="contained"
              onClick={handleAddFunds}
              style={{ backgroundColor: '#E95B3E', textTransform: 'none' }}
            >
              Add New Fund +
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
        </div>

        <div>
          <CustomizedTables
            displayRows={displayRows}
            setUpdate={setUpdate}
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

export default Funds;
