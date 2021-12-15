import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import {
  TableBody,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from 'material-ui-search-bar';
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
// border: '1px solid black'

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

export default function CustomizedTables({
  rows,
  displayRows,
  setDisplayRows,
  setUpdate,
  setLoading,
  loading
}) {
  //states
  const [searched, setSearched] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [message, setMessage] = useState('');
  //hooks
  //handlers

  const handleOpenDialog = (row) => {
    // console.log(row);
    setDialogData(row);
    setDialogOpen(true);
    setMessage(row.reply || '');
  };

  const handleCloseDialog = (row) => {
    setDialogOpen(false);
  };
  const handleSaveQuery = async (e, row) => {
    setLoading(true);
    // console.log(row);
    setDialogOpen(false);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/query/update`,
      {
        method: 'POST',
        body: JSON.stringify({
          queryId: dialogData._id,
          reply: message,
          isResolved: true
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': JSON.parse(localStorage.getItem('token'))
        }
      }
    );
    const data = await response.json();
    setLoading(false);
    if (data.status) {
      setUpdate((state) => state + 1);
      successSwal.fire('Updated the Query!', '', 'success');
    } else errorSwal.fire('Error while updating', data?.error, 'error');
    // console.log(data);
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const requestSearch = (searchedVal) => {
    setLoading(true);
    const filteredRows = rows.filter((row) => {
      if (searchedVal.toLowerCase() === 'resolved') return row.isResolved;
      return (
        new Date(row.date)
          .toLocaleDateString('en-GB')
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        row.subject.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.queryId.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.user.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
        (row.isResolved ? 'resolved' : 'unresolved')
          .toLowerCase()
          .includes(searchedVal.toLowerCase())
      );
    });
    setTimeout(() => {
      console.log('hey');
      setLoading(false);
    }, 200);
    setDisplayRows(filteredRows);
    clearTimeout();
  };

  return (
    <>
      <Paper>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: '62vh', borderRadius: 2 }}
          style={{ boxShadow: '0px 0px 0px 1px #CECECE' }}
        >
          <Table stickyHeader aria-label="customized table">
            <TableHead style={{ border: '1px solid red' }}>
              <TableRow>
                <StyledTableCell>Date Added</StyledTableCell>
                <StyledTableCell>Query ID</StyledTableCell>
                <StyledTableCell align="left">Query Subject</StyledTableCell>
                <StyledTableCell align="left">Investor Name</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!displayRows.length && (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {loading ? 'Loading...' : 'No queries...'}
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {displayRows.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {new Date(row.date).toLocaleDateString('en-GB')}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.queryId}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.subject}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.user.name}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.isResolved ? 'Resolved' : 'Unresolved'}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {
                      <Button
                        onClick={() => {
                          handleOpenDialog(row);
                        }}
                        variant="contained"
                        style={{
                          border: '1px solid var(--primary-color)',
                          backgroundColor: row.isResolved
                            ? 'white'
                            : 'var(--primary-color)',
                          textTransform: 'none',
                          color: row.isResolved
                            ? 'var(--primary-color)'
                            : 'white',
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          width: '7rem'
                        }}
                      >
                        {row.isResolved ? 'Update' : 'Resolve'}
                      </Button>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add a message</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Add a message to mark as resolved"
              type="text"
              fullWidth
              variant="standard"
              value={message}
              onChange={handleChangeMessage}
            />
          </DialogContent>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              gap: 20,
              padding: '1rem'
            }}
          >
            <button
              onClick={handleCloseDialog}
              variant="outlined"
              style={{
                padding: '1rem',
                borderRadius: '0.5rem',
                margin: 0,
                border: 'none',
                fontSize: '1rem'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveQuery}
              disabled={!message.length}
              variant="outlined"
              style={{
                backgroundColor: message.length
                  ? 'var(--primary-color)'
                  : '#eee',
                color: message.length ? 'white' : '#bbb',
                padding: '1rem',
                borderRadius: '0.5rem',
                margin: 0,
                border: 'none',
                fontSize: '1rem'
              }}
            >
              {dialogData?.reply ? 'Update Message' : 'Mark as resolved'}
            </button>
          </div>
        </Dialog>
      </Paper>
    </>
  );
}
