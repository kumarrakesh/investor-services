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
    backgroundColor: '#F6F8FA !important',
    color: 'var(--secondary-color)',
    padding: '1rem',
    fontSize: '14px',
    fontWeight: 700,
    borderBottom: '1px solid #CECECE'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'var(--secondary-color)',
    padding: '0.6rem 1rem',
    border: 'none'
  }
}));
// border: '1px solid black'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'white !important',
    border: 'none !important',
    outline: 'none'
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#F6F8FA',
    border: 'none !important',
    outline: 'none'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 'none !important',
    outline: 'none'
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
        sx={{ maxHeight: '68vh', borderRadius: 2 }}
        style={{ boxShadow: '0px 0px 0px 1px #CECECE' }}
      >
        <Table
          sx={{ minWidth: 700, overflow: 'scroll' }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="left">Investor Name</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Passport Number</StyledTableCell>
              {/* <StyledTableCell align="center">Invested Amount</StyledTableCell>
              <StyledTableCell align="center">
                Current Invested Value
              </StyledTableCell> */}
              <StyledTableCell align="left">Action</StyledTableCell>
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
                <StyledTableCell align="left" component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left" component="th" scope="row">
                  {[row.city, row.state, row.country].join(', ')}
                </StyledTableCell>
                <StyledTableCell align="left" component="th" scope="row">
                  {row.passport}
                </StyledTableCell>
                {/* <StyledTableCell align="center" component="th" scope="row">
                  {row.totalInvested.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.currentValue.toFixed(2)}
                </StyledTableCell> */}
                <StyledTableCell align="left" component="th" scope="row">
                  {
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClickOpen(row);
                      }}
                      style={{
                        border: '1px solid var(--primary-color)',
                        backgroundColor: 'white',
                        textTransform: 'none',
                        color: 'var(--primary-color)',
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        width: '6rem'
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
