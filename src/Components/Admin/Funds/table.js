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
  const [values, setValues] = React.useState({ amount: '124' });
  const [dialogData, setDialogData] = useState({});

  const [NavHistoryOpen, setNavHistoryOpen] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleEditNAV = async (row) => {
    setDialogData(row);
    setValues({ ...values, amount: row.nav });
    setOpen(true);
  };

  const handleNavHistory = (row) => {
    setDialogData(row);
    setNavHistoryOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleNavHistoryCancel = () => {
    setNavHistoryOpen(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setOpen(false);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/update/fund`,
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
    } else Swal.fire('Error while updating!', data?.error, 'error');
    // console.log(data);
  };

  console.log(dialogData);
  console.log(displayRows);
  return (
    <>
      <TableContainer
        sx={{ maxHeight: '50vh' }}
        component={Paper}
        className="inv-table-funds"
      >
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
            {!displayRows.length && (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {loading ? 'Loading...' : 'No funds...'}
                </StyledTableCell>
              </StyledTableRow>
            )}
            {displayRows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell
                  onClick={() => {
                    handleNavHistory(row);
                  }}
                  component="th"
                  scope="row"
                >
                  {new Date(row.dateOfCreation).toLocaleDateString('en-GB')}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleNavHistory(row);
                  }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {row.fundname}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleNavHistory(row);
                  }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {row.nav}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleNavHistory(row);
                  }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {new Date(row.lastUpdate).toLocaleDateString('en-GB')}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleNavHistory(row);
                  }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {row.totalInvested.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleNavHistory(row);
                  }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {row.currentValue.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleEditNAV(row);
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
                maxDate={new Date()}
                minDate={new Date(dialogData.dateOfCreation)}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={NavHistoryOpen} onClose={handleNavHistoryCancel}>
          <DialogTitle>{dialogData.fundname} </DialogTitle>
          <DialogContent
            style={{ display: 'flex', flexDirection: 'column', gap: '1.7rem' }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">NAV</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dialogData?.history?.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {new Date(row.date).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell align="right">{row.nav}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNavHistoryCancel}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
