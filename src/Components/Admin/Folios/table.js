import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router';

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

export default function CustomizedTables({ displayRows, setLoading, loading }) {
  const history = useHistory();

  const handleAddFolioTranscation = (row) => {
    console.log(row);
    return history.push({
      pathname: '/admin/folioStatements/add',
      state: { row }
    });
  };

  console.log(displayRows);
  return (
    <>
      <TableContainer sx={{ maxHeight: '50vh' }} component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 700, overflow: 'scroll' }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Folio ID</StyledTableCell>
              <StyledTableCell align="center">Date Added</StyledTableCell>
              <StyledTableCell align="center">Investor ID</StyledTableCell>
              <StyledTableCell align="center">Investor Name</StyledTableCell>
              <StyledTableCell align="center">Commitment</StyledTableCell>
              <StyledTableCell align="center">Contribution</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!displayRows.length && (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {loading ? 'Loading...' : 'No Folios...'}
                </StyledTableCell>
              </StyledTableRow>
            )}
            {displayRows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.folioId}
                </StyledTableCell>
                {/* <StyledTableCell
                  align="center"
                  component="th"
                  scope="row"
                >
                  {row.folioName}
                </StyledTableCell> */}

                <StyledTableCell align="center" component="th" scope="row">
                  {new Date(row.date).toLocaleDateString('en-GB')}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.user.userId}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.user.name}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.commitment}
                </StyledTableCell>

                <StyledTableCell align="center" component="th" scope="row">
                  {row.contribution}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {
                    <Button
                      onClick={() => {
                        handleAddFolioTranscation(row);
                      }}
                      variant="contained"
                      style={{
                        backgroundColor: '#E95B3E',
                        textTransform: 'none'
                      }}
                    >
                      <AddIcon sx={{ marginRight: '5px' }} />
                      Transaction
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
