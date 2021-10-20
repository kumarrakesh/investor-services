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

function createData(Date, FundName, InvName, NAV, Amount, Action) {
  return { Date, FundName, InvName, NAV, Amount, Action };
}

const originalRows = [
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Withdraw'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Invest'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Withdraw'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Withdraw'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Invest'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Invest'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Withdraw'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Withdraw'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Withdraw'
  ),
  createData(
    '21/01/2021',
    'Axis Securities',
    'Anil Jain',
    '$4.56',
    '$25.67',
    'Withdraw'
  )
];

export default function CustomizedTables() {
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState('');

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.Date.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  return (
    <Paper>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, height: '100px', overflow: 'scroll' }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Date Added</StyledTableCell>
              <StyledTableCell align="center">Fund Name</StyledTableCell>
              <StyledTableCell>Investor Name</StyledTableCell>
              <StyledTableCell align="center">NAV</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
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
                <StyledTableCell align="left" component="th" scope="row">
                  {row.InvName}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.NAV}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.Amount}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.Action}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
