import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Backdrop, CircularProgress } from '@mui/material';
import AdNavbar from '../Navbar/Navbar';
import './Grievances.css';
import CustomizedTables from './table';
import {
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  Autocomplete
} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import 'date-fns';
import Swal from 'sweetalert2';
import useWindowSize from '../../../utils/useWindowSize';
import Button from '@mui/material/Button';

const AdminGrievances = () => {
  //states
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState({});
  const [displayRows, setDisplayRows] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [update, setUpdate] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [ogRows, setOgRows] = useState([]);
  const [folioNumber, setFolioNumber] = React.useState({});
  const size = useWindowSize();
  //hooks
  let history = useHistory();
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
      getAllQueries();
    }
  }, []);
  useEffect(() => {
    getAllQueries();
  }, [update]);
  //handlers
  const handleLoadingDone = () => {
    // setLoading(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getAllQueries = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API}/api/query/all`, {
      headers: {
        'x-access-token': JSON.parse(localStorage.getItem('token'))
      }
    });
    const data = await response.json();
    console.log(data.data);
    setQueries(data.data);
    setDisplayRows(data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (
      !selectedQuery ||
      (Object.keys(selectedQuery).length === 0 &&
        selectedQuery.constructor === Object)
    ) {
      setDisplayRows(queries);
    } else {
      setDisplayRows([selectedQuery]);
    }
  }, [selectedQuery]);

  return (
    <div className="grievances-admin-main">
      <AdNavbar />
      <div id="grievances-admin-container">
        <h1 className="grievances-admin-title">Queries</h1>
        <div className="grievances-admin-number-header">
          <div>
            <p className="total-folios">Total</p>
            <p className="total-folios-no">{queries?.length}</p>
          </div>

          <div>
            <p className="total-folios">Unresolved</p>
            <p className="total-folios-no">
              {queries?.filter((el) => !el.isResolved).length}
            </p>
          </div>

          <div>
            <p className="total-folios">Resolved</p>
            <p className="total-folios-no">
              {queries?.filter((el) => el.isResolved).length}
            </p>
          </div>
        </div>

        <FormControl variant="standard">
          <Autocomplete
            options={queries}
            renderInput={(params) => (
              <TextField
                {...params}
                className="folio-searchbar"
                placeholder="Search by Query ID or Investor's Name"
              />
            )}
            value={selectedQuery}
            onChange={(event, newValue) => {
              setSelectedQuery(newValue);
            }}
            getOptionLabel={(option) => {
              if (option?.queryId)
                return `${option?.queryId} - ${option?.user?.name}`;
              return '';
            }}
            forcePopupIcon={true}
            popupIcon={<SearchIcon htmlColor="var(--primary-color)" />}
          />
        </FormControl>

        {size.width <= 768 ? (
          <div className="folio-card-mobile-container">
            {displayRows.map((row) => {
              console.log(row);
              return (
                <div className="folio-card-mobile" key={row._id}>
                  <div className="folio-card-mobile-header-top">
                    <div className="folio-card-mobile-header-folio-date">
                      {new Date(row.date).toLocaleDateString('en-GB')}
                    </div>
                    <div
                      style={{
                        height: '5px',
                        width: '5px',
                        backgroundColor: 'gray',
                        borderRadius: '1rem'
                      }}
                    ></div>
                    <p className="folio-card-mobile-header-name">
                      {row.folioNumber}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      className="folio-card-mobile-header"
                      style={{ flexDirection: 'row', flex: '1.3' }}
                    >
                      <div className="folio-card-mobile-header-name">
                        {row.user?.name}
                      </div>
                      <p className="folio-card-mobile-header-folio">
                        {row.user?.passport}
                      </p>
                    </div>

                    <div
                      className="folio-card-mobile-header"
                      style={{
                        textAlign: 'left',
                        flex: '1',
                        fontSize: '14px',
                        marginTop: '0.5rem'
                      }}
                    >
                      <p className="folio-card-mobile-body-row-item">
                        <span style={{ color: '#666' }}>Commit. </span>
                        <span>
                          {' '}
                          {Math.round((row.commitment + Number.EPSILON) * 100) /
                            100}
                        </span>
                      </p>
                      <p className="folio-card-mobile-body-row-item">
                        <span style={{ color: '#666' }}>Tot. Contri. </span>
                        <span>
                          {' '}
                          {Math.round(
                            (row.contribution + Number.EPSILON) * 100
                          ) / 100}
                        </span>
                      </p>

                      <p
                        className="folio-card-mobile-body-row-item"
                        id="folio-card-pending-amt-item"
                      >
                        <span style={{ color: '#666' }}>Pending Amt. </span>
                        <span
                          style={{
                            color: '#333333'
                          }}
                        >
                          {' '}
                          {Math.round(
                            (row.commitment -
                              row.contribution +
                              Number.EPSILON) *
                              100
                          ) / 100}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '0.3rem'
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        color: 'var(--primary-color)',
                        backgroundColor: 'white',
                        border: '1px solid var(--primary-color)',
                        fontSize: '0.7rem',
                        width: '9rem',
                        textTransform: 'none'
                      }}
                      onClick={() => {}}
                    >
                      {row.isResolved ? 'Update' : 'Resolve'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="gr-ad-inv-table-grievances">
            <CustomizedTables
              rows={queries}
              displayRows={displayRows}
              setDisplayRows={setDisplayRows}
              setUpdate={setUpdate}
              setLoading={setLoading}
              loading={loading}
            />
          </div>
        )}
      </div>
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
};

export default AdminGrievances;
