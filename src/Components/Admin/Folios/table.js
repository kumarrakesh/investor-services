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
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
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

export default function CustomizedTables({
  displayRows,
  setLoading,
  loading,
  setDisplayRows,
  role
}) {
  //states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newData, setNewData] = useState({
    investorPassportNumber: '',
    investorName: '',
    capitalCommitment: null,
    folioName: '',
    yield: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [gotName, setGotName] = useState(false);
  const [investorName, setInvestorName] = useState('');
  //hooks
  const history = useHistory();
  const tableRef = React.createRef();
  //handlers
  const handleGetNameFromPassport = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/users/new`, {
      headers: {
        'x-access-token': JSON.parse(localStorage.getItem('token'))
      }
    });
    const data = await response.json();
    if (!data.success)
      errorSwal.fire('Please check the passport number', '', 'error');
    else {
      console.log(data);
      let name = data.data.filter(
        (el) => el.passport == newData.investorPassportNumber
      );
      if (name.length) {
        console.log(name);
        setNewData({ ...newData, investorName: name[0].name });
        setGotName(true);
        setIsEditing(false);
      } else errorSwal.fire('Please check the passport number', '', 'error');
    }
  };
  const handleAddFolioTranscation = (row) => {
    if (role == 'folio') {
      history.push({
        pathname: '/admin/folios/addTransaction',
        state: { row, from: history.location.pathname }
      });
    } else {
      history.push({
        pathname: '/admin/folioStatements/viewDetail',
        state: { row, from: history.location.pathname }
      });
    }
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };
  const handlePostNewFolio = async () => {
    setLoading(true);
    let folioData = {
      userId: newData.investorPassportNumber,
      folioName: newData.folioName,
      commitment: newData.capitalCommitment,
      yield: newData.yield,
      date: selectedDate
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/add/folio`,
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
      if (!data.status) errorSwal.fire(data.message, '', 'error');
      else {
        successSwal.fire(data.message, '', 'success');
        const response1 = await fetch(
          `${process.env.REACT_APP_API}/api/all/folio`,
          {
            method: 'POST',
            headers: {
              'x-access-token': JSON.parse(localStorage.getItem('token'))
            }
          }
        );
        const data1 = await response1.json();
        console.log('fg' + data1);
        setDisplayRows(data1.data);
        setGotName(false);
        setNewData({
          investorPassportNumber: '',
          investorName: '',
          capitalCommitment: null,
          folioName: '',
          yield: null
        });
      }
    } catch (err) {
      errorSwal.fire('Some error occured', '', 'error');
    }
    setLoading(false);
  };
  const handleAddNewFolio = () => {
    if (tableRef?.current?.scrollTop) tableRef.current.scrollToBottom();

    setDisplayRows([
      ...displayRows,
      {
        role: 'new',
        _id: '618e3e4e65631a344d8c44b9',
        folioName: 'fund_6',
        folioId: 16,
        user: {
          email: '',
          mobileNo: '',
          phoneNo: '',
          _id: '6182750ff609eec6f9f0b45f',
          username: 'sdfsdfsd',
          password:
            '$2b$12$/sa5fVQYRRQAERgEJZALP.NUE5cnuKWgrG9H61f6gMCvisW73nw2e',
          userId: '14',
          name: 'oneInvestor',
          profilePic: '',
          passport: 'SDFSDFSD',
          maturity: '2021-11-03T11:38:57.568Z',
          address: '42342',
          city: 'SDFSD',
          state: 'SDFSD',
          country: 'NO',
          pincode: '434534',
          role: '616d2f588d908648c28d63a1',
          amountInvested: 0,
          currentInvestedValue: 0,
          __v: 0
        },
        commitment: 1400,
        contribution: 0,
        yield: 10,
        yieldAmount: 0,
        date: '2021-11-12T00:00:00.000Z',
        __v: 0
      }
    ]);
    setIsEditing(true);
  };
  // console.log(displayRows);
  return (
    <>
      <TableContainer
        sx={{ maxHeight: '60vh', borderRadius: 2 }}
        component={Paper}
        style={{ boxShadow: '0px 0px 0px 1px #CECECE' }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: 700,
            overflow: 'scroll'
          }}
          aria-label="customized table"
          ref={tableRef}
        >
          <TableHead style={{ border: '1px solid red' }}>
            <TableRow>
              <StyledTableCell>Date Added</StyledTableCell>
              <StyledTableCell align="left">Folio No.</StyledTableCell>
              {/* <StyledTableCell align="left">
                Investor Passport
              </StyledTableCell> */}
              <StyledTableCell align="left">Investor Name</StyledTableCell>
              <StyledTableCell align="left">Passport No.</StyledTableCell>
              <StyledTableCell align="left">Commitment</StyledTableCell>
              <StyledTableCell align="left">Contribution</StyledTableCell>
              {/* <StyledTableCell align="left">Distribution</StyledTableCell> */}
              {/* <StyledTableCell align="left">Pending Amount</StyledTableCell> */}
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!displayRows.length && (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {loading ? 'Loading...' : 'Loading...'}
                </StyledTableCell>
              </StyledTableRow>
            )}
            {displayRows.map((row, index) =>
              row.role == 'new' ? (
                <StyledTableRow key={row._id + index}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{
                      paddingLeft: '3px',
                      paddingRight: '3px'
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label="Date"
                        inputFormat="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        disableCloseOnSelect={false}
                        renderInput={(params) => (
                          <TextField
                            required
                            inputProps={{ style: { fontSize: '0.9rem' } }}
                            InputLabelProps={{
                              style: { fontSize: '0.8rem' }
                            }}
                            {...params}
                            sx={{
                              width: '100%',
                              minWidth: 95,
                              fontSize: '0.1rem !important',
                              padding: '1px'
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    component="th"
                    scope="row"
                    style={{ fontSize: '0.6rem' }}
                    sx={{
                      paddingLeft: '3px',
                      paddingRight: '3px'
                    }}
                  >
                    <TextField
                      required
                      id="outlined-required"
                      sx={{ minWidth: 70 }}
                      value={newData.folioName}
                      inputProps={{ style: { fontSize: '0.9rem' } }}
                      InputLabelProps={{
                        style: { fontSize: '0.8rem' }
                      }}
                      onChange={(e) => {
                        setNewData({
                          ...newData,
                          folioName: e.target.value
                        });
                      }}
                      label="Folio Name"
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    component="th"
                    scope="row"
                    sx={{
                      paddingLeft: '3px',
                      paddingRight: '3px'
                    }}
                  >
                    <TextField
                      required
                      id="outlined-required"
                      sx={{ minWidth: 70 }}
                      value={newData.investorPassportNumber}
                      inputProps={{ style: { fontSize: '0.9rem' } }}
                      InputLabelProps={{
                        style: { fontSize: '0.8rem' }
                      }}
                      onChange={(e) => {
                        setNewData({
                          ...newData,
                          investorPassportNumber: e.target.value
                        });
                      }}
                      label="Passport"
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    component="th"
                    scope="row"
                    sx={{
                      // paddingLeft: '10px',
                      paddingRight: '3px'
                    }}
                  >
                    {gotName ? (
                      <>
                        <span> {newData.investorName || ''}</span>
                        <Button
                          onClick={handleGetNameFromPassport}
                          variant="contained"
                          style={{
                            color:
                              newData.investorPassportNumber.length < 4
                                ? 'silver'
                                : 'white',
                            backgroundColor:
                              newData.investorPassportNumber.length < 4
                                ? 'gray'
                                : '#E95B3E',
                            textTransform: 'none',
                            fontSize: '0.7rem',
                            padding: '0.1rem 0.4rem',
                            marginTop: 10
                          }}
                          disabled={newData.investorPassportNumber.length < 4}
                        >
                          Get again
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleGetNameFromPassport}
                        variant="contained"
                        style={{
                          color:
                            newData.investorPassportNumber.length < 4
                              ? 'silver'
                              : 'white',
                          backgroundColor:
                            newData.investorPassportNumber.length < 4
                              ? 'gray'
                              : '#E95B3E',
                          textTransform: 'none',
                          fontSize: '0.8rem',
                          padding: '0.1rem 0.4rem'
                        }}
                        disabled={newData.investorPassportNumber.length < 4}
                      >
                        Get Name
                      </Button>
                    )}

                    {/* <TextField
                      required
                      disabled
                      id="outlined-required"
                      value={newData.investorName}
                      inputProps={{ style: { fontSize: '0.9rem' } }}
                      InputLabelProps={{
                        style: { fontSize: '0.8rem' }
                      }}
                      onChange={(e) => {
                        setNewData({
                          ...newData,
                          investorName: e.target.value
                        });
                      }}
                      label="Name"
                    /> */}
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    component="th"
                    scope="row"
                    colSpan={2}
                    sx={{
                      paddingLeft: '0px !important',
                      paddingRight: '0px !important'
                    }}
                  >
                    <TextField
                      required
                      type="number"
                      id="outlined-required"
                      value={newData.capitalCommitment}
                      onChange={(e) => {
                        setNewData({
                          ...newData,
                          capitalCommitment: e.target.value
                        });
                      }}
                      inputProps={{ style: { fontSize: '0.9rem' } }}
                      InputLabelProps={{
                        style: { fontSize: '0.8rem' }
                      }}
                      label="Commitment"
                    />
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    component="th"
                    scope="row"
                    colSpan={2}
                    sx={{
                      paddingLeft: '0px',
                      paddingRight: '0px'
                    }}
                  >
                    <TextField
                      required
                      type="number"
                      id="outlined-required"
                      value={newData.yield}
                      onChange={(e) => {
                        setNewData({
                          ...newData,
                          yield: e.target.value
                        });
                      }}
                      inputProps={{ style: { fontSize: '0.9rem' } }}
                      InputLabelProps={{
                        style: { fontSize: '0.8rem' }
                      }}
                      label="Yield %"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    <Button
                      variant="contained"
                      onClick={handlePostNewFolio}
                      disabled={
                        !newData.investorName ||
                        !newData.investorPassportNumber ||
                        !newData.capitalCommitment ||
                        !newData.folioName ||
                        !newData.yield
                      }
                      style={{
                        backgroundColor:
                          !newData.investorName ||
                          !newData.investorPassportNumber ||
                          !newData.capitalCommitment ||
                          !newData.folioName ||
                          !newData.yield
                            ? 'gray'
                            : '#E95B3E',
                        textTransform: 'none',
                        marginTop: 10,
                        width: '100%',
                        padding: '10px 0'
                      }}
                    >
                      Submit
                      <AddIcon sx={{ marginLeft: '10px' }} />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {new Date(row.date).toLocaleDateString('en-GB')}
                  </StyledTableCell>
                  {/* <StyledTableCell
                align="left"
                component="th"
                scope="row"
              >
                {row.folioName}
              </StyledTableCell> */}
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.folioNumber}
                  </StyledTableCell>
                  {/* <StyledTableCell align="left" component="th" scope="row">
                    {row.user.passport}
                  </StyledTableCell> */}
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.user.name}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.user.passport}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.commitment.toFixed(2)}
                  </StyledTableCell>

                  <StyledTableCell align="left" component="th" scope="row">
                    {+row.contribution.toFixed(2)
                      ? '-' + row.contribution.toFixed(2)
                      : (0).toFixed(2)}
                  </StyledTableCell>

                  {/* <StyledTableCell align="left" component="th" scope="row">
                    {row.contribution.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {(row.commitment - row.contribution).toFixed(2)}
                  </StyledTableCell> */}
                  <StyledTableCell align="left" component="th" scope="row">
                    {
                      <Button
                        onClick={() => {
                          handleAddFolioTranscation(row);
                        }}
                        variant="contained"
                        style={{
                          border: '1px solid var(--primary-color)',
                          backgroundColor: 'white',
                          textTransform: 'none',
                          color: 'var(--primary-color)',
                          padding: '4px 8px',
                          fontSize: '0.75rem'
                        }}
                      >
                        {/* <AddIcon sx={{ marginRight: '5px' }} /> */}
                        {role == 'folio' ? 'Add Transaction' : 'View Detail'}
                      </Button>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {isEditing ? (
        <Button
          variant="contained"
          onClick={handlePostNewFolio}
          style={{
            backgroundColor:
              !newData.investorName ||
              !newData.investorPassportNumber ||
              !newData.capitalCommitment ||
              !newData.folioName ||
              !newData.yield
                ? 'gray'
                : '#E95B3E',
            textTransform: 'none',
            marginTop: 10,
            width: '100%',
            padding: '10px 0'
          }}
          disabled={
            !newData.investorName ||
            !newData.investorPassportNumber ||
            !newData.capitalCommitment ||
            !newData.folioName ||
            !newData.yield
          }
        >
          Submit
          <AddIcon sx={{ marginLeft: '10px' }} />
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleAddNewFolio}
          style={{
            backgroundColor: '#E95B3E',
            textTransform: 'none',
            marginTop: 10,
            width: '100%',
            padding: '10px 0'
          }}
        >
          Add New Folio
          <AddIcon sx={{ marginLeft: '10px' }} />
        </Button>
      )} */}
    </>
  );
}
