import React from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar'; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Aug",
    uv: 3290,
    pv: 4000,
    amt: 2900
  },
  {
    name: "Sep",
    uv: 3390,
    pv: 4500,
    amt: 4800
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 6500,
    amt: 2100
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Dec",
    uv: 5690,
    pv: 1200,
    amt: 2100
  }
];

const Dashboard = () => {
  return (
    <div id="header-container">
      <div>
        <Navbar />
      <h1 className="dtitle">Dashboard</h1>

      <h1 className = "overview">Overview</h1>
      </div> 

      <div className="chart_outer">
        <div className="chart_inner">
        <LineChart
        align={"center"}
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
      <Line
       dataKey="pv"
       stroke="#16D112"
       activeDot={{ r: 4 }}
      />
      <Line  dataKey="uv" stroke="#F98701" /> 
      <Line stroke="#1196FF" />
      </LineChart>
      </div>
      </div>   
       
  
  
    </div>
  );
};

export default Dashboard;
