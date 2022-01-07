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
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TextField,
  Paper,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F6F8FA !important',
    color: 'var(--secondary-color)',
    padding: '0.75rem',
    fontSize: '14px',
    fontWeight: 700,
    borderBottom: '1px solid #CECECE'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'var(--secondary-color)',
    padding: '0.6rem 0.75rem',
    border: 'none'
  }
}));
// border: '1px solid black'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
    border: 'none !important',
    outline: 'none'
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F8FA',
    border: 'none !important',
    outline: 'none'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 'none !important',
    outline: 'none'
  }
}));
const TransactionContainer = () => {
  const location = useLocation();
  const size = useWindowSize();
  const tableRef = React.createRef();

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
    contribution: '',
    currency: ''
  });

  const [rows, setRows] = useState([]);
  const [folioDetail, setFolioDetail] = useState({});
  const token = JSON.parse(localStorage.getItem('token'));
  const history = useHistory();
  const [toBeAddedStatements, setToBeAddedStatements] = useState({
    date: history.location.state.row?.editHistory?.length
      ? history.location.state.row?.editHistory?.[
          history.location.state.row.editHistory.length - 1
        ]?.date
      : history.location.state.row?.date,
    type: history.location.state.row?.editHistory?.length
      ? history.location.state.row?.editHistory?.[
          history.location.state.row.editHistory.length - 1
        ]?.type
      : history.location.state.row?.type,
    amount: history.location.state.row?.editHistory?.length
      ? history.location.state.row?.editHistory?.[
          history.location.state.row.editHistory.length - 1
        ]?.amount
      : history.location.state.row?.amount
  });
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
      contribution: location?.state?.row?.contribution,
      currency: location?.state?.row?.currency
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

  const handleSubmitEditTransaction = async () => {
    let hasNarrationError = false;
    let hasError = false;
    if (
      isNaN(toBeAddedStatements.amount) ||
      !String(toBeAddedStatements.amount).length
    )
      hasError = true;

    if (
      !toBeAddedStatements.narration ||
      !toBeAddedStatements.narration?.length
    )
      hasNarrationError = true;

    setToBeAddedStatements({
      ...toBeAddedStatements,
      hasNarrationError,
      hasError
    });
    if (hasNarrationError || hasError) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/edit/folio/transaction`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },

          body: JSON.stringify({
            transactionId: location?.state?.row?._id,
            type: toBeAddedStatements.type,
            amount: toBeAddedStatements.amount,
            narration: toBeAddedStatements.narration,
            date: toBeAddedStatements.date
          })
        }
      );
      const data = await response.json();
      if (data.status) {
        successSwal.fire('Transaction Updated', '', 'success');
        setLoading(false);
        history.push({
          pathname: '/admin/folioStatements/viewDetail',
          state: {
            from: history.location.state.from,
            row: history.location.state.folio
          }
        });
        setToBeAddedStatements({});
      } else {
        errorSwal.fire('something went wrong', '', 'error');
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      location?.state?.row &&
      history.location.pathname != '/admin/folios/editTransaction'
    ) {
      setFolioBody();
      // console.log(location?.state?.row);
    } else if (history.location.pathname == '/admin/folios/editTransaction') {
      let data = history.location.state.row?.editHistory?.length
        ? history.location.state.row?.editHistory?.[
            history.location.state.row.editHistory.length - 1
          ]
        : history.location.state.row;
      setToBeAddedStatements({
        date: data.date,
        type: String(data.type),
        amount: data.amount
      });
    }
  }, [location]);

  useEffect(() => {
    if (history.location.pathname != '/admin/folios/editTransaction') {
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
    }
  }, []);

  return (
    <div className="folio-transaction-container-main">
      {history.location.pathname != '/admin/folios/editTransaction' && (
        <>
          {size.width > 768 ? (
            <div className="folio-add-transaction">
              <h3 className="folio-add-transaction-heading">
                Investor Details
              </h3>
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
                    {new Date(values.registrationDate).toLocaleDateString(
                      'en-GB'
                    )}
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
                  <div className="folio-add-transaction-row-item-label">
                    Currency
                  </div>
                  <div className="folio-add-transaction-row-item-value">
                    {values.currency}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="folio-add-transaction" id="folio-summary-div">
              <h3 className="folio-add-transaction-heading">
                Investor Details
              </h3>
              <div className="folio-add-transaction-row">
                <div className="folio-add-transaction-row-item">
                  <div className="folio-add-transaction-row-item-label">
                    Investor Name
                  </div>
                  <div className="folio-add-transaction-row-item-value">
                    {values.investorName}
                  </div>
                </div>

                <div
                  className="folio-add-transaction-row-item"
                  id="folio-add-item-right"
                >
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
              </div>

              <div className="folio-add-transaction-row">
                <div className="folio-add-transaction-row-item">
                  <div className="folio-add-transaction-row-item-label">
                    Registration Date
                  </div>
                  <div
                    className="folio-add-transaction-row-item-value"
                    style={{ textTransform: 'none' }}
                  >
                    {new Date(values.registrationDate).toLocaleDateString(
                      'en-GB'
                    )}
                  </div>
                </div>
                <div
                  className="folio-add-transaction-row-item"
                  id="folio-add-item-right"
                >
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

                <div
                  className="folio-add-transaction-row-item"
                  id="folio-add-item-right"
                >
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
              </div>

              <div
                className="folio-add-transaction-row"
                // style={{ borderBottom: ' 1px solid #E5E5E5' }}
              >
                <div className="folio-add-transaction-row-item">
                  <div className="folio-add-transaction-row-item-label">
                    Currency
                  </div>
                  <div className="folio-add-transaction-row-item-value">
                    {values.currency}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="folio-add-transaction-folio-statement-label">
            <Button
              variant="contained"
              style={{
                backgroundColor: 'white',
                color: 'var(--primary-color)',
                textTransform: 'none',
                width: size.width > 768 ? '22%' : '60%',
                marginTop: '1.2rem',
                marginBottom: '0.8rem',
                height: '2.9rem'
              }}
              onClick={handleDownloadPdf}
            >
              <FileDownloadOutlinedIcon sx={{ marginRight: '10px' }} />
              Download Statement
            </Button>
          </div>
        </>
      )}
      {history.location.pathname == '/admin/folios/editTransaction' && (
        <TableContainer
          sx={{
            maxHeight: '30vh',
            borderRadius: 2,
            padding: '1rem'
          }}
          component={Paper}
          style={{ boxShadow: '0px 0px 0px 1px #CECECE' }}
        >
          <Table
            stickyHeader
            sx={{
              minWidth: 700,
              overflow: 'scroll'
            }}
            aria-label="customized table"
            ref={tableRef}
          >
            <TableBody>
              <StyledTableRow sx={{ verticalAlign: 'top' }}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{
                    paddingLeft: '3px',
                    paddingRight: '3px'
                  }}
                >
                  <small className="add-folio-find-investor-label">
                    Date *
                  </small>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      value={toBeAddedStatements.date}
                      onChange={(date) => {
                        let newToBeAddedStatements = {
                          ...toBeAddedStatements
                        };
                        newToBeAddedStatements.date = date;
                        setToBeAddedStatements(newToBeAddedStatements);
                        //   console.log('here', date);
                      }}
                      disableCloseOnSelect={false}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          className="add-folio-searchbar"
                          sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: '#132f5e',
                            svg: 'var(--primary-color)'
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  component="th"
                  scope="row"
                  style={{ fontSize: '0.89rem' }}
                  sx={{
                    paddingLeft: '3px',
                    paddingRight: '3px'
                  }}
                >
                  <small className="add-folio-find-investor-label">
                    Transaction type*
                  </small>
                  <FormControl
                    variant="standard"
                    sx={{ width: '100%', minWidth: 100, color: 'red' }}
                  >
                    <Select
                      required
                      name="action"
                      variant="outlined"
                      value={toBeAddedStatements.type}
                      onChange={(e) => {
                        let newToBeAddedStatements = {
                          ...toBeAddedStatements
                        };
                        newToBeAddedStatements.type = e.target.value;
                        setToBeAddedStatements(newToBeAddedStatements);
                      }}
                      className="add-folio-searchbar"
                    >
                      <MenuItem value="1">Contribution</MenuItem>
                      <MenuItem value="2">Yield Payment</MenuItem>
                      <MenuItem value="3">Redemption</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  component="th"
                  scope="row"
                  sx={{
                    paddingLeft: '3px',
                    paddingRight: '3px',
                    verticalAlign: 'top'
                  }}
                >
                  <FormControl variant="standard" sx={{ width: '100%' }}>
                    <small className="add-folio-find-investor-label">
                      Transaction Value *
                    </small>
                    <TextField
                      required
                      id="outlined-required"
                      sx={{ width: '100%', minWidth: 70 }}
                      value={toBeAddedStatements.amount}
                      inputProps={{ style: { fontSize: '1rem' } }}
                      InputLabelProps={{
                        style: { fontSize: '0.8rem' }
                      }}
                      onChange={(e) => {
                        let newToBeAddedStatements = {
                          ...toBeAddedStatements
                        };
                        newToBeAddedStatements.amount = e.target.value;
                        setToBeAddedStatements(newToBeAddedStatements);
                      }}
                      onKeyPress={(e) => {
                        // if key is enter
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSubmitEditTransaction();
                        }
                      }}
                      className="add-folio-searchbar"
                    />
                    {toBeAddedStatements.hasError && (
                      <small className="input-field-helper-text">
                        Please provide a number *
                      </small>
                    )}
                  </FormControl>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'right',
                      marginTop: '0.5rem'
                    }}
                  ></div>
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  component="th"
                  scope="row"
                  sx={{
                    paddingLeft: '3px',
                    paddingRight: '3px',
                    verticalAlign: 'top'
                  }}
                >
                  <FormControl variant="standard" sx={{ width: '100%' }}>
                    <small className="add-folio-find-investor-label">
                      Narration *
                    </small>
                    <TextField
                      required
                      id="outlined-required"
                      sx={{ width: '100%', minWidth: 70 }}
                      value={toBeAddedStatements.narration}
                      inputProps={{ style: { fontSize: '1rem' } }}
                      InputLabelProps={{
                        style: { fontSize: '0.8rem' }
                      }}
                      onChange={(e) => {
                        let newToBeAddedStatements = {
                          ...toBeAddedStatements
                        };
                        newToBeAddedStatements.narration = e.target.value;
                        setToBeAddedStatements(newToBeAddedStatements);
                      }}
                      onKeyPress={(e) => {
                        // if key is enter
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSubmitEditTransaction();
                        }
                      }}
                      className="add-folio-searchbar"
                    />
                    {toBeAddedStatements.hasNarrationError && (
                      <small className="input-field-helper-text">
                        This field is required*
                      </small>
                    )}
                  </FormControl>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'right',
                      marginTop: '0.5rem'
                    }}
                  ></div>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'right',
              padding: '1rem'
            }}
          >
            <Button
              variant="outlined"
              onClick={handleSubmitEditTransaction}
              className="submit-multiple-new-transaction-button"
            >
              Submit
            </Button>
          </div>
        </TableContainer>
      )}
      {history.location.pathname == '/admin/folios/editTransaction' ? (
        <h3 className="folio-add-transaction-folio-statement-label">
          Transaction History
        </h3>
      ) : (
        <h3 className="folio-add-transaction-folio-statement-label">
          Folio Statement
        </h3>
      )}
      {history.location.pathname == '/admin/folios/editTransaction' ? (
        <CustomizedTables
          setDisplayRows={setDisplayRows}
          displayRows={location?.state?.row || []}
          loading={loading}
          values={values}
          setLoading={setLoading}
          folioDetail={setFolioDetail}
        />
      ) : size.width > 768 ? (
        <CustomizedTables
          setDisplayRows={setDisplayRows}
          displayRows={displayRows}
          loading={loading}
          values={values}
          setLoading={setLoading}
          folioDetail={setFolioDetail}
        />
      ) : (
        <div className="transaction-card-mobile-container">
          {displayRows?.map((row) => {
            console.log(row);
            return (
              <div className="transaction-card-mobile" key={row._id}>
                <div className="transaction-card-mobile-header-top">
                  <div className="transaction-card-mobile-header-folio-date">
                    {new Date(row.date).toLocaleDateString('en-GB')}
                  </div>
                </div>

                <div className="transaction-card-mobile-header">
                  <div className="transaction-card-mobile-header-name">
                    {row.type == 1
                      ? 'Capital Contribution'
                      : row.type == 2
                      ? 'Yield Payment'
                      : 'Redemption'}
                  </div>

                  <div>{row.amount}</div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '0.5rem'
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      color: 'var(--primary-color)',
                      backgroundColor: 'white',
                      border: '1px solid var(--primary-color)',
                      fontSize: '0.8rem',
                      padding: '0.4rem 2rem',
                      textTransform: 'none'
                    }}
                    onClick={() => {
                      history.push({
                        pathname: '/admin/folios/editTransaction',
                        state: {
                          row: row,
                          from: history.location.pathname,
                          folio: history.location.state.row
                        }
                      });
                    }}
                  >
                    Edit Transaction
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

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

export default TransactionContainer;
