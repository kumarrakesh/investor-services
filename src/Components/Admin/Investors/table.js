import * as React from 'react';
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

function createData(
  Date,
  InvName,
  InvId,
  Address,
  PassNo,
  InvAmount,
  CurrInvVal
) {
  return { Date, InvName, InvId, Address, PassNo, InvAmount, CurrInvVal };
}

const rows = [
  createData(
    '21/01/2021',
    'Anil Jain',
    '#1012',
    'C-20,Bandra Kurla Complex,Mumbai',
    'XXJDEW',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Anil Jain',
    '#1012',
    'C-20,Bandra Kurla Complex,Mumbai',
    'XXJDEW',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Anil Jain',
    '#1012',
    'C-20,Bandra Kurla Complex,Mumbai',
    'XXJDEW',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Anil Jain',
    '#1012',
    'C-20,Bandra Kurla Complex,Mumbai',
    'XXJDEW',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Anil Jain',
    '#1012',
    'C-20,Bandra Kurla Complex,Mumbai',
    'XXJDEW',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Anil Jain',
    '#1012',
    'C-20,Bandra Kurla Complex,Mumbai',
    'XXJDEW',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Anil Jain',
    '#1012',
    'C-20,Bandra Kurla Complex,Mumbai',
    'XXJDEW',
    '$10000.00',
    '$10000.00'
  )
];

export default function CustomizedTables() {
  return (
    <TableContainer className = "inv-table" component={Paper}>
      <Table
        sx={{ minWidth: 700, height: '100px', overflow: 'scroll' }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">Investor Name</StyledTableCell>
            <StyledTableCell>Investor ID</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="right">Passport Number</StyledTableCell>
            <StyledTableCell align="right">Invested Amount</StyledTableCell>
            <StyledTableCell align="right">
              Current Invested Value
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.Date}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.InvName}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.InvId}
              </StyledTableCell>
              <StyledTableCell align="right" component="th" scope="row">
                {row.Address}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.PassNo}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.InvAmount}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.CurrInvVal}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
