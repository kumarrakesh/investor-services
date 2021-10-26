import React from 'react';
import './Dashboard.css';
// import { Button } from '@mui/material';
import { Line } from 'react-chartjs-2';

const DashContainer = () => {
  const state = {
    labels: [
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
    ],
    datasets: [
      {
        label: 'Investment',
        fill: false,
        backgroundColor: '#16D112',
        borderColor: '#16D112',
        borderWidth: 2,
        // data: monthlyInvestment
        data: [1, 2, 3, 4, 5]
      },
      {
        label: 'Current Value',
        fill: false,
        backgroundColor: '#F98701',
        borderColor: '#F98701',
        borderWidth: 2,
        // data: monthlyCurrentValue
        data: [6, 7, 8, 9, 10]
      },
      {
        label: 'Net Gain/Loss',
        fill: false,
        backgroundColor: '#1196FF',
        borderColor: '#1196FF',
        borderWidth: 2,
        // data: monthlyNetAmount
        data: [11, 12, 13, 14, 100]
      }
    ]
  };
  return (
    <div className="dash-container">
      <div className="dashboard-title">Dashboard</div>
      {/* <h1 className="dashboard-subtitle">Overview</h1> */}

      <div className="dashboard-graph-container">
        <div className="dashboard-graph-info">
          <div className="dashboard-graph-info-data">
            <div className="dashboard-graph-info-data-label">
              Total Investment
            </div>
            <div className="dashboard-graph-info-data-value">$10000.00</div>
          </div>
          <div className="dashboard-graph-info-data">
            <div className="dashboard-graph-info-data-label">Current Value</div>
            <div className="dashboard-graph-info-data-value">$15000.00</div>
          </div>
          <div className="dashboard-graph-info-data">
            <div className="dashboard-graph-info-data-label">Net Gain/Loss</div>
            <div className="dashboard-graph-info-data-value">$5000.00</div>
          </div>
          <button
            onClick={() => {
              alert('functionality to be added');
            }}
          >
            YEAR select button
          </button>
        </div>
        <div className="dashboard-graph">
          <Line
            data={state}
            options={{
              title: {
                display: true,
                text: 'dashboard',
                fontSize: 20,
                color: 'red'
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
    </div>
  );
};

export default DashContainer;
