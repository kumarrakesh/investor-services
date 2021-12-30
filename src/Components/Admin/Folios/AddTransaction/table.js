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
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import {
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import { fontSize, fontWeight } from '@mui/system';
import AddMultipleNewTransaction from '../../AddMultipleNewTransaction/AddMultipleNewTransaction';
import { useHistory } from 'react-router-dom';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F6F8FA !important',
    color: 'var(--secondary-color)',
    padding: '0.75rem',
    fontSize: '14px',
    fontWeight: 700,
    borderBottom: '1px solid #CECECE'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'var(--secondary-color)',
    padding: '0.6rem 0.75rem',
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
const errorSwal = Swal.mixin({
  customClass: {
    container: 'add-folio-swal-container',
    popup: 'add-folio-swal swal-error-bg-color',
    title: 'add-folio-swal-title'
  },
  imageUrl: '',
  imageHeight: 10,
  imageWidth: 10,
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});
const successSwal = Swal.mixin({
  customClass: {
    container: 'add-folio-swal-container',
    popup: 'add-folio-swal swal-success-bg-color',
    title: 'add-folio-swal-title'
  },
  imageUrl: '',
  imageHeight: 10,
  imageWidth: 10,
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});
export default function CustomizedTables({
  displayRows,
  setDisplayRows,
  loading,
  setLoading,
  values,
  folioDetail
}) {
  //states
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [historyDialogData, setHistoryDialogData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newData, setNewData] = useState({
    date: new Date(),
    type: 1,
    amount: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [gotName, setGotName] = useState(false);
  const [investorName, setInvestorName] = useState('');
  //other hooks
  const history = useHistory();
  //handlers
  const handleShowHistoryDialog = (historyData) => {
    setShowHistoryDialog(true);
    console.log('historyData', historyData);
    setHistoryDialogData([
      ...historyData.editHistory,
      {
        type: historyData.type,
        narration: 'Initial Transaction',
        amount: historyData.amount,
        date: historyData.date
      }
    ]);
  };
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };
  const handleAddNewFolioTransaction = () => {
    console.log(displayRows);
    setDisplayRows([
      ...displayRows,
      {
        role: 'new',
        userId: newData.investorPassportNumber,
        folioId: newData.folioId,
        type: '1',
        amount: '300',
        date: new Date(),
        narration: 'invest Money'
      }
    ]);
    // setIsEditing(true);
    setIsEditing(true);
  };
  const handlePostNewFolioTransaction = async () => {
    setLoading(true);

    let folioData = {
      userId: values.investorPassport,
      folioId: values.folioId,
      type: newData.type,
      amount: newData.amount,
      date: selectedDate
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/add/folio/transaction`,
        {
          method: 'POST',
          body: JSON.stringify({ ...folioData }),
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem('token')),
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.status)
        errorSwal.fire(
          data.message || data.error || "Could'nt add the transaction",
          '',
          'error'
        );
      else {
        successSwal.fire('Transaction noted!', '', 'success');
        const response1 = await fetch(
          `${process.env.REACT_APP_API}/api/get/folio/transaction`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
              folioNumber: values.folioNumber
            })
          }
        );
        const data1 = await response1.json();
        // console.log('fg' + data1);
        setDisplayRows(data1.data);
        setIsEditing(false);
        setNewData({
          date: new Date(),
          type: 1,
          amount: null
        });
      }
    } catch (err) {
      errorSwal.fire('Some error occured', '', 'error');
    }
    setLoading(false);
  };
  return (
    <>
      <Paper>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '30vh',
            borderRadius: 2
          }}
          style={{ boxShadow: '0px 0px 0px 1px #CECECE' }}
        >
          <Table
            aria-label="customized table"
            stickyHeader
            sx={{
              minWidth: 700,
              overflow: 'scroll'
            }}
          >
            <TableHead style={{ border: '1px solid red', color: 'silver' }}>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="left">
                  Transaction&nbsp;Type
                </StyledTableCell>
                <StyledTableCell align="left">
                  Capital&nbsp;Contribution
                </StyledTableCell>
                <StyledTableCell align="left">
                  Yield&nbsp;Payment
                </StyledTableCell>
                <StyledTableCell align="left">Redemption</StyledTableCell>
                {history.location.pathname !=
                  '/admin/folios/editTransaction' && (
                  <StyledTableCell align="left">Action</StyledTableCell>
                )}
                {history.location.pathname ==
                  '/admin/folios/editTransaction' && (
                  <StyledTableCell align="left">Narration</StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {history.location.pathname != '/admin/folios/editTransaction' &&
                !displayRows.length && (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {loading ? 'Loading...' : 'No transactions...'}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              {history.location.pathname == '/admin/folios/editTransaction' &&
                !displayRows.editHistory?.length && (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {loading ? 'Loading...' : 'No transactions...'}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              {history.location.pathname == '/admin/folios/editTransaction' &&
                displayRows.editHistory?.map((oldRow) => {
                  let flag = oldRow?.editHistory?.length;

                  let row = { ...oldRow };
                  if (row?.editHistory?.length) {
                    row = row.editHistory[row.editHistory.length - 1];
                  }
                  return (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {flag > 0 && '.....'}
                        {new Date(row.date).toLocaleDateString('en-GB')}
                      </StyledTableCell>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.type == 1
                          ? 'Capital Contribution'
                          : row.type == 2
                          ? 'Yield Payment'
                          : 'Redemption'}
                      </StyledTableCell>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.type == 1 ? ' ' + row.amount : ''}
                      </StyledTableCell>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.type == 2 ? ' ' + row.amount : ''}
                      </StyledTableCell>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.type == 3 ? ' ' + row.amount : ''}
                      </StyledTableCell>
                      {
                        <StyledTableCell
                          align="left"
                          component="th"
                          scope="row"
                        >
                          {row.narration}
                        </StyledTableCell>
                      }
                    </StyledTableRow>
                  );
                })}
              {history.location.pathname != '/admin/folios/editTransaction' &&
                displayRows.map((oldRow) => {
                  let flag = oldRow?.editHistory?.length;

                  let row = { ...oldRow };
                  if (row?.editHistory?.length) {
                    row = row.editHistory[row.editHistory.length - 1];
                  }
                  return (
                    <StyledTableRow
                      key={row._id}
                      style={
                        flag > 0
                          ? {
                              backgroundColor: 'hsl(15, 5%, 90%)',
                              cursor: 'pointer'
                            }
                          : {}
                      }
                      title="See history"
                      onClick={() => {
                        handleShowHistoryDialog(oldRow);
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {new Date(row.date).toLocaleDateString('en-GB')}
                      </StyledTableCell>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.type == 1
                          ? 'Capital Contribution'
                          : row.type == 2
                          ? 'Yield Payment'
                          : 'Redemption'}
                      </StyledTableCell>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.type == 1 ? ' ' + row.amount : ''}
                      </StyledTableCell>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.type == 2 ? ' ' + row.amount : ''}
                      </StyledTableCell>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.type == 3 ? ' ' + row.amount : ''}
                      </StyledTableCell>
                      {history.location.pathname !=
                        '/admin/folios/editTransaction' && (
                        <StyledTableCell
                          align="left"
                          component="th"
                          scope="row"
                        >
                          {
                            <Button
                              onClick={() => {
                                history.push({
                                  pathname: '/admin/folios/editTransaction',
                                  state: {
                                    row: oldRow,
                                    from: history.location.pathname,
                                    folio: history.location.state.row
                                  }
                                });
                                // handleAddFolioTranscation(row);
                              }}
                              title="Edit this transaction"
                              variant="contained"
                              style={{
                                border: '1px solid var(--primary-color)',
                                backgroundColor: 'white',
                                textTransform: 'none',
                                color: 'var(--primary-color)',
                                padding: true ? '4px 8px' : '4px 1.5rem',
                                fontSize: '0.75rem'
                              }}
                            >
                              {/* <AddIcon sx={{ marginRight: '5px' }} /> */}
                              {/* {role == 'folio'
                            ? 'Add\u00A0Transaction'
                            : 'View\u00A0Detail'} */}
                              Edit transaction
                            </Button>
                          }
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* <div className="folio-add-transaction-btn-div"> */}
      {history.location.pathname != '/admin/folios/editTransaction' && (
        <AddMultipleNewTransaction
          handleAddNewFolioTransaction={handleAddNewFolioTransaction}
          folioNumber={values.folioNumber}
          setDisplayRows={setDisplayRows}
          folioDetail={folioDetail}
          setLoading={setLoading}
        />
      )}
      <Dialog
        open={showHistoryDialog}
        onClose={() => {
          setShowHistoryDialog(false);
        }}
      >
        <DialogTitle>Edit History (latest to oldest)</DialogTitle>
        <DialogContent
          style={{ display: 'flex', flexDirection: 'column', gap: '1.7rem' }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Narration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyDialogData?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {new Date(row.date).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell align="right">
                      {row.type == 1
                        ? 'Capital Contribution'
                        : row.type == 2
                        ? 'Yield Payment'
                        : 'Redemption'}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.narration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowHistoryDialog(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* </div> */}
    </>
  );
}
