import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, height: '100px', overflow: 'scroll' }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">Narration</StyledTableCell>
            <StyledTableCell>Fund Name</StyledTableCell>
            <StyledTableCell align="right">Ref. No.</StyledTableCell>
            <StyledTableCell align="right">Investment Amount</StyledTableCell>
            <StyledTableCell align="right">Withdraw Amount</StyledTableCell>
            <StyledTableCell align="right">Total Gain Amount</StyledTableCell>
            <StyledTableCell align="right">
              Total Balance Amount
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows == {} && <h1>Loading...</h1>}
          {rows != {} &&
            rows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {new Date(row.date).toLocaleDateString('en-GB')}
                </StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  {row.narration}
                </StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  {row.fundname}
                </StyledTableCell>
                <StyledTableCell align="right">{row.sno}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.investedAmount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.withdrawalAmount}
                </StyledTableCell>
                <StyledTableCell align="right">{row.totalGain}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.investedAmount - row.withdrawalAmount}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
