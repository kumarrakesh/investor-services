import React, { useState, useEffect } from 'react';
import AdNavbar from '../../Navbar/Navbar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import './UserFolioStatement.css';
import CustomizedTables from './table';
import { Backdrop, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const errorSwal = Swal.mixin({
  customClass: {
    container: 'add-folio-swal-container',
    popup: 'add-folio-swal swal-error-bg-color',
    title: 'add-folio-swal-title'
  },
  imageUrl: '',
  imageHeight: 10,
  imageWidth: 10,
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});
const successSwal = Swal.mixin({
  customClass: {
    container: 'add-folio-swal-container',
    popup: 'add-folio-swal swal-success-bg-color',
    title: 'add-folio-swal-title'
  },
  imageUrl: '',
  imageHeight: 10,
  imageWidth: 10,
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

const UserFolioStatement = () => {
  const [displayRows, setDisplayRows] = useState([]);
  const [rows, setRows] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = React.useState({
    folioNo: '',
    investorName: '',
    investorPassport: '',
    commitment: '',
    yield: '',
    registrationDate: new Date(),
    currency: ''
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
  }, []);

  useEffect(() => {
    if (location?.state?.row) {
      setFolioBody();
      console.log(location?.state?.row);
      getFolioStatement();
    }
  }, [location]);

  const setFolioBody = async () => {
    setValues({
      investorName: location?.state?.row?.folioId,
      // investorPassport: location?.state?.row?.user.passport,
      commitment: location?.state?.row?.commitment,
      yield: location?.state?.row?.yield,
      registrationDate: location?.state?.row?.date,
      folioNo: location?.state?.row?.folioNumber,
      currency: location?.state?.row?.currency
    });
    console.log(values);
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
      console.log(data);
      setRows(data.data);
      setDisplayRows(data.data);
      setLoading(false);
    } catch (e) {
      errorSwal.fire('Something went wrong', '', 'error');
      console.log(e);
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API}/api/download/folio/transaction`,
        {
          method: 'POST',
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem('token')),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            folioNumber: location?.state?.row?.folioNumber
          })
        }
      );
      let data = await response.blob();

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      //folio_number_investor_name_download_date.pdf
      console.log(values.folioNumber);
      // a.download = `${folio_number}_${investor_name}_${new Date().toLocaleDateString(
      //   'en-GB'
      // )}.pdf`;
      a.download = 'statement.pdf';
      document.body.appendChild(a);
      a.click();
      setLoading(false);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      errorSwal.fire('Something went wrong', '', 'error');
      console.log(err);
    }
    // .then((resp) => resp.blob())
    // .then((blob) => {
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.href = url;
    //   // the filename you want
    //   a.download = 'todo-1.json';
    //   document.body.appendChild(a);
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   alert('your file has downloaded!'); // or you know, something with better UX...
    // })
    // .catch(() => alert('oh no!'));
  };

  return (
    <div className="user-folio-transaction-main">
      <div>
        <AdNavbar />
      </div>
      <div className="user-folio-transaction-container">
        <div className="user-folio-transaction-header">
          <h1 className="user-folio-transaction-header-label">
            Folio Transaction{' '}
          </h1>
          <IconButton
            size="large"
            style={{ color: '#132f5e' }}
            onClick={() => {
              history.push('/dashboard');
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
        <h1 className="folio-overview">Overview</h1>
        <div className="user-folio-transaction">
          <div
            className="user-folio-transaction-row"
            style={{ borderBottom: ' 1px solid #E5E5E5' }}
          >
            <div className="user-folio-transaction-row-item">
              <div className="user-folio-transaction-row-item-label">
                Folio Number
              </div>
              <div className="user-folio-transaction-row-item-value">
                {values?.folioNo}
              </div>
            </div>

            <div className="user-folio-transaction-row-item">
              <div className="user-folio-transaction-row-item-label">
                Capital Commitment
              </div>
              <div
                className="user-folio-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {' ' + values?.commitment}
              </div>
            </div>

            <div className="user-folio-transaction-row-item">
              <div className="user-folio-transaction-row-item-label">
                Registration Date
              </div>
              <div
                className="user-folio-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {new Date(values?.registrationDate).toLocaleDateString('en-GB')}
              </div>
            </div>
            <div className="user-folio-transaction-row-item">
              <div className="user-folio-transaction-row-item-label">
                Currency
              </div>
              <div
                className="user-folio-transaction-row-item-value"
                style={{ textTransform: 'none' }}
              >
                {values.currency}
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="contained"
          style={{
            backgroundColor: 'white',
            color: 'var(--primary-color)',
            textTransform: 'none',
            width: 'fit-content',
            marginTop: '0.8rem',
            marginBottom: '1.8rem',
            height: '2.9rem'
          }}
          onClick={handleDownloadPdf}
        >
          <FileDownloadOutlinedIcon sx={{ marginRight: '10px' }} />
          Download&nbsp;Statement
        </Button>

        <CustomizedTables displayRows={displayRows} loading={loading} />
      </div>
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

export default UserFolioStatement;
