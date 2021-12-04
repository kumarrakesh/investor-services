import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AdNavbar from '../Navbar/Navbar';
import './Investments.css';
import CustomizedTables from './table';
import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';
import { TextField, Backdrop, CircularProgress } from '@mui/material';
import 'date-fns';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Investments = () => {
  // states
  const [rows, setRows] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  //hooks

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login Again!',
        timer: 3000
      });
      history.push('/');
    } else {
      getInvestments();
    }
  }, []);
  //handlers and functions
  const getInvestments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/transactions/all`,
        {
          method: 'POST',
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem('token'))
          }
        }
      );
      const data = await response.json();
      console.log(data);
      setRows(data.data);
      setDisplayRows(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleLoadingDone = () => {
    setLoading(false);
  };

  const handleApplyDateFilter = () => {
    setLoading(true);
    const filteredRows = rows.filter((row) => {
      let modStartDate = new Date(selectedStartDate);
      modStartDate = modStartDate.setDate(modStartDate.getDate() - 1);
      let modEndDate = new Date(selectedEndDate);
      modEndDate = modEndDate.setDate(modEndDate.getDate() + 1);
      return (
        new Date(row.date) >= modStartDate &&
        new Date(row.date) <= new Date(modEndDate)
      );
    });
    setDisplayRows(filteredRows);
    setLoading(false);
  };
  // const handleDateFilter = async () => {
  //   Promise.all([getUserTransactions(fundname)]).then(() => {
  //     console.log('rows', rows);
  //     let modRows = [...rows];
  //     console.log('before', modRows.length);
  //     modRows = modRows.filter(
  //       (row) =>
  //         new Date(row.date) >= new Date(selectedStartDate) &&
  //         new Date(row.date) <= new Date(selectedEndDate)
  //     );
  //     console.log('after', modRows.length);
  //     setDisplayRows(modRows);
  //   });
  // };

  const handleAddTranscation = () => {
    history.push('/admin/investments/add');
  };

  return (
    <div className="investments-main">
      <AdNavbar />

      <div id="investments-container">
        <h1 className="investments-heading">Investments</h1>
        <h1 className="investments-subheading">Overview</h1>
        <p className="investments-total-investors">Total Investments</p>
        <p className="investments-total-no">{rows.length}</p>
        <div className="investments-inv-btns">
          <div>Filter by date:</div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="From Date"
              variant="outlined"
              inputFormat="dd/MM/yyyy"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              disableCloseOnSelect={false}
              renderInput={(params) => <TextField {...params} />}
              className="padding-for-inputs"
              maxDate={selectedEndDate}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="To Date"
              inputFormat="dd/MM/yyyy"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              disableCloseOnSelect={false}
              className="padding-for-inputs"
              renderInput={(params) => <TextField {...params} />}
              minDate={selectedStartDate}
              maxDate={new Date()}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            id="investors-apply-btn"
            onClick={handleApplyDateFilter}
          >
            Apply
          </Button>
        </div>

        <CustomizedTables
          rows={rows}
          setRows={setRows}
          setDisplayRows={setDisplayRows}
          displayRows={displayRows}
          loading={loading}
          setLoading={setLoading}
        />
        <Button
          variant="contained"
          onClick={handleAddTranscation}
          style={{
            textTransform: 'none',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            padding: '1rem'
          }}
        >
          Record New Transaction
        </Button>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Investments;

//------- For Inline Row Addition in a table---------------

//import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import SearchBar from 'material-ui-search-bar';
// import Button from '@mui/material/Button';
// import Swal from 'sweetalert2';
// import AddIcon from '@mui/icons-material/Add';
// import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import {
//   Select,
//   MenuItem,
//   Backdrop,
//   CircularProgress,
//   FormHelperText
// } from '@mui/material';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: '#F6F8FA !important',
//     color: 'var(--secondary-color)',
//     padding: '1rem',
//     fontSize: '14px',
//     fontWeight: 700,
//     borderBottom: '1px solid #CECECE'
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     color: 'var(--secondary-color)',
//     padding: '0.6rem 1rem',
//     border: 'none'
//   }
// }));
// // border: '1px solid black'

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: 'white !important',
//     border: 'none !important',
//     outline: 'none'
//   },
//   '&:nth-of-type(even)': {
//     backgroundColor: '#F6F8FA',
//     border: 'none !important',
//     outline: 'none'
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 'none !important',
//     outline: 'none'
//   }
// }));

// export default function CustomizedTables({
//   displayRows,
//   setDisplayRows,
//   loading,
//   setLoading,
//   values
// }) {
//   //states
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [newData, setNewData] = useState({
//     date: new Date(),
//     type: 1,
//     amount: null
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [gotName, setGotName] = useState(false);
//   const [investorName, setInvestorName] = useState('');
//   //other hooks

//   //handlers
//   const handleDateChange = (newValue) => {
//     setSelectedDate(newValue);
//   };
//   const handleAddNewFolioTransaction = () => {
//     console.log(displayRows);
//     setDisplayRows([
//       ...displayRows,
//       {
//         role: 'new',
//         userId: newData.investorPassportNumber,
//         folioId: newData.folioId,
//         type: '1',
//         amount: '300',
//         date: new Date(),
//         narration: 'invest Money'
//       }
//     ]);
//     // setIsEditing(true);
//     setIsEditing(true);
//   };
//   const handlePostNewFolioTransaction = async () => {
//     setLoading(true);

//     let folioData = {
//       userId: values.investorPassport,
//       folioId: values.folioId,
//       type: newData.type,
//       amount: newData.amount,

//       date: selectedDate
//     };
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API}/api/add/folio/transaction`,
//         {
//           method: 'POST',
//           body: JSON.stringify({ ...folioData }),
//           headers: {
//             'x-access-token': JSON.parse(localStorage.getItem('token')),
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       const data = await response.json();
//       console.log(data);
//       if (!data.status)
//         Swal.fire(
//           data.message || data.error || "Could'nt add the transaction",
//           '',
//           'error'
//         );
//       else {
//         Swal.fire('Transaction noted!', '', 'success');
//         const response1 = await fetch(
//           `${process.env.REACT_APP_API}/api/get/folio/transaction`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'x-access-token': JSON.parse(localStorage.getItem('token'))
//             },
//             body: JSON.stringify({
//               folioId: values.folioId
//             })
//           }
//         );
//         const data1 = await response1.json();
//         // console.log('fg' + data1);
//         setDisplayRows(data1.data);
//         setIsEditing(false);
//         setNewData({
//           date: new Date(),
//           type: 1,
//           amount: null
//         });
//       }
//     } catch (err) {
//       Swal.fire('Some error occured', '', 'error');
//     }
//     setLoading(false);
//   };
//   return (
//     <>
//       <Paper>
//         <TableContainer
//           component={Paper}
//           sx={{
//             maxHeight: '300px',
//             borderRadius: 2,
//           }}
//           style={{ boxShadow: '0px 0px 0px 1px #CECECE' }}
//         >
//           <Table aria-label="customized table"  stickyHeader sx={{
//             minWidth: 700,
//             overflow: 'scroll'
//           }}>
//             <TableHead style={{ border: '1px solid red' , color:'silver'}}>
//               <TableRow>
//                 <StyledTableCell>Date</StyledTableCell>
//                 <StyledTableCell align="left">Transaction Type</StyledTableCell>
//                 <StyledTableCell align="left">Capital Contribution</StyledTableCell>
//                 <StyledTableCell align="center">Yield Payment</StyledTableCell>
//                 <StyledTableCell align="center">Redemption</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {!displayRows.length && (
//                 <StyledTableRow>
//                   <StyledTableCell component="th" scope="row">
//                     {loading ? 'Loading...' : 'No transactions...'}
//                   </StyledTableCell>
//                 </StyledTableRow>
//               )}
//               {displayRows.map((row) =>
//                 row.role == 'new' ? (
//                   <StyledTableRow key={row._id}>
//                     <StyledTableCell component="th" scope="row">
//                       <LocalizationProvider dateAdapter={AdapterDateFns}>
//                         <MobileDatePicker
//                           label="Date"
//                           inputFormat="dd/MM/yyyy"
//                           value={selectedDate}
//                           onChange={handleDateChange}
//                           disableCloseOnSelect={false}
//                           renderInput={(params) => (
//                             <TextField
//                               required
//                               inputProps={{ style: { fontSize: '0.9rem' } }}
//                               InputLabelProps={{
//                                 style: { fontSize: '0.8rem' }
//                               }}
//                               {...params}
//                               sx={{
//                                 width: '100%',
//                                 minWidth: 95,
//                                 fontSize: '0.1rem !important',
//                                 padding: '1px'
//                               }}
//                             />
//                           )}
//                         />
//                       </LocalizationProvider>
//                     </StyledTableCell>
//                     <StyledTableCell align="left" component="th" scope="row">
//                       {/* {row.type == 1
//                         ? 'Invested'
//                         : row.type == 2
//                         ? 'Yielded'
//                         : 'Withdrawn'} */}
//                       <FormControl variant="standard" sx={{ width: '100%' }}>
//                         <Select
//                           name="action"
//                           variant="outlined"
//                           value={newData.type}
//                           onChange={(e) => {
//                             setNewData({
//                               ...newData,
//                               type: e.target.value
//                             });
//                           }}
//                         >
//                           <MenuItem value="1">Contribution</MenuItem>
//                           <MenuItem value="2">Yield Payment</MenuItem>
//                           <MenuItem value="3">Redemption</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </StyledTableCell>
//                     <StyledTableCell align="left" component="th" scope="row">
//                       {newData.type == 1 ? (
//                         <TextField
//                           required
//                           type="number"
//                           id="outlined-required"
//                           sx={{ minWidth: 70 }}
//                           value={newData.amount}
//                           inputProps={{ style: { fontSize: '0.9rem' } }}
//                           InputLabelProps={{
//                             style: { fontSize: '0.8rem' }
//                           }}
//                           onChange={(e) => {
//                             setNewData({
//                               ...newData,
//                               amount: e.target.value
//                             });
//                           }}
//                           label="Amount"
//                         />
//                       ) : (
//                         '-'
//                       )}
//                     </StyledTableCell>
//                     <StyledTableCell align="center" component="th" scope="row">
//                       {newData.type == 2 ? (
//                         <TextField
//                           required
//                           id="outlined-required"
//                           sx={{ minWidth: 70 }}
//                           value={newData.amount}
//                           inputProps={{ style: { fontSize: '0.9rem' } }}
//                           InputLabelProps={{
//                             style: { fontSize: '0.8rem' }
//                           }}
//                           onChange={(e) => {
//                             setNewData({
//                               ...newData,
//                               amount: e.target.value
//                             });
//                           }}
//                           label="Amount"
//                         />
//                       ) : (
//                         '-'
//                       )}
//                     </StyledTableCell>
//                     <StyledTableCell align="center" component="th" scope="row">
//                       {newData.type == 3 ? (
//                         <TextField
//                           required
//                           id="outlined-required"
//                           sx={{ minWidth: 70 }}
//                           value={newData.amount}
//                           inputProps={{ style: { fontSize: '0.9rem' } }}
//                           InputLabelProps={{
//                             style: { fontSize: '0.8rem' }
//                           }}
//                           onChange={(e) => {
//                             setNewData({
//                               ...newData,
//                               amount: e.target.value
//                             });
//                           }}
//                           label="Amount"
//                         />
//                       ) : (
//                         '-'
//                       )}
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ) : (
//                   <StyledTableRow key={row._id}>
//                     <StyledTableCell component="th" scope="row">
//                       {new Date(row.date).toLocaleDateString('en-GB')}
//                     </StyledTableCell>
//                     <StyledTableCell align="center" component="th" scope="row">
//                       {row.type == 1
//                         ? 'Contribution'
//                         : row.type == 2
//                         ? 'Yield Payment'
//                         : 'Redemtion'}
//                     </StyledTableCell>
//                     <StyledTableCell align="left" component="th" scope="row">
//                       {row.type == 1 ? row.amount : '-'}
//                     </StyledTableCell>
//                     <StyledTableCell align="center" component="th" scope="row">
//                       {row.type == 2 ? row.amount : '-'}
//                     </StyledTableCell>
//                     <StyledTableCell align="center" component="th" scope="row">
//                       {row.type == 3 ? row.amount : '-'}
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 )
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//       {isEditing ? (
//         <Button
//           variant="contained"
//           onClick={handlePostNewFolioTransaction}
//           style={{
//             backgroundColor:
//               !newData.date || !newData.type || !newData.amount
//                 ? 'gray'
//                 : '#E95B3E',
//             textTransform: 'none',
//             marginTop: 10,
//             width: '100%',
//             padding: '10px 0'
//           }}
//           disabled={!newData.date || !newData.type || !newData.amount}
//         >
//           Submit
//           <AddIcon sx={{ marginLeft: '10px' }} />
//         </Button>
//       ) : (
//         <Button
//           variant="contained"
//           onClick={handleAddNewFolioTransaction}
//           style={{
//             backgroundColor: '#E95B3E',
//             textTransform: 'none',
//             marginTop: 10,
//             width: '100%',
//             padding: '10px 0'
//           }}
//         >
//           Add New Folio Transaction
//           <AddIcon sx={{ marginLeft: '10px' }} />
//         </Button>
//       )}
//     </>
//   );
// }
