import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Swal from 'sweetalert2';

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
  setUpdate,
  setLoading,
  loading
}) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({ amount: '' });
  const [dialogData, setDialogData] = useState({});

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleClickOpen = (row) => {
    setDialogData(row);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setOpen(false);

    const response = await fetch(
      'https://investorbackend.herokuapp.com/api/update/fund',
      {
        method: 'POST',
        body: JSON.stringify({
          fundname: dialogData.fundname,
          nav: values.amount,
          date: selectedDate
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': JSON.parse(localStorage.getItem('token'))
        }
      }
    );

    const data = await response.json();
    setLoading(false);
    if (data?.status) {
      setUpdate((state) => state + 1);
      Swal.fire('NAV value updated!', '', 'success');
    } else alert('Error while updating');
    console.log(data);
  };

  return (
    <>
      <TableContainer component={Paper} className="inv-table-funds">
        <Table
          stickyHeader
          sx={{ minWidth: 700, height: '100px', overflow: 'scroll' }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Date Added</StyledTableCell>
              <StyledTableCell align="center">Fund Name</StyledTableCell>
              <StyledTableCell align="center">NAV</StyledTableCell>
              <StyledTableCell align="center">NAV Date</StyledTableCell>
              <StyledTableCell align="center">Invested Amount</StyledTableCell>
              <StyledTableCell align="center">Current Value</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!displayRows.length && <p style={{ padding: 10 }}>Loading...</p>}
            {displayRows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {new Date(row.dateOfCreation).toLocaleDateString('en-GB')}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.fundname}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.nav}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {new Date(row.lastUpdate).toLocaleDateString('en-GB')}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.totalInvested.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.currentValue.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClickOpen(row);
                      }}
                      style={{
                        backgroundColor: '#E95B3E',
                        textTransform: 'none'
                      }}
                    >
                      Edit
                    </Button>
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Dialog open={open} onClose={handleCancel}>
          <DialogTitle>Update NAV</DialogTitle>
          <DialogContent
            style={{ display: 'flex', flexDirection: 'column', gap: '1.7rem' }}
          >
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="NAV Date"
                inputFormat="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                disableCloseOnSelect={false}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
