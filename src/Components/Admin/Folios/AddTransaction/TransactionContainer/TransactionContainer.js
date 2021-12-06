import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import CustomizedTables from '../table';
import Swal from 'sweetalert2';
import { Backdrop, CircularProgress } from '@mui/material';
import '../FolioAddTransaction.css';

const TransactionContainer = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [displayRows, setDisplayRows] = useState([]);
  const [values, setValues] = React.useState({
    folioNumber: '',
    investorName: '',
    investorPassport: '',
    commitment: '',
    yield: '',
    registrationDate: new Date(),
    folioId: '',
    contribution: ''
  });

  const [rows, setRows] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const setFolioBody = async () => {
    setValues({
      folioNumber: location?.state?.row?.folioNumber,
      investorName: location?.state?.row?.user.name,
      investorPassport: location?.state?.row?.user.passport,
      commitment: location?.state?.row?.commitment,
      yield: location?.state?.row?.yield,
      registrationDate: location?.state?.row?.date,
      contribution: location?.state?.row?.contribution
    });
    // console.log(values);
  };

  const getFolioStatement = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/get/folio/transaction`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({
            folioNumber: location?.state?.row?.folioNumber
          })
        }
      );

      const data = await response.json();
      // console.log('ye hi hai wo', data);
      if (data.status) {
        setRows(data.data);
        setDisplayRows(data.data);
      } else {
        Swal.fire('something went wrong', '', 'error');
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location?.state?.row) {
      setFolioBody();
      // console.log(location?.state?.row);
    }
  }, [location]);

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

  return (
    <div>
      <div className="folio-add-transaction">
        <h3 className="folio-add-transaction-heading">Investor Details</h3>
        <div className="folio-add-transaction-row">
          <div className="folio-add-transaction-row-item">
            <div className="folio-add-transaction-row-item-label">
              Investor Name
            </div>
            <div className="folio-add-transaction-row-item-value">
              {values.investorName}
            </div>
          </div>

          <div className="folio-add-transaction-row-item">
            <div className="folio-add-transaction-row-item-label">
              Folio No.
            </div>
            <div
              className="folio-add-transaction-row-item-value"
              style={{ textTransform: 'none' }}
            >
              {values.folioNumber}
            </div>
          </div>

          <div className="folio-add-transaction-row-item">
            <div className="folio-add-transaction-row-item-label">
              Registration Date
            </div>
            <div
              className="folio-add-transaction-row-item-value"
              style={{ textTransform: 'none' }}
            >
              {new Date(values.registrationDate).toLocaleDateString('en-GB')}
            </div>
          </div>
        </div>

        <div
          className="folio-add-transaction-row"
          style={{ borderBottom: ' 1px solid #E5E5E5' }}
        >
          <div className="folio-add-transaction-row-item">
            <div className="folio-add-transaction-row-item-label">
              Yield (%)
            </div>
            <div className="folio-add-transaction-row-item-value">
              {values.yield}
            </div>
          </div>

          <div className="folio-add-transaction-row-item">
            <div className="folio-add-transaction-row-item-label">
              Capital Commitment
            </div>
            <div
              className="folio-add-transaction-row-item-value"
              style={{ textTransform: 'none' }}
            >
              ${values.commitment}
            </div>
          </div>

          <div className="folio-add-transaction-row-item">
            <div className="folio-add-transaction-row-item-label">
              Capital Contribution
            </div>
            <div
              className="folio-add-transaction-row-item-value"
              style={{ textTransform: 'none' }}
            >
              ${values.contribution}
            </div>
          </div>
        </div>
      </div>

      <h3 className="folio-add-transaction-folio-statement-label">
        Folio Statement
      </h3>

      <CustomizedTables
        setDisplayRows={setDisplayRows}
        displayRows={displayRows}
        loading={loading}
        values={values}
        setLoading={setLoading}
      />

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

export default TransactionContainer;
