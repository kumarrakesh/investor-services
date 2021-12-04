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
    padding: '0.6rem 1rem',
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
const AddMultipleNewTransaction = ({ handleAddNewFolioTransaction }) => {
  //states
  const [toBeAddedStatements, setToBeAddedStatements] = useState([]);
  //other hooks
  //handers
  const handleShowAddMultipleNewTransaction = async () => {
    setToBeAddedStatements([...toBeAddedStatements, {}]);
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
  handleShowAddMultipleNewTransaction
}) => {
  const tableRef = React.createRef();
  const handleDateChange = (params) => {
    console.log(params);
    // setSelectedDate(newValue);
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
            <StyledTableRow key={index}>
              <StyledTableCell
                component="th"
                scope="row"
                sx={{
                  paddingLeft: '3px',
                  paddingRight: '3px'
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Date"
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
                      />
                    )}
                  />
                </LocalizationProvider>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                component="th"
                scope="row"
                style={{ fontSize: '0.6rem' }}
                sx={{
                  paddingLeft: '3px',
                  paddingRight: '3px'
                }}
              >
                <FormControl
                  variant="standard"
                  sx={{ width: '100%', minWidth: 100 }}
                >
                  <Select
                    required
                    name="action"
                    variant="outlined"
                    value={row.type}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
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
                  paddingRight: '3px'
                }}
              >
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
                    // setNewData({
                    //   ...newData,
                    //   investorPassportNumber: e.target.value
                    // });
                  }}
                  label="Transaction Value"
                />
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
          onClick={() => {}}
          className="submit-multiple-new-transaction-button"
        >
          Submit
        </Button>
      </div>
    </TableContainer>
  );
};

export default AddMultipleNewTransaction;
