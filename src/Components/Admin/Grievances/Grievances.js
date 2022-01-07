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
