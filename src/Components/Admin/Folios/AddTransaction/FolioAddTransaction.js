import React, { useState, useEffect } from 'react';
import AdNavbar from '../../Navbar/Navbar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory } from 'react-router';
import './FolioAddTransaction.css';
import CustomizedTables from './table';
import { Backdrop, CircularProgress } from '@mui/material';

const FolioAddTransaction = () => {
  const [displayRows, setDisplayRows] = useState([]);
  const [rows, setRows] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    getFolioStatement();
  }, []);

  const getFolioStatement = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://investorbackend.herokuapp.com/api/get/folio/transaction',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({
            folioId: '618a4a03537eb2a3707aaf45'
          })
        }
      );

      const data = await response.json();
      console.log(data);
      setRows(data.data);
      setDisplayRows(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  return (
    <div className="folio-add-transaction-main">
      <div>
        <AdNavbar />
      </div>
      <div className="folio-add-transaction-container">
        <div className="folio-add-transaction-header">
          <h1 className="folio-add-transaction-header-label">
            Add Folio Transaction{' '}
          </h1>
          <IconButton
            size="large"
            style={{ color: '#E95B3E' }}
            onClick={() => {
              history.push('/admin/folios');
            }}
          >
            <CancelIcon fontSize="inherit" />
          </IconButton>
        </div>

        <CustomizedTables
          rows={rows}
          setRows={setRows}
          setDisplayRows={setDisplayRows}
          displayRows={displayRows}
          loading={loading}
          setLoading={setLoading}
        />
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

export default FolioAddTransaction;
