import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

const DashContainer = () => {
  const monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Novemeber',
    'December'
  ];

  // states
  const [year, setYear] = useState(new Date());
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(new Date(Date.now()).getUTCFullYear());
  // graphdata
  const state = {
    labels: monthLabels,

    datasets: [
      {
        label: 'Investment',
        fill: false,
        backgroundColor: '#16D112',
        borderColor: '#16D112',
        borderWidth: 2,
        lineTension: 0,
        data: dashboardData.map(
          (el) => Math.round(el.investedAmount * 100 + Number.EPSILON) / 100
        )
      },
      {
        label: 'Current Value',
        fill: false,
        backgroundColor: '#F98701',
        borderColor: '#F98701',
        borderWidth: 2,
        lineTension: 0,
        data: dashboardData.map(
          (el) => Math.round(el.currentAmount * 100 + Number.EPSILON) / 100
        )
      }
      // ,{
      //   label: 'Net Gain/Loss',
      //   fill: false,
      //   backgroundColor: '#1196FF',
      //   borderColor: '#1196FF',
      //   borderWidth: 2,
      //   lineTension: 0,
      //   data: dashboardData.map(
      //     (el) =>
      //       Math.round(
      //         (el.currentAmount - el.investedAmount) * 100 + Number.EPSILON
      //       ) / 100
      //   )
      // }
    ]
  };
  //hooks
  useEffect(() => {
    handleGetDashboardData();
  }, [year]);
  //handlers
  const handleGetDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/user/dashboard`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': JSON.parse(localStorage.getItem('token'))
          },
          method: 'POST',
          body: JSON.stringify({
            year: new Date(year).getUTCFullYear()
          })
        }
      );
      const data = await response.json();
      setDashboardData(data.data);
      // console.log(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleChangeYear = (date) => {
    setYear(new Date(date));
  };

  return (
    <div className="dash-container">
      <div className="dashboard-title">Dashboard</div>
      <div className="dashboard-graph-container">
        <div className="dashboard-graph-info">
          <div className="dashboard-graph-info-data">
            <div className="dashboard-graph-info-data-label">
              Total Investment
            </div>
            <div className="dashboard-graph-info-data-value">
              {Math.round(
                (dashboardData?.[11]?.investedAmount + Number.EPSILON) * 100
              ) / 100 || 0}
            </div>
          </div>
          <div className="dashboard-graph-info-data">
            <div className="dashboard-graph-info-data-label">Current Value</div>
            <div className="dashboard-graph-info-data-value">
              {Math.round(
                (dashboardData?.[11]?.currentAmount + Number.EPSILON) * 100
              ) / 100 || 0}
            </div>
          </div>
          <div className="dashboard-graph-info-data">
            <div className="dashboard-graph-info-data-label">Net Gain/Loss</div>
            <div
              className="dashboard-graph-info-data-value"
              style={{
                color:
                  dashboardData?.[11]?.currentAmount -
                    dashboardData?.[11]?.investedAmount >=
                  0
                    ? '#4EF933'
                    : '#bc2424'
              }}
            >
              {Math.round(
                (dashboardData?.[11]?.currentAmount -
                  dashboardData?.[11]?.investedAmount +
                  Number.EPSILON) *
                  100
              ) / 100 || 0}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <small style={{ color: 'white', fontWeight: 300 }}>
              Year filter
            </small>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                maxDate={new Date('12/31/' + new Date().getUTCFullYear())}
                inputFormat="yyyy"
                value={new Date(year)}
                onChange={handleChangeYear}
                disableCloseOnSelect={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      backgroundColor: 'white !important',
                      margin: '10px',
                      marginLeft: 0,
                      borderRadius: '4px',
                      width: '15ch'
                    }}
                  />
                )}
                views={['year']}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="dashboard-graph">
          <Line
            data={state}
            options={{
              scales: {
                xAxes: [{ stacked: true }]
              },
              tooltips: {
                mode: 'label'
              }
            }}
          />
        </div>
      </div>

      {/* <div className="btns">
        <Button
          variant="outlined"
          className="inv-btn"
          style={{ color: '#E95B3E', textAlign: 'left', Padding: '5,2' }}
        >
          <div>
            {' '}
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
          </div>
          <div className="inv-txt">
            Download
            {'\n'} Investment Report
          </div>
        </Button>
        <Button
          variant="outlined"
          className="gain-btn"
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
          {'\n'} Gain Report
        </Button>
        <Button
          variant="outlined"
          className="overall-btn"
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
          {'\n'} Overall Report
        </Button>
      </div> */}
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
};

export default DashContainer;
