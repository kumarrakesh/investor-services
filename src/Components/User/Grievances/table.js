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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function CustomizedTables({ rows }) {
  return (
    <TableContainer id="query-table" component={Paper}>
      <Table
        sx={{ minWidth: 700, height: '100px', overflow: 'scroll' }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Date of Query</StyledTableCell>
            <StyledTableCell align="center">Query Subject</StyledTableCell>
            <StyledTableCell>Query ID</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
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
                {String(row.isResolved)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
