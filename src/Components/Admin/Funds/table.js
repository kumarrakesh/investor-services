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

function createData(Date, FundName, FundId, NAV, InvAmount, CurrInvVal) {
  return { Date, FundName, FundId, NAV, InvAmount, CurrInvVal };
}

const rows = [
  createData(
    '21/01/2021',
    'Axis Securities',
    '#1012',
    '$25.67',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    '#1012',
    '$25.67',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    '#1012',
    '$25.67',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    '#1012',
    '$25.67',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    '#1012',
    '$25.67',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    '#1012',
    '$25.67',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    '#1012',
    '$25.67',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    '#1012',
    '$25.67',
    '$10000.00',
    '$10000.00'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    '#1012',
    '$25.67',
    '$10000.00',
    '$10000.00'
  )
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, height: '100px', overflow: 'scroll' }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Date Added</StyledTableCell>
            <StyledTableCell align="center">Fund Name</StyledTableCell>
            <StyledTableCell>Fund ID</StyledTableCell>
            <StyledTableCell align="center">
              Net Asset Value(NAV)
            </StyledTableCell>
            <StyledTableCell align="center">Invested Amount</StyledTableCell>
            <StyledTableCell align="center">
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
                {row.FundName}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.FundId}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.NAV}
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
