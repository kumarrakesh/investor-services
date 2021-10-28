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
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

export default function CustomizedTables({ displayRows }) {
  const [dialogData, setDialogData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (row) => {
    setDialogData(row);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {};

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ minWidth: 700, maxHeight: '350px' }}
      >
        <Table
          sx={{ minWidth: 700, maxHeight: '100px', overflow: 'scroll' }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Investor Name</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="right">Passport Number</StyledTableCell>
              <StyledTableCell align="center">Invested Amount</StyledTableCell>
              <StyledTableCell align="center">
                Current Invested Value
              </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!displayRows.length && <p style={{ padding: 10 }}>Loading...</p>}
            {displayRows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {new Date(row.dateOfCreation).toLocaleDateString('en-GB')}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.city},{row.state},{row.country}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.passport}
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
          <DialogTitle>Update Investor Details</DialogTitle>
          <DialogContent
            style={{ display: 'flex', flexDirection: 'column', gap: '1.7rem' }}
          >
            <FormControl variant="standard">
              <TextField
                required
                id="outlined-required"
                value=""
                label="Password"
                style={{ width: '24rem' }}
              />
            </FormControl>
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
