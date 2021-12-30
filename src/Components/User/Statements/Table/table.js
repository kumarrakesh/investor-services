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
    backgroundColor: '#F6F8FA !important',
    color: 'var(--secondary-color)',
    padding: '0.75rem'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '0.6rem 0.75rem'
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

export default function CustomizedTables({ rows, fundname, loading }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '45vh' }}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow
            style={{
              border: '1px solid #CECECE'
            }}
          >
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">Narration</StyledTableCell>
            {/* {fundname == 'All' ? ( */}
            <StyledTableCell>Fund Name</StyledTableCell>
            {/* ) : null} */}
            <StyledTableCell align="right">Ref. No.</StyledTableCell>
            <StyledTableCell align="right">Investment Amount</StyledTableCell>
            <StyledTableCell align="right">Withdraw Amount</StyledTableCell>
            <StyledTableCell align="right">Current Value</StyledTableCell>
            <StyledTableCell align="right">
              Total Balance Amount
            </StyledTableCell>
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
                {loading ? 'Loading...' : 'No investments...'}
              </StyledTableCell>
            </StyledTableRow>
          )}
          {rows != {} &&
            rows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {new Date(row.date).toLocaleDateString('en-GB')}
                </StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  {row.narration || '-'}
                </StyledTableCell>
                {/* {fundname == 'All' ? ( */}
                <StyledTableCell align="right" component="th" scope="row">
                  {row.fundname}
                </StyledTableCell>
                {/* ) : null} */}
                <StyledTableCell align="right">{row.sno}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.investedAmount < 0
                    ? 0
                    : Math.round(row.investedAmount * 100 + Number.EPSILON) /
                      100}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {Math.round(row.withdrawalAmount * 100 + Number.EPSILON) /
                    100}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {Math.round(row.currentValue * 100 + Number.EPSILON) / 100}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {Math.round(row.totalInvested * 100 + Number.EPSILON) / 100}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
