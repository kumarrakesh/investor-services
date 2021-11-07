import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import AdNavbar from '../Navbar/Navbar';
import './Investors.css';
import CustomizedTables from './table';
import Swal from 'sweetalert2';
import { Backdrop, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Investors = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  const [loading, setLoading] = React.useState(true);
  const [displayRows, setDisplayRows] = useState([]);
  const [update, setUpdate] = useState(0);

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
    const response = await fetch(
      'https://investorbackend.herokuapp.com/api/users',
      {
        headers: {
          'x-access-token': token
        }
      }
    );
    const data = await response.json();
    setDisplayRows(data.data);
    setLoading(false);
  };

  const handleAddInvestor = () => {
    history.push('/admin/investor/add');
  };

  return (
    <div className="investors-main">
      <div>
        <AdNavbar />
      </div>

      <div className="investors-container">
        <h1 id="inv-title">Investors</h1>
        <h1 id="inv-overview">Overview</h1>

        <div className="total-investors-div">
          <p id="total-investors">Total Investors</p>
          <p id="total-no">{displayRows?.length}</p>
        </div>

        <div className="add-investor-btn">
          <Button
            variant="contained"
            style={{
              backgroundColor: '#E95B3E',
              textTransform: 'none',
              borderRadius: '8px !important'
            }}
            onClick={handleAddInvestor}
          >
            Add Investor
            <AddIcon sx={{ marginLeft: '10px' }} />
          </Button>
        </div>

        {/* <Button
            variant="outlined"
            className="download-btn"
            style={{ color: '#E95B3E' }}
          >
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

        <div className="investors-inv-table">
          <CustomizedTables
            displayRows={displayRows}
            setLoading={setLoading}
            loading={loading}
            setUpdate={setUpdate}
          />
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Investors;
