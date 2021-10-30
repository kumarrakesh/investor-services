import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Backdrop, CircularProgress } from '@mui/material';
import AdNavbar from '../Navbar/Navbar';
import './Grievances.css';
import CustomizedTables from './table';

import 'date-fns';
import Swal from 'sweetalert2';

const AdminGrievances = () => {
  //states
  const [queries, setQueries] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [update, setUpdate] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  //hooks
  let history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 3000
      });
      history.push('/');
    } else {
      getAllQueries();
    }
  }, []);
  useEffect(() => {
    getAllQueries();
  }, [update]);
  //handlers
  const handleLoadingDone = () => {
    // setLoading(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getAllQueries = async () => {
    setLoading(true);
    const response = await fetch(
      'https://investorbackend.herokuapp.com/api/query/all',
      {
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('token'))
        }
      }
    );
    const data = await response.json();
    // console.log(data.data);
    setQueries(data.data);
    setDisplayRows(data.data);
    setLoading(false);
  };
  return (
    <div className="grievances-main">
      <div>
        <AdNavbar />
      </div>

      <div id="grievances-container">
        <h1 className="dtitle">Grievances</h1>
        <h1 className="overview">Overview</h1>
        <p className="total-investors">Unresolved Grievances</p>
        <p className="total-no">
          {queries?.filter((el) => !el.isResolved).length}
        </p>
        {/* <div className="inv-btns">
          <div>
            <Button
              variant="contained"
              id="apply-btn"
              href="#contained-buttons"
              style={{ textTransform: 'none' }}
            >
              Record New Transaction +
            </Button>
          </div>

          <Button
            variant="outlined"
            className="download-btn"
            style={{ color: '#E95B3E', textTransform: 'none' }}
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
          </Button>
        </div> */}

        <div className="inv-table-grievances">
          <CustomizedTables
            rows={queries}
            displayRows={displayRows}
            setDisplayRows={setDisplayRows}
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

export default AdminGrievances;
