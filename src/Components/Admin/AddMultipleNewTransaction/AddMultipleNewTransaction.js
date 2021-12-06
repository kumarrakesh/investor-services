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
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import { styled } from '@mui/material/styles';
import './AddMultipleNewTransaction.css';
import Swal from 'sweetalert2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F6F8FA !important',
    color: 'var(--secondary-color)',
    padding: '1rem',
    fontSize: '14px',
    fontWeight: 700,
    borderBottom: '1px solid #CECECE'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'var(--secondary-color)',
    padding: '0.6rem',
    border: 'none'
  }
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white !important',
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
  setDisplayRows
}) => {
  //states
  const [toBeAddedStatements, setToBeAddedStatements] = useState([]);
  //other hooks
  //handers
  const handleShowAddMultipleNewTransaction = async () => {
    setToBeAddedStatements([
      ...toBeAddedStatements,
      { type: '1', date: new Date(), amount: 0 }
    ]);
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
  setDisplayRows
}) => {
  const tableRef = React.createRef();
  const handleDateChange = (params) => {
    console.log(params);
    // setSelectedDate(newValue);
  };

  const handlePostMultipleTransactions = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/add/folio/transaction`,
      {
        method: 'POST',
        body: JSON.stringify({ folioNumber, statements: toBeAddedStatements }),
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('token')),
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    console.log(data);
    if (!data.status)
      Swal.fire(
        data.message || data.error || "Couldn't add the transaction",
        '',
        'error'
      );
    else {
      Swal.fire(
        'Transaction' + toBeAddedStatements.length > 1 ? 's' : '' + 'noted!',
        '',
        'success'
      );
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
            <StyledTableRow key={index} sx={{ verticalAlign: 'top' }}>
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
                  <MobileDatePicker
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
                        inputProps={{ style: { fontSize: '0.9rem' } }}
                        InputLabelProps={{
                          style: { fontSize: '0.8rem' }
                        }}
                        {...params}
                        sx={{
                          width: '100%',
                          minWidth: 95,
                          fontSize: '0.1rem !important',
                          padding: '1px'
                        }}
                        className="add-folio-searchbar"
                      />
                    )}
                  />
                </LocalizationProvider>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                component="th"
                scope="row"
                style={{ fontSize: '0.9rem' }}
                sx={{
                  paddingLeft: '3px',
                  paddingRight: '3px'
                }}
              >
                <small className="add-folio-find-investor-label">
                  Transaction type
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
                <small className="add-folio-find-investor-label">
                  Transaction Value *
                </small>
                <TextField
                  required
                  type="number"
                  id="outlined-required"
                  sx={{ width: '100%', minWidth: 70 }}
                  value={toBeAddedStatements[index].investorPassportNumber}
                  inputProps={{ style: { fontSize: '0.9rem' } }}
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'right',
                    marginTop: '0.5rem'
                  }}
                >
                  <button
                    onClick={() => {
                      let newToBeAddedStatements = [...toBeAddedStatements];
                      newToBeAddedStatements.splice(index, 1);
                      setToBeAddedStatements(newToBeAddedStatements);
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
