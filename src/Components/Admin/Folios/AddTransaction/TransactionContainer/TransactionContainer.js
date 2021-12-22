import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import CustomizedTables from '../table';
import Swal from 'sweetalert2';
import { Backdrop, CircularProgress } from '@mui/material';
import '../FolioAddTransaction.css';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import useWindowSize from '../../../../../utils/useWindowSize';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
const TransactionContainer = () => {
  const location = useLocation();
  const size = useWindowSize();
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
  const [folioDetail, setFolioDetail] = useState({});
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
        errorSwal.fire('something went wrong', '', 'error');
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
          <div className="folio-add-transaction-row-item">
            <div className="folio-add-transaction-row-item-label">
              Yield (%)
            </div>
            <div className="folio-add-transaction-row-item-value">
              {values.yield}
            </div>
          </div>
        </div>

        <div
          className="folio-add-transaction-row"
          // style={{ borderBottom: ' 1px solid #E5E5E5' }}
        >
          <div className="folio-add-transaction-row-item">
            <div className="folio-add-transaction-row-item-label">
              Capital Commitment
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
              Pending Amount
            </div>
            <div
              className="folio-add-transaction-row-item-value"
              style={{ textTransform: 'none' }}
            >
              {Object.keys(folioDetail).length === 0
                ? values.commitment - values.contribution
                : folioDetail.commitment - folioDetail.contribution}
            </div>
          </div>
          <div className="folio-add-transaction-row-item">
            <div className="folio-add-transaction-row-item-label">Currency</div>
            <div className="folio-add-transaction-row-item-value">
              {values.currency || 'USD'}
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
          width: '22%',
          marginTop: '1.2rem',
          marginBottom: '0.8rem',
          height: '2.9rem'
        }}
        onClick={handleDownloadPdf}
      >
        <FileDownloadOutlinedIcon sx={{ marginRight: '10px' }} />
        Download Statement
      </Button>

      <h3 className="folio-add-transaction-folio-statement-label">
        Folio Statement
      </h3>

      <CustomizedTables
        setDisplayRows={setDisplayRows}
        displayRows={displayRows}
        loading={loading}
        values={values}
        setLoading={setLoading}
        folioDetail={setFolioDetail}
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
