import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SearchBar from 'material-ui-search-bar';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import {
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
  FormHelperText,
  FormControl
} from '@mui/material';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E6E8EA !important',
    color: 'var(--secondary-color)'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'var(--secondary-color)'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white !important'
  },
  '&:nth-of-type(even)': {
    backgroundColor: 'var(--light-blue-bg)'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function CustomizedTables({
  displayRows,
  setDisplayRows,
  loading,
  setLoading,
  folioId,
  invPassport
}) {
  // const [rows, setRows] = useState(originalRows);
  const history = useHistory();
  const [searched, setSearched] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newData, setNewData] = useState({
    date: new Date(),
    type: 1,
    amount: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [gotName, setGotName] = useState(false);
  const [investorName, setInvestorName] = useState('');
  //handlers

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };
  const handleAddNewFolioTransaction = () => {
    console.log(displayRows);
    setDisplayRows([
      ...displayRows,
      {
        role: 'new',
        userId: newData.investorPassportNumber,
        folioId: newData.folioId,
        type: '1',
        amount: '300',
        date: new Date(),
        narration: 'invest Money'
      }
    ]);
    // setIsEditing(true);
    setIsEditing(true);
  };
  const handlePostNewFolioTransaction = async () => {
    setLoading(true);

    let folioData = {
      userId: invPassport,
      folioId: folioId,
      type: newData.type,
      amount: newData.amount,
      date: selectedDate
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/add/folio/transaction`,
        {
          method: 'POST',
          body: JSON.stringify({ ...folioData }),
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem('token')),
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.status) Swal.fire("Could'nt add the transaction", '', 'error');
      else {
        Swal.fire('Transaction noted!', '', 'success');
        const response1 = await fetch(
          `${process.env.REACT_APP_API}/api/get/folio/transaction`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
              folioId: folioId
            })
          }
        );
        const data1 = await response1.json();
        // console.log('fg' + data1);
        setDisplayRows(data1.data);
        setIsEditing(false);
        setNewData({
          date: new Date(),
          type: 1,
          amount: null
        });
      }
    } catch (err) {
      Swal.fire('Some error occured', '', 'error');
    }
    setLoading(false);
  };
  const handlePostNewFolio = async () => {
    setLoading(true);
    let folioData = {
      userId: newData.investorPassportNumber,
      folioName: newData.folioName,
      commitment: newData.capitalCommitment,
      yield: newData.yield,
      date: selectedDate
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/add/folio`,
        {
          method: 'POST',
          body: JSON.stringify({ ...folioData }),
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem('token')),
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.status) Swal.fire(data.message, '', 'error');
      else {
        Swal.fire(data.message, '', 'success');
        const response1 = await fetch(
          `${process.env.REACT_APP_API}/api/all/folio`,
          {
            method: 'POST',
            headers: {
              'x-access-token': JSON.parse(localStorage.getItem('token'))
            }
          }
        );
        const data1 = await response1.json();
        console.log('fg' + data1);
        setDisplayRows(data1.data);
        setGotName(false);
        setNewData({
          investorPassportNumber: '',
          investorName: '',
          capitalCommitment: null,
          folioName: '',
          yield: null
        });
      }
    } catch (err) {
      Swal.fire('Some error occured', '', 'error');
    }
    setLoading(false);
  };
  return (
    <>
      <Paper>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '300px'
          }}
        >
          <Table aria-label="customized table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date Added</StyledTableCell>
                <StyledTableCell align="center">
                  Transaction Type
                </StyledTableCell>
                <StyledTableCell>Contribution</StyledTableCell>
                <StyledTableCell align="center">Distribution</StyledTableCell>
                <StyledTableCell align="center">Withdrawl</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!displayRows.length && (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {loading ? 'Loading...' : 'No transactions...'}
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {displayRows.map((row) =>
                row.role == 'new' ? (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          label="Date"
                          inputFormat="dd/MM/yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
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
                    <StyledTableCell align="left" component="th" scope="row">
                      {/* {row.type == 1
                        ? 'Invested'
                        : row.type == 2
                        ? 'Yielded'
                        : 'Withdrawn'} */}
                      <FormControl variant="standard" sx={{ width: '100%' }}>
                        <Select
                          name="action"
                          variant="outlined"
                          value={newData.type}
                          onChange={(e) => {
                            setNewData({
                              ...newData,
                              type: e.target.value
                            });
                          }}
                        >
                          <MenuItem value="1">Contribution</MenuItem>
                          <MenuItem value="2">Yield Payment</MenuItem>
                          <MenuItem value="3">Redemption</MenuItem>
                        </Select>
                      </FormControl>
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {newData.type == 1 ? (
                        <TextField
                          required
                          type="number"
                          id="outlined-required"
                          sx={{ minWidth: 70 }}
                          value={newData.amount}
                          inputProps={{ style: { fontSize: '0.9rem' } }}
                          InputLabelProps={{
                            style: { fontSize: '0.8rem' }
                          }}
                          onChange={(e) => {
                            setNewData({
                              ...newData,
                              amount: e.target.value
                            });
                          }}
                          label="Amount"
                        />
                      ) : (
                        '-'
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {newData.type == 2 ? (
                        <TextField
                          required
                          id="outlined-required"
                          sx={{ minWidth: 70 }}
                          value={newData.amount}
                          inputProps={{ style: { fontSize: '0.9rem' } }}
                          InputLabelProps={{
                            style: { fontSize: '0.8rem' }
                          }}
                          onChange={(e) => {
                            setNewData({
                              ...newData,
                              amount: e.target.value
                            });
                          }}
                          label="Amount"
                        />
                      ) : (
                        '-'
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {newData.type == 3 ? (
                        <TextField
                          required
                          id="outlined-required"
                          sx={{ minWidth: 70 }}
                          value={newData.amount}
                          inputProps={{ style: { fontSize: '0.9rem' } }}
                          InputLabelProps={{
                            style: { fontSize: '0.8rem' }
                          }}
                          onChange={(e) => {
                            setNewData({
                              ...newData,
                              amount: e.target.value
                            });
                          }}
                          label="Amount"
                        />
                      ) : (
                        '-'
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {new Date(row.date).toLocaleDateString('en-GB')}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.type == 1
                        ? 'Contribution'
                        : row.type == 2
                        ? 'Yield Payment'
                        : 'Redemtion'}
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {row.type == 1 ? '-' + row.amount : '-'}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.type == 2 ? '+' + row.amount : '-'}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.type == 3 ? '+' + row.amount : '-'}
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
              {/* {displayRows.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {new Date(row.date).toLocaleDateString('en-GB')}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.type == 1
                      ? 'Invested'
                      : row.type == 2
                      ? 'Yielded'
                      : 'Withdrawn'}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.type == 1 ? row.amount : '-'}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.type == 2 ? row.amount : '-'}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.type == 3 ? row.amount : '-'}
                  </StyledTableCell>
                </StyledTableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <Button
        variant="contained"
        onClick={handleAddNewFolioTransaction}
        style={{
          textTransform: 'none',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          padding: '1rem'
        }}
      >
        Record New Transaction
      </Button> */}
      {isEditing ? (
        <Button
          variant="contained"
          onClick={handlePostNewFolioTransaction}
          style={{
            backgroundColor:
              !newData.date || !newData.type || !newData.amount || !folioId
                ? 'gray'
                : '#E95B3E',
            textTransform: 'none',
            marginTop: 10,
            width: '100%',
            padding: '10px 0'
          }}
          disabled={
            !newData.date || !newData.type || !newData.amount || !folioId
          }
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleAddNewFolioTransaction}
          disabled={!folioId}
          style={{
            backgroundColor: '#E95B3E',
            textTransform: 'none',
            marginTop: 10,
            width: '100%',
            padding: '10px 0'
          }}
        >
          Add New Folio Transaction
        </Button>
      )}
    </>
  );
}
