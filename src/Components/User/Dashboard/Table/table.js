import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent
} from '@mui/material';

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
  fundname,
  loading,
  setLoading
}) {
  const history = useHistory();

  const handleShowFolioData = async (row) => {
    console.log(row);
    return history.push({
      pathname: '/dashboard/folioStatement',
      state: { row }
    });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '70vh', borderRadius: 2 }}
        style={{ boxShadow: '0px 0px 0px 1px #CECECE' }}
      >
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow
              style={{
                border: '1px solid #CECECE'
              }}
            >
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="left">Currency</StyledTableCell>
              <StyledTableCell align="left">Folio No.</StyledTableCell>
              {/* {fundname == 'All' ? ( */}
              <StyledTableCell align="left">Capital Commitment</StyledTableCell>
              {/* ) : null} */}
              <StyledTableCell align="left">Contribution</StyledTableCell>
              <StyledTableCell align="left">
                Pending Contribution
              </StyledTableCell>
              <StyledTableCell align="left">Expected Yield</StyledTableCell>
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
                  {loading ? 'Loading...' : 'No folios...'}
                </StyledTableCell>
              </StyledTableRow>
            )}
            {rows != {} &&
              rows.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {new Date(row.date).toLocaleDateString('en-GB')}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.currency || 'USD'}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.folioNumber || '-'}
                  </StyledTableCell>
                  {/* {fundname == 'All' ? ( */}
                  <StyledTableCell align="left" component="th" scope="row">
                    {' ' + row.commitment.toFixed(2)}
                  </StyledTableCell>
                  {/* ) : null} */}
                  <StyledTableCell align="left">
                    {' ' + row.contribution.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {' ' + (row.commitment - row.contribution).toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.yield.toFixed(2)}%
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleShowFolioData(row);
                        }}
                        style={{
                          border: '1px solid var(--primary-color)',
                          backgroundColor: 'white',
                          textTransform: 'none',
                          color: 'var(--primary-color)',
                          padding: '4px 1.5rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        View
                      </Button>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
