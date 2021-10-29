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

export default function CustomizedTables({ rows, loading }) {
  return (
    <TableContainer
      id="query-table"
      component={Paper}
      sx={{
        maxHeight: '500px',
        border: '1px solid #CECECE',
        borderRadius: '8px',
        overflowX: 'hidden'
      }}
    >
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date of Query</StyledTableCell>
            <StyledTableCell align="center">Query Subject</StyledTableCell>
            <StyledTableCell>Query ID</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Resolution Message</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody
          style={{
            border: '1px solid #CECECE'
          }}
        >
          {!rows.length && (
            <StyledTableRow>
              <StyledTableCell
                component="th"
                scope="row"
                style={{
                  padding: '1rem',
                  fontSize: '1rem'
                }}
              >
                {loading ? 'Loading...' : 'No queries yet.'}
              </StyledTableCell>
            </StyledTableRow>
          )}
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {new Date(row.date).toLocaleDateString('en-GB')}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.subject}
              </StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                #{row._id}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.isResolved ? 'Resolved' : 'Not Resolved'}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.reply ? row?.reply : 'Not Resolved'}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
