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
    <div
      style={{ color: 'var(--secondary-color)', display: 'flex', gap: '1ch' }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
          fill="#132F5E"
        />
        <path
          d="M5 11.5C5.82843 11.5 6.5 10.8284 6.5 10C6.5 9.17157 5.82843 8.5 5 8.5C4.17157 8.5 3.5 9.17157 3.5 10C3.5 10.8284 4.17157 11.5 5 11.5Z"
          fill="#132F5E"
        />
        <path
          d="M10 11.5C10.8284 11.5 11.5 10.8284 11.5 10C11.5 9.17157 10.8284 8.5 10 8.5C9.17157 8.5 8.5 9.17157 8.5 10C8.5 10.8284 9.17157 11.5 10 11.5Z"
          fill="#132F5E"
        />
        <path
          d="M15 11.5C15.8284 11.5 16.5 10.8284 16.5 10C16.5 9.17157 15.8284 8.5 15 8.5C14.1716 8.5 13.5 9.17157 13.5 10C13.5 10.8284 14.1716 11.5 15 11.5Z"
          fill="#132F5E"
        />
      </svg>

      <span>Unresolved</span>
    </div>
  );
};

export default function CustomizedTables({ rows, loading }) {
  return (
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
            <StyledTableCell>Date of Query</StyledTableCell>
            <StyledTableCell>Query ID</StyledTableCell>
            <StyledTableCell>Query Subject</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Resolution Message</StyledTableCell>
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
                #{row._id}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.subject}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {statusGiver(row.isResolved)}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.reply ? row?.reply : 'Not Resolved'}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
