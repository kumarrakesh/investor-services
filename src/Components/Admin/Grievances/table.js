import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from "material-ui-search-bar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(Date, QuerySub, QueryId, InvName, Action) {
  return { Date, QuerySub, QueryId, InvName, Action};
}

const originalRows = [
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
  createData('21/01/2021', 'Axis Securities', '#1012', 'Akhil Gupta', 'Resolved'),
];

export default function CustomizedTables() {
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.Date.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  
  return (
    <Paper>

       <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
    
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 ,height:"100px", overflow:"scroll"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date Added</StyledTableCell>
            <StyledTableCell align="center">Query Subject</StyledTableCell>
            <StyledTableCell>Query ID</StyledTableCell>
            <StyledTableCell align="center">Investor Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
             <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">{row.Date}</StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">{row.QuerySub}</StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">{row.QueryId}</StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">{row.InvName}</StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">{row.Action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}
