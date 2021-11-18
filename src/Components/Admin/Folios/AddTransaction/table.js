import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from 'material-ui-search-bar';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import {
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
  FormHelperText
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
  values
}) {
  //states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newData, setNewData] = useState({
    date: new Date(),
    type: 1,
    amount: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [gotName, setGotName] = useState(false);
  const [investorName, setInvestorName] = useState('');
  //other hooks

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
      userId: values.investorPassport,
      folioId: values.folioId,
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
      if (!data.status)
        Swal.fire(
          data.message || data.error || "Could'nt add the transaction",
          '',
          'error'
        );
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
              folioId: values.folioId
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
                <StyledTableCell align="left">Transaction Type</StyledTableCell>
                <StyledTableCell align="left">Contribution</StyledTableCell>
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
                      {row.type == 1 ? row.amount : '-'}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.type == 2 ? row.amount : '-'}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.type == 3 ? row.amount : '-'}
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {isEditing ? (
        <Button
          variant="contained"
          onClick={handlePostNewFolioTransaction}
          style={{
            backgroundColor:
              !newData.date || !newData.type || !newData.amount
                ? 'gray'
                : '#E95B3E',
            textTransform: 'none',
            marginTop: 10,
            width: '100%',
            padding: '10px 0'
          }}
          disabled={!newData.date || !newData.type || !newData.amount}
        >
          Submit
          <AddIcon sx={{ marginLeft: '10px' }} />
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleAddNewFolioTransaction}
          style={{
            backgroundColor: '#E95B3E',
            textTransform: 'none',
            marginTop: 10,
            width: '100%',
            padding: '10px 0'
          }}
        >
          Add New Folio Transaction
          <AddIcon sx={{ marginLeft: '10px' }} />
        </Button>
      )}
    </>
  );
}
