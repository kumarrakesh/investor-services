import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
              <StyledTableCell align="center">NAV</StyledTableCell>
              <StyledTableCell align="center">NAV Date</StyledTableCell>
              <StyledTableCell align="center">Invested Amount</StyledTableCell>
              <StyledTableCell align="center">Current Value</StyledTableCell>
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
                  {row.FundId}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.NAV}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.Date}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.InvAmount}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.CurrInvVal}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {
                    <Button
                      variant="contained"
                      onClick={handleClickOpen}
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

      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update NAV</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
