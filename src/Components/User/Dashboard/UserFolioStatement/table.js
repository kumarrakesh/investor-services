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

export default function CustomizedTables({ displayRows, loading }) {
  return (
    <>
      <Paper>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '46vh',
            borderRadius: 2
          }}
          style={{ boxShadow: '0px 0px 0px 1px #CECECE' }}
        >
          <Table aria-label="customized table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date Added</StyledTableCell>
                <StyledTableCell align="left">Transaction Type</StyledTableCell>
                <StyledTableCell align="left">Contribution</StyledTableCell>
                <StyledTableCell align="left">Distribution</StyledTableCell>
                <StyledTableCell align="left">Withdrawl</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!displayRows?.length && (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {loading ? 'Loading...' : 'No transactions...'}
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {displayRows
                .filter((el) => el.status != 'INVALID')
                .map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {new Date(row.date).toLocaleDateString('en-GB')}
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {row.type == 1
                        ? 'Contribution'
                        : row.type == 2
                        ? 'Yield Payment'
                        : 'Redemption'}
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {row.type == 1 ? ' ' + row.amount : ''}
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {row.type == 2 ? ' ' + row.amount : ''}
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {row.type == 3 ? ' ' + row.amount : ''}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
