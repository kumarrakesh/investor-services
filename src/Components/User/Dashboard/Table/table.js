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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E6E8EA !important',
    color: '#132F5E'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
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
  const history = useHistory();
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '60vh' }}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow
            style={{
              border: '1px solid #CECECE'
            }}
          >
            <StyledTableCell>Folio ID</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            {/* {fundname == 'All' ? ( */}
            <StyledTableCell align="center">Capital Commitment</StyledTableCell>
            {/* ) : null} */}
            <StyledTableCell align="right">Contribution</StyledTableCell>
            <StyledTableCell align="right">Expected Yield</StyledTableCell>
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
                <StyledTableCell
                  onClick={() => {
                    history.push('/dashboard/statements');
                  }}
                  component="th"
                  scope="row"
                >
                  {1012}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {new Date(row.date).toLocaleDateString('en-GB')}
                </StyledTableCell>
                {/* {fundname == 'All' ? ( */}
                <StyledTableCell align="center" component="th" scope="row">
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
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
