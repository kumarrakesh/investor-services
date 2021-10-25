import React from 'react';
import './Dashboard.css';
import Button from '@mui/material/Button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 'Aug',
    uv: 3290,
    pv: 4000,
    amt: 2900
  },
  {
    name: 'Sep',
    uv: 3390,
    pv: 4500,
    amt: 4800
  },
  {
    name: 'Oct',
    uv: 3490,
    pv: 6500,
    amt: 2100
  },
  {
    name: 'Nov',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 'Dec',
    uv: 5690,
    pv: 1200,
    amt: 2100
  }
];

const DashContainer = () => {
  return (
    <div className="dash-container">
      <h1 className="dtitle">Dashboard</h1>

      <h1 className="overview">Overview</h1>

      <div className="chart_outer">
        <div className="chart_inner">
          <LineChart
            align={'center'}
            width={800}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 80,
              left: 80,
              bottom: 5
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 'dataMax']} />
            <Tooltip />
            <Legend />
            <Line dataKey="pv" stroke="#16D112" activeDot={{ r: 4 }} />
            <Line dataKey="uv" stroke="#F98701" />
            <Line stroke="#1196FF" />
          </LineChart>
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
