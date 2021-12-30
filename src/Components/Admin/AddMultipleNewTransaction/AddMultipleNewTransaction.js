import React, { useState, useEffect } from 'react';
import {
  Button,
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import { styled } from '@mui/material/styles';
import './AddMultipleNewTransaction.css';
import Swal from 'sweetalert2';
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
const AddMultipleNewTransaction = ({
  handleAddNewFolioTransaction,
  folioNumber,
  setDisplayRows,
  folioDetail,
  setLoading
}) => {
  //states
  const [toBeAddedStatements, setToBeAddedStatements] = useState([]);
  const [count, setCount] = useState(0);
  const [contribution, setContribution] = useState();
  //other hooks
  //handers
  const handleShowAddMultipleNewTransaction = async () => {
    setToBeAddedStatements([
      ...toBeAddedStatements,
      {
        type: '1',
        date: new Date(),
        amount: 0,
        key: count + 100000,
        hasError: false
      }
    ]);
    setCount(count + 1);
  };

  return (
    <>
      {toBeAddedStatements.length > 0 && (
        <div className="new-transaction-heading">
          Fill details of new transaction
        </div>
      )}
      <div
        className="add-multiple-new-transaction-container"
        style={{
          justifyContent: toBeAddedStatements.length == 0 ? 'right' : 'center'
        }}
      >
        {toBeAddedStatements.length == 0 && (
          <Button
            variant="outlined"
            onClick={handleShowAddMultipleNewTransaction}
            className="add-multiple-new-transaction-button"
          >
            Add New Transaction
          </Button>
        )}
        {toBeAddedStatements.length > 0 && (
          <div style={{ marginTop: '1rem', width: '100%' }}>
            <AddMultipleNewTransactionTable
              toBeAddedStatements={toBeAddedStatements}
              setToBeAddedStatements={setToBeAddedStatements}
              handleShowAddMultipleNewTransaction={
                handleShowAddMultipleNewTransaction
              }
              folioNumber={folioNumber}
              setDisplayRows={setDisplayRows}
              folioDetail={folioDetail}
              setLoading={setLoading}
            />
          </div>
        )}
      </div>
    </>
  );
};

export const AddMultipleNewTransactionTable = ({
  toBeAddedStatements,
  setToBeAddedStatements,
  handleShowAddMultipleNewTransaction,
  folioNumber,
  setDisplayRows,
  folioDetail,
  setLoading
}) => {
  const tableRef = React.createRef();
  const handleDateChange = (params) => {
    console.log(params);
    // setSelectedDate(newValue);
  };

  const handleValidation = () => {
    let formIsValid = true;
    let testData = [...toBeAddedStatements];
    for (let i = 0; i < testData.length; i++) {
      if (isNaN(testData[i].amount)) {
        testData[i].hasError = true;
        formIsValid = false;
      } else {
        testData[i].hasError = false;
      }
    }
    setToBeAddedStatements(testData);
    return formIsValid;
  };

  const handlePostMultipleTransactions = async () => {
    if (handleValidation()) {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/add/folio/transaction`,
        {
          method: 'POST',
          body: JSON.stringify({
            folioNumber,
            statements: toBeAddedStatements
          }),
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem('token')),
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      console.log(data);
      folioDetail(data.data);
      if (!data.status)
        errorSwal.fire(
          data.message || data.error || "Couldn't add the transaction",
          '',
          'error'
        );
      else {
        successSwal.fire(
          'Transaction' +
            (toBeAddedStatements.length > 1 ? 's' : '') +
            ' recorded!',
          '',
          'success'
        );
        setToBeAddedStatements([]);
        const response1 = await fetch(
          `${process.env.REACT_APP_API}/api/get/folio/transaction`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
              folioNumber
            })
          }
        );
        const data1 = await response1.json();
        // console.log('fg' + data1);
        setDisplayRows(data1.data);
        console.log(toBeAddedStatements);
        // setToBeAddedStatements([]);
      }
      setLoading(false);
    } else {
      console.log('Error!');
    }
  };
  return (
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
          {toBeAddedStatements.map((row, index) => (
            <StyledTableRow sx={{ verticalAlign: 'top' }} key={row.key}>
              <StyledTableCell
                component="th"
                scope="row"
                sx={{
                  paddingLeft: '3px',
                  paddingRight: '3px'
                }}
              >
                <small className="add-folio-find-investor-label">Date *</small>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={row.date}
                    onChange={(date) => {
                      let newToBeAddedStatements = [...toBeAddedStatements];
                      newToBeAddedStatements[index].date = date;
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
                    value={row.type}
                    onChange={(e) => {
                      let newToBeAddedStatements = [...toBeAddedStatements];
                      newToBeAddedStatements[index].type = e.target.value;
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
                    value={toBeAddedStatements[index].investorPassportNumber}
                    inputProps={{ style: { fontSize: '1rem' } }}
                    InputLabelProps={{
                      style: { fontSize: '0.8rem' }
                    }}
                    onChange={(e) => {
                      let newToBeAddedStatements = [...toBeAddedStatements];
                      newToBeAddedStatements[index].amount = e.target.value;
                      setToBeAddedStatements(newToBeAddedStatements);
                    }}
                    className="add-folio-searchbar"
                  />
                  {row.hasError && (
                    <small className="input-field-helper-text">
                      Enter only digits!
                    </small>
                  )}
                </FormControl>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'right',
                    marginTop: '0.5rem'
                  }}
                >
                  <button
                    onClick={() => {
                      let k = [...toBeAddedStatements];
                      let k1 = k.slice(0, index);
                      let k2 = k.slice(index + 1, k.length);
                      setToBeAddedStatements([...k1, ...k2]);
                    }}
                    style={{
                      color: 'var(--secondary-color)',
                      fontSize: '0.9rem',
                      border: 'none',
                      background: 'none',
                      textDecoration: 'underline'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
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
          onClick={handleShowAddMultipleNewTransaction}
          className="add-multiple-new-transaction-button"
        >
          Add New Transaction
        </Button>
        <Button
          variant="outlined"
          onClick={handlePostMultipleTransactions}
          className="submit-multiple-new-transaction-button"
        >
          Submit
        </Button>
      </div>
    </TableContainer>
  );
};

export default AddMultipleNewTransaction;
