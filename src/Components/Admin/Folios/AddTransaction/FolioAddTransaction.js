import React, { useState, useEffect } from 'react';
import AdNavbar from '../../Navbar/Navbar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import './FolioAddTransaction.css';
import CustomizedTables from './table';
import { Backdrop, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

const FolioAddTransaction = () => {
  const [displayRows, setDisplayRows] = useState([]);
  const [rows, setRows] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = React.useState({
    folioName: '',
    investorName: '',
    investorPassport: '',
    commitment: '',
    yield: '',
    registrationDate: new Date()
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
    getFolioStatement();
  }, []);

  useEffect(() => {
    if (location?.state?.row) {
      setFolioBody();
    }
  }, [location]);

  const setFolioBody = async () => {
    setValues({
      folioName: location?.state?.row?.folioName,
      investorName: location?.state?.row?.user.name,
      investorPassport: location?.state?.row?.user.passport,
      commitment: location?.state?.row?.commitment,
      yield: location?.state?.row?.yield,
      registrationDate: location?.state?.row?.date
    });
    console.log(values);
  };

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
        <h1 className="folio-overview">Overview</h1>
        <div className="folio-add-transaction">
          <div
            className="folio-add-transaction-row"
            style={{ borderBottom: ' 1px solid #E5E5E5' }}
          >
            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Folio Name
              </div>
              <div className="folio-add-transaction-row-item-value">
                {values.folioName}
              </div>
            </div>

            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Investor Name
              </div>
              <div
                className="folio-add-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {values.investorName}
              </div>
            </div>

            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Passport Number
              </div>
              <div
                className="folio-add-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {values.investorPassport}
              </div>
            </div>
          </div>

          <div
            className="folio-add-transaction-row"
            style={{ borderBottom: ' 1px solid #E5E5E5' }}
          >
            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Registration Date
              </div>
              <div className="folio-add-transaction-row-item-value">
                {new Date(values.registrationDate).toLocaleDateString('en-GB')}
              </div>
            </div>

            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                commitment
              </div>
              <div
                className="folio-add-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {values.commitment}
              </div>
            </div>

            <div className="folio-add-transaction-row-item">
              <div className="folio-add-transaction-row-item-label">
                Yield(%)
              </div>
              <div
                className="folio-add-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {values.yield}
              </div>
            </div>
          </div>
        </div>

        <CustomizedTables
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
