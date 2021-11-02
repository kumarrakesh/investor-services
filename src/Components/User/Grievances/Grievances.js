import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Grievances.css';
import { UserContext } from '../../../userContext';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import TelegramIcon from '@mui/icons-material/Telegram';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import CustomizedTables from './table';
import Swal from 'sweetalert2';

const Grievances = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('18 OCT 2021');
  const [data, setData] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 3000
      });
      history.push('/');
    }
  }, []);

  const handleSendQuery = async () => {
    try {
      let response = await fetch(
        'https://investorbackend.herokuapp.com/api/add/query',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          method: 'POST',
          body: JSON.stringify({ subject, description, date: new Date() })
        }
      );
      setData(await response.json());
      // console.log(data);
      Swal.fire('Great!', 'Grievance sent successfully!', 'success');
    } catch (e) {
      console.log(e);
      Swal.fire('Something went wrong', '', 'error');
    }
  };

  const [value, setValue] = useState('raise');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRespone = async () => {
    setLoading(true);
    setValue('response');
    const token = JSON.parse(localStorage.getItem('token'));

    const response = await fetch(
      'https://investorbackend.herokuapp.com/api/query',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        method: 'GET'
      }
    );

    const data = await response.json();
    setLoading(false);
    // console.log(data.data);
    setRows(data.data);
  };

  return (
    <div className="header-container">
      <div className="sidebar">
        <Navbar />
      </div>

      <div className="grievances-container">
        <h1 id="grievances-header">Investors and Funds</h1>
        <h1 className="query-header">Grievance Generate</h1>

        <div className="btns-div">
          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor:
                  value == 'raise' ? '#E95B3E' : 'hsl(10, 30%, 60%)',
                textTransform: 'none'
              }}
              onClick={() => {
                setValue('raise');
              }}
            >
              Raise Grievance
              <EditIcon sx={{ marginLeft: '10px' }} />
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor:
                  value == 'response' ? '#E95B3E' : 'hsl(10, 30%, 60%)',
                textTransform: 'none'
              }}
              onClick={handleRespone}
            >
              Grievance History
              <HistoryIcon sx={{ marginLeft: '10px' }} />
            </Button>
          </div>
        </div>

        <div>
          {value === 'raise' && (
            <div className="query-container">
              <div className="query-subject">
                <TextField
                  fullWidth
                  label="Grievance Subject"
                  name="subject"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  required
                  id="fullWidth"
                />
              </div>

              <div className="user-query-box">
                <TextField
                  id="outlined-multiline-static"
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  label="Grievance"
                  fullWidth
                  multiline
                  rows={3}
                />
              </div>

              <div className="send-btn-div">
                <Button
                  variant="outlined"
                  className="send-btn"
                  onClick={handleSendQuery}
                  style={{
                    textTransform: 'none',
                    color: !subject || !description ? 'gray' : '#E95B3E'
                  }}
                  disabled={!subject || !description}
                >
                  Send Grievance
                  <TelegramIcon />
                </Button>
              </div>
            </div>
          )}
          {value === 'response' && (
            <CustomizedTables rows={rows} loading={loading} />
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

export default Grievances;
