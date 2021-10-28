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

export default function CustomizedTables({
  rows,
  setRows,
  displayRows,
  setDisplayRows
}) {
  // const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState('');

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return (
        row.date?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.fundname?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.user?.name?.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setDisplayRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  return (
    <>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <Paper>
        <TableContainer
          component={Paper}
          sx={{
            minWidth: 700,
            maxHeight: '300px'
          }}
        >
          <Table aria-label="customized table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date Added</StyledTableCell>
                <StyledTableCell align="center">Fund Name</StyledTableCell>
                <StyledTableCell>Investor Name</StyledTableCell>
                <StyledTableCell align="center">NAV</StyledTableCell>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                <StyledTableCell align="center">Narration</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayRows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {new Date(row.date).toLocaleDateString('en-GB')}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.fundname}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row?.user?.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.nav}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.investedAmount < 0
                      ? row.withdrawalAmount
                      : row.investedAmount}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.investedAmount < 0 ? 'Withdrawn' : 'Invested'}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.remarks || row.narration || '-'}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
