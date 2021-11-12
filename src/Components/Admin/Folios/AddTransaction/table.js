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
  setDisplayRows,
  loading,
  setLoading
}) {
  // const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState('');

  const requestSearch = (searchedVal) => {
    setLoading(true);
    const filteredRows = rows.filter((row) => {
      return (
        new Date(row.date)
          .toLocaleDateString('en-GB')
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        row.fundname?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.user?.name?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        (row.remarks || row.narration)
          ?.toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        (row.action ? 'resolved' : 'unresolved')
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        (row.investedAmount < 0 ? 'Withdrawn' : 'Invested')
          .toLowerCase()
          .includes(searchedVal.toLowerCase())
      );
    });
    setTimeout(() => {
      console.log('hey');
      setLoading(false);
    }, 200);
    setDisplayRows(filteredRows);
    clearTimeout();
  };

  const cancelSearch = () => {
    setLoading(false);
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
            maxHeight: '300px'
          }}
        >
          <Table aria-label="customized table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date Added</StyledTableCell>
                <StyledTableCell align="center">
                  Transaction Type
                </StyledTableCell>
                <StyledTableCell>Contribution</StyledTableCell>
                <StyledTableCell align="center">Distribution</StyledTableCell>
                <StyledTableCell align="center">Withdrawl</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!displayRows.length && (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {loading ? 'Loading...' : 'No transactions...'}
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {displayRows.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {new Date(row.date).toLocaleDateString('en-GB')}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.type}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.type == 1 ? row.amount : '-'}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.type == 2 ? row.amount : '-'}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.type == 3 ? row.amount : '-'}
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
