import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Table,
  TableBody,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import useWindowSize from '../../../utils/useWindowSize';
import SearchBar from 'material-ui-search-bar';
import './Grievances.css';

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

export default function CustomizedTables({ rows, loading }) {
  const size = useWindowSize();
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [message, setMessage] = useState('');

  const handleCloseDialog = (row) => {
    setDialogOpen(false);
  };

  const handleOpenDialog = (row) => {
    // console.log(row);
    if (size.width > 768) {
      setDialogData(row);
      setDialogOpen(true);
    } else {
      console.log(row);
      history.push({
        pathname: '/queries/viewQuery',
        state: { row }
      });
    }
  };
  return (
    <>
      {size.width <= 768 ? (
        <div className="folio-card-mobile-container">
          {rows.map((row) => {
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
                      Resolution Message
                    </div>
                    <p className="folio-card-mobile-header-folio">
                      {row.reply
                        ? row.reply.length > 20
                          ? row?.reply.slice(0, 20) + '..'
                          : row.reply
                        : 'Not Resolved'}
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
                    onClick={() => {
                      handleOpenDialog(row);
                    }}
                    variant="contained"
                    style={{
                      border: '1px solid var(--primary-color)',
                      backgroundColor: 'white',
                      textTransform: 'none',
                      color: 'var(--primary-color)',
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      width: '7rem'
                    }}
                  >
                    View Detail
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Paper>
          <TableContainer
            id="query-table"
            component={Paper}
            sx={{
              maxHeight: '69vh',
              border: '1px solid #CECECE',
              borderRadius: '8px'
            }}
          >
            <Table stickyHeader aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date&nbsp;of&nbsp;Query</StyledTableCell>
                  <StyledTableCell>Query&nbsp;ID</StyledTableCell>
                  <StyledTableCell>Query&nbsp;Subject</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Resolution&nbsp;Message</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  border: '1px solid #CECECE'
                }}
              >
                {!rows.length && (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {loading ? 'Loading...' : 'No Queries...'}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
                {rows.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {new Date(row.date).toLocaleDateString('en-GB')}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      #{row.queryId}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.subject}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {statusGiver(row.isResolved)}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.reply
                        ? row.reply.length > 20
                          ? row?.reply.slice(0, 20) + '..'
                          : row.reply
                        : 'Not Resolved'}
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
                            backgroundColor: 'white',
                            textTransform: 'none',
                            color: 'var(--primary-color)',
                            padding: '4px 8px',
                            fontSize: '0.75rem',
                            width: '7rem'
                          }}
                        >
                          View Detail
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
            // onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle
              className="dialog-title-div"
              style={{
                display: 'flex',
                padding: '0 1rem',
                alignItems: 'center',
                color: '#132F5E',
                justifyContent: 'space-between'
              }}
            >
              <h2 className="add-folio-title" style={{ fontSize: '1.2rem' }}>
                Query Detail
              </h2>
              <IconButton
                size="large"
                style={{ color: '#132f5e' }}
                onClick={handleCloseDialog}
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ margin: 0, padding: 0 }}>
              <div className="query-dialog-details">
                <div className="query-dialog-details-row">
                  <div
                    className="query-dialog-details-row-label"
                    id="query-view-details-row-label"
                  >
                    Query ID
                  </div>
                  <div className="query-dialog-details-row-data">
                    #{dialogData.queryId}
                  </div>
                </div>

                <div className="query-dialog-details-row">
                  <div
                    className="query-dialog-details-row-label"
                    id="query-view-details-row-label"
                  >
                    Query Subject
                  </div>
                  <div className="query-dialog-details-row-data">
                    {dialogData.subject || 'NA'}
                  </div>
                </div>
                <div className="query-dialog-details-row">
                  <div
                    className="query-dialog-details-row-label"
                    id="query-view-details-row-label"
                  >
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
                  <div
                    className="query-dialog-details-row-label"
                    id="query-view-details-row-label"
                  >
                    Status
                  </div>
                  <div className="query-dialog-details-row-data">
                    {statusGiver(dialogData.isResolved)}
                  </div>
                </div>

                <div className="query-dialog-details-row">
                  <div
                    className="query-dialog-details-row-label"
                    id="query-view-details-row-label"
                  >
                    Resolution Message
                  </div>
                  <div className="query-dialog-details-row-data">
                    {dialogData.reply || <i>Not added yet</i>}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Paper>
      )}
    </>
  );
}
