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
  },
  cursor: 'pointer'
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
      'https://investorbackend.herokuapp.com/api/query/update',
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
      Swal.fire('Updated the query!', '', 'success');
    } else Swal.fire('Error while updating', data?.error, 'error');
    // console.log(data);
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return (
        row.date.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.subject.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.queryId.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.user.name.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setDisplayRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  return (
    <>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <Paper>
        <TableContainer
          component={Paper}
          sx={{ minWidth: 700, maxHeight: '350px' }}
        >
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date Added</StyledTableCell>
                <StyledTableCell align="center">Query Subject</StyledTableCell>
                <StyledTableCell>Query ID</StyledTableCell>
                <StyledTableCell align="center">Investor Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
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
                <StyledTableRow
                  key={row._id}
                  onClick={() => {
                    handleOpenDialog(row);
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    {new Date(row.date).toLocaleDateString('en-GB')}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.subject}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.queryId}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.user.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.isResolved ? 'Resolved' : 'Unresolved'}
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
              label="Add a message to mark the query as resolved"
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
                color: 'var(--primary-color)',
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
