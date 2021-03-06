import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import useWindowSize from '../../../utils/useWindowSize';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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

const statusGiver = (status) => {
  if (status) {
    return (
      <div style={{ color: '#0B970B', display: 'flex', gap: '1ch' }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 3.18L8.59 14.6L4.35 10.36L5.76 8.95L8.59 11.78L18.59 1.78L20 3.18ZM17.79 8.22C17.92 8.79 18 9.39 18 10C18 14.42 14.42 18 10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C11.58 2 13.04 2.46 14.28 3.25L15.72 1.81C14.1 0.67 12.13 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 8.81 19.78 7.67 19.4 6.61L17.79 8.22Z"
            fill="#0B970B"
          />
        </svg>
        <span>Resolved</span>
      </div>
    );
  }
  return (
    <div style={{ color: '#FE0000', display: 'flex', gap: '1ch' }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
          fill="#FE0000"
        />
      </svg>

      <span>Unresolved</span>
    </div>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F6F8FA !important',
    color: 'var(--secondary-color)',
    padding: '0.75rem',
    fontSize: '14px',
    fontWeight: 700,
    borderBottom: '1px solid #CECECE'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'var(--secondary-color)',
    padding: '0.6rem 0.75rem',
    border: 'none'
  }
}));
// border: '1px solid black'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
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
  const size = useWindowSize();
  const history = useHistory();
  //hooks
  //handlers

  const handleOpenDialog = (row) => {
    // console.log(row);
    if (size.width > 768) {
      setDialogData(row);
      setDialogOpen(true);
      setMessage(row.reply || '');
    } else {
      console.log(row);
      history.push({
        pathname: '/admin/queries/addComment',
        state: { row }
      });
    }
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
      {' '}
      {size.width <= 768 ? (
        <div className="folio-card-mobile-container">
          {displayRows.map((row) => {
            console.log(row);
            return (
              <div className="folio-card-mobile" key={row._id}>
                <div
                  className="folio-card-mobile-header-top"
                  id="grievances-card-header-top"
                >
                  <div className="folio-card-mobile-header-folio-date">
                    {new Date(row.date).toLocaleDateString('en-GB')}
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>#{row.queryId}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    className="folio-card-mobile-header"
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <div className="folio-card-mobile-header-name">
                      Query Subject
                    </div>
                    <p className="folio-card-mobile-header-folio">
                      {row.subject}
                    </p>
                  </div>

                  <div
                    className="folio-card-mobile-header"
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <div className="folio-card-mobile-header-name">
                      Investor Name
                    </div>
                    <p className="folio-card-mobile-header-folio">
                      {row.user.name}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.3rem',
                    alignItems: 'center'
                  }}
                >
                  <div>{statusGiver(row.isResolved)}</div>
                  <Button
                    variant="contained"
                    style={{
                      color: row.isResolved ? 'var(--primary-color)' : 'white',
                      backgroundColor: row.isResolved
                        ? 'white'
                        : 'var(--primary-color)',
                      border: '1px solid var(--primary-color)',
                      fontSize: '0.7rem',
                      width: '9rem',
                      textTransform: 'none'
                    }}
                    onClick={() => {
                      handleOpenDialog(row);
                    }}
                  >
                    {row.isResolved ? 'Update' : 'Resolve'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Paper>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: '62vh', borderRadius: 2 }}
            style={{ boxShadow: '0px 0px 0px 1px #CECECE' }}
          >
            <Table stickyHeader aria-label="customized table">
              <TableHead style={{ border: '1px solid red' }}>
                <TableRow>
                  <StyledTableCell>Date&nbsp;Added</StyledTableCell>
                  <StyledTableCell>Query&nbsp;ID</StyledTableCell>
                  <StyledTableCell align="left">
                    Query&nbsp;Subject
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Investor&nbsp;Name
                  </StyledTableCell>
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
                      #{row._id}
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {row.subject}
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {row.user.name}
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {statusGiver(row.isResolved)}
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
            <DialogTitle style={{ color: '#132F5E' }}>
              <div className="add-folio-header">
                <h2 className="add-folio-title">Add Comment</h2>
                <IconButton
                  size="large"
                  style={{ color: '#132f5e' }}
                  onClick={handleCloseDialog}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent sx={{ margin: 0, padding: 0 }}>
              <div className="query-dialog-details">
                <div className="query-dialog-details-row">
                  <div className="query-dialog-details-row-label">Query ID</div>
                  <div className="query-dialog-details-row-data">
                    #{dialogData.queryId}
                  </div>
                </div>
                <div className="query-dialog-details-row">
                  <div className="query-dialog-details-row-label"> From</div>
                  <div className="query-dialog-details-row-data">
                    {dialogData.user?.name || 'NA'}
                  </div>
                </div>
                <div className="query-dialog-details-row">
                  <div className="query-dialog-details-row-label">
                    Query Subject
                  </div>
                  <div className="query-dialog-details-row-data">
                    {dialogData.subject || 'NA'}
                  </div>
                </div>
                <div className="query-dialog-details-row">
                  <div className="query-dialog-details-row-label">
                    Query Detail
                  </div>
                  <div className="query-dialog-details-row-data">
                    {dialogData.description || 'NA'}
                  </div>
                </div>
              </div>
              <div
                className="query-dialog-details"
                style={{ backgroundColor: 'white' }}
              >
                <div className="query-dialog-details-row">
                  <div className="query-dialog-details-row-label">Status</div>
                  <div className="query-dialog-details-row-data">
                    {statusGiver(dialogData.isResolved)}
                  </div>
                </div>
                {dialogData.isResolved && (
                  <div className="query-dialog-details-row">
                    <div className="query-dialog-details-row-label">
                      Added comment
                    </div>
                    <div className="query-dialog-details-row-data">
                      {dialogData.reply || <i>Not added yet</i>}
                    </div>
                  </div>
                )}
                <div
                  className="query-dialog-details-row"
                  style={{ alignItems: 'flex-start' }}
                >
                  <div className="query-dialog-details-row-label">
                    {dialogData.isResolved ? 'Update comment' : 'Add comment'}
                  </div>
                  <div className="query-dialog-details-row-data">
                    <TextField
                      autoFocus
                      // margin="dense"
                      id="name"
                      type="text"
                      fullWidth
                      // variant="standard"
                      value={message}
                      onChange={handleChangeMessage}
                      multiline
                      rows={2}
                      className="add-folio-searchbar-multiline"
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'flex-end',
                gap: 20,
                padding: '1rem'
              }}
            >
              <Button
                onClick={handleCloseDialog}
                variant="outlined"
                style={{
                  padding: '0.4rem 2rem',
                  borderRadius: '4px',
                  border: '1px solid var(--primary-color)',
                  color: 'var(--primary-color)',
                  backgroundColor: 'white',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                className="add-multiple-new-transaction-button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveQuery}
                disabled={!message.length}
                variant="outlined"
                className="submit-multiple-new-transaction-button"
                sx={{
                  backgroundColor: message.length
                    ? 'var(--primary-color) !important'
                    : 'hsl(10deg, 35%, 70%) !important',
                  color: message.length
                    ? 'white'
                    : 'hsl(10deg, 10%, 90%) !important'
                }}
              >
                {dialogData?.reply ? 'Update Message' : 'Submit'}
              </Button>
            </div>
          </Dialog>
        </Paper>
      )}
    </>
  );
}
