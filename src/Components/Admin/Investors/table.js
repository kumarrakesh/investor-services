import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddInvestor from './AddInvestor/AddInvestor';

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

export default function CustomizedTables({ displayRows, setUpdate, loading }) {
  const history = useHistory();

  const handleClickOpen = (row) => {
    console.log(row);
    return history.push({
      pathname: '/admin/investor/add',
      state: { row }
    });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ minWidth: 700, maxHeight: '350px' }}
      >
        <Table
          sx={{ minWidth: 700, maxHeight: '100px', overflow: 'scroll' }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Investor Name</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="right">Passport Number</StyledTableCell>
              {/* <StyledTableCell align="center">Invested Amount</StyledTableCell>
              <StyledTableCell align="center">
                Current Invested Value
              </StyledTableCell> */}
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!displayRows?.length && (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {loading ? 'Loading...' : 'No investors...'}
                </StyledTableCell>
              </StyledTableRow>
            )}
            {displayRows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {new Date(row.dateOfCreation).toLocaleDateString('en-GB')}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {[row.city, row.state, row.country].join(', ')}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.passport}
                </StyledTableCell>
                {/* <StyledTableCell align="center" component="th" scope="row">
                  {row.totalInvested.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.currentValue.toFixed(2)}
                </StyledTableCell> */}
                <StyledTableCell align="center" component="th" scope="row">
                  {
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClickOpen(row);
                      }}
                      style={{
                        backgroundColor: '#E95B3E',
                        textTransform: 'none'
                      }}
                    >
                      Edit
                    </Button>
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
