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
  Narration,
  FundName,
  RefNo,
  InvestedAmounts,
  WithdrawAmount,
  TotalGainAmount,
  TotalBalanceAmount
) {
  return {
    Date,
    Narration,
    FundName,
    RefNo,
    InvestedAmounts,
    WithdrawAmount,
    TotalGainAmount,
    TotalBalanceAmount
  };
}

const rows = [
  createData(
    '21/01/2021',
    'Lorem ipsum dolor sit amet',
    834238234,
    47123,
    3452,
    412323,
    13947123,
    13947123
  ),
  createData(
    '21/01/2021',
    'Lorem ipsum dolor sit amet',
    834238234,
    47123,
    3452,
    412323,
    13947123,
    13947123
  ),
  createData(
    '21/01/2021',
    'Lorem ipsum dolor sit amet',
    834238234,
    47123,
    3452,
    412323,
    13947123,
    13947123
  ),
  createData(
    '21/01/2021',
    'Lorem ipsum dolor sit amet',
    834238234,
    47123,
    3452,
    412323,
    13947123,
    13947123
  ),
  createData(
    '21/01/2021',
    'Lorem ipsum dolor sit amet',
    834238234,
    47123,
    3452,
    412323,
    13947123,
    13947123
  ),
  createData(
    '21/01/2021',
    'Lorem ipsum dolor sit amet',
    834238234,
    47123,
    3452,
    412323,
    13947123,
    13947123
  ),
  createData(
    '21/01/2021',
    'Lorem ipsum dolor sit amet',
    834238234,
    47123,
    3452,
    412323,
    13947123,
    13947123
  ),
  createData(
    '21/01/2021',
    'Lorem ipsum dolor sit amet',
    834238234,
    47123,
    3452,
    412323,
    13947123,
    13947123
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
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.Date}
              </StyledTableCell>
              <StyledTableCell align="right" component="th" scope="row">
                {row.Narration}
              </StyledTableCell>
              <StyledTableCell align="right" component="th" scope="row">
                {row.FundName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.RefNo}</StyledTableCell>
              <StyledTableCell align="right">
                {row.InvestedAmounts}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.WithdrawAmounts}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.TotalGainAmount}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.TotalBalanceAmount}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
