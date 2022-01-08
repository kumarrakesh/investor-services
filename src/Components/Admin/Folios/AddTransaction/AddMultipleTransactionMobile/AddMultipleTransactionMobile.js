import React, { useState, useEffect } from 'react';
import {
  Backdrop,
  CircularProgress,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import './AddMultipleTransactionMobile.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import { fontWeight } from '@mui/system';
const AddMultipleTransactionMobile = ({
  folioNumber,
  setLoading,
  errorSwal,
  successSwal,
  setDisplayRows
}) => {
  //react states
  const [multipleMobileTransactions, setMultipleMobileTransactions] = useState(
    []
  );
  const [count, setCount] = useState(1);
  //other constants
  const templateTransaction = {
    date: new Date(),
    type: '1',
    amount: 0,
    key: count + 100000,
    hasError: false
  };
  //handlers
  const handleAddNewEmptyMobileTransaction = () => {
    setMultipleMobileTransactions([
      ...multipleMobileTransactions,
      { ...templateTransaction }
    ]);
    setCount(count + 1);
  };

  const handleValidation = () => {
    let formIsValid = true;
    let testData = [...multipleMobileTransactions];
    for (let i = 0; i < testData.length; i++) {
      if (isNaN(testData[i].amount)) {
        testData[i].hasError = true;
        formIsValid = false;
      } else {
        testData[i].hasError = false;
      }
    }
    setMultipleMobileTransactions(testData);
    return formIsValid;
  };

  const handleSubmitMobileTransactions = async () => {
    try {
      if (handleValidation()) {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/add/folio/transaction`,
          {
            method: 'POST',
            body: JSON.stringify({
              folioNumber: folioNumber,
              statements: multipleMobileTransactions
            }),
            headers: {
              'x-access-token': JSON.parse(localStorage.getItem('token')),
              'Content-Type': 'application/json'
            }
          }
        );
        const data = await response.json();
        console.log(data);
        // folioDetail(data.data);
        if (!data.status)
          errorSwal.fire(
            data.message || data.error || "Couldn't add the transaction",
            '',
            'error'
          );
        else {
          successSwal.fire(
            'Transaction' +
              (multipleMobileTransactions.length > 1 ? 's' : '') +
              ' recorded!',
            '',
            'success'
          );
          setMultipleMobileTransactions([]);
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
          console.log(multipleMobileTransactions);
          // setToBeAddedStatements([]);
        }
        setLoading(false);
      } else {
        console.log('Error!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {multipleMobileTransactions.length > 0 && (
        <>
          <h3 className="folio-add-transaction-folio-statement-label">
            Fill Details of New Transaction
          </h3>
          <div className="multiple-mobile-transaction-container">
            {multipleMobileTransactions.map((transaction, index) => {
              // console.log(transaction);
              return (
                <div className="multiple-mobile-transaction-input-group">
                  <div>
                    <small className="add-folio-find-investor-label">
                      Date *
                    </small>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
                        value={transaction.date}
                        onChange={(date) => {
                          let newToBeAddedStatements = [
                            ...multipleMobileTransactions
                          ];
                          newToBeAddedStatements[index].date = date;
                          setMultipleMobileTransactions(newToBeAddedStatements);
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
                  </div>
                  <div>
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
                        value={transaction.type}
                        onChange={(e) => {
                          let newToBeAddedStatements = [
                            ...multipleMobileTransactions
                          ];
                          newToBeAddedStatements[index].type = e.target.value;
                          setMultipleMobileTransactions(newToBeAddedStatements);
                        }}
                        className="add-folio-searchbar"
                      >
                        <MenuItem value="1">Contribution</MenuItem>
                        <MenuItem value="2">Yield Payment</MenuItem>
                        <MenuItem value="3">Redemption</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                      <small className="add-folio-find-investor-label">
                        Transaction Value *
                      </small>
                      <TextField
                        required
                        id="outlined-required"
                        sx={{ width: '100%', minWidth: 70 }}
                        value={multipleMobileTransactions[index].amount}
                        inputProps={{ style: { fontSize: '1rem' } }}
                        InputLabelProps={{
                          style: { fontSize: '0.8rem' }
                        }}
                        onChange={(e) => {
                          let newToBeAddedStatements = [
                            ...multipleMobileTransactions
                          ];
                          newToBeAddedStatements[index].amount = e.target.value;
                          setMultipleMobileTransactions(newToBeAddedStatements);
                        }}
                        className="add-folio-searchbar"
                      />
                      {transaction.hasError && (
                        <small className="input-field-helper-text">
                          Enter only digits!
                        </small>
                      )}
                    </FormControl>
                  </div>
                  {/* <FormControl variant="standard" sx={{ width: '100%' }}>
                      <small className="add-folio-find-investor-label">Date *</small>
                      <TextField
                        required
                        type="date"
                        id="outlined-required"
                        sx={{ width: '100%', minWidth: 70 }}
                        value={transaction.date}
                        inputProps={{ style: { fontSize: '1rem' } }}
                        InputLabelProps={{
                          style: { fontSize: '0.8rem' }
                        }}
                        onChange={(e) => {
                          let newToBeAddedStatements = [
                            ...multipleMobileTransactions
                          ];
                          newToBeAddedStatements[index].amount = e.target.value;
                          setMultipleMobileTransactions(newToBeAddedStatements);
                        }}
                        className="add-folio-searchbar"
                      />
                      {transaction.hasError && (
                        <small className="input-field-helper-text">
                          Enter only digits!
                        </small>
                      )}
                    </FormControl> */}
                  <Button
                    variant="contained"
                    style={{
                      color: 'hsl(0deg,30%,70%)',
                      borderBottom: '1px solid hsl(0deg,30%,70%)',
                      fontSize: '1rem',
                      textTransform: 'none',
                      width: 'fit-content',
                      borderRadius: '0px',
                      marginTop: '1.5rem',
                      boxShadow: 'none',
                      fontWeight: 700,
                      background: 'none',
                      padding: 0
                    }}
                    // onClick={handleSubmitMobileTransactions}
                    onClick={() => {
                      let k = [...multipleMobileTransactions];
                      let k1 = k.slice(0, index);
                      let k2 = k.slice(index + 1, k.length);
                      setMultipleMobileTransactions([...k1, ...k2]);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="multiple-mobile-transaction-footer">
            <Button
              variant="contained"
              style={{
                color: 'var(--primary-color)',
                backgroundColor: 'white',
                border: '1px solid var(--primary-color)',
                fontSize: '14px',
                textTransform: 'none',
                width: '50%',
                borderRadius: '4px',
                margin: '1.5rem 0px',
                boxShadow: 'none',
                fontWeight: 500
              }}
              onClick={handleAddNewEmptyMobileTransaction}
            >
              Add New Transaction
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                fontSize: '1rem',
                textTransform: 'none',
                width: '50%',
                borderRadius: '4px',
                margin: '1.5rem 0px',
                boxShadow: 'none',
                fontWeight: 700
              }}
              onClick={handleSubmitMobileTransactions}
            >
              Submit
            </Button>
          </div>
        </>
      )}

      {!multipleMobileTransactions.length && (
        <Button
          variant="contained"
          style={{
            color: 'var(--primary-color)',
            backgroundColor: 'white',
            border: '1px solid var(--primary-color)',
            fontSize: '1rem',
            textTransform: 'none',
            width: '100%',
            borderRadius: '4px',
            margin: '1.5rem 0px',
            boxShadow: 'none'
          }}
          onClick={handleAddNewEmptyMobileTransaction}
        >
          Add New Transaction
        </Button>
      )}
    </div>
  );
};

export default AddMultipleTransactionMobile;
