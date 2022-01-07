import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import './AddComment.css';
import Swal from 'sweetalert2';
import { width } from '@mui/system';

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

const statusGiver = (status) => {
  if (status) {
    return (
      <div style={{ color: '#0B970B', display: 'flex', gap: '1ch' }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 3.18L8.59 14.6L4.35 10.36L5.76 8.95L8.59 11.78L18.59 1.78L20 3.18ZM17.79 8.22C17.92 8.79 18 9.39 18 10C18 14.42 14.42 18 10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C11.58 2 13.04 2.46 14.28 3.25L15.72 1.81C14.1 0.67 12.13 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 8.81 19.78 7.67 19.4 6.61L17.79 8.22Z"
            fill="#0B970B"
          />
        </svg>
        <span>Resolved</span>
      </div>
    );
  }
  return (
    <div style={{ color: '#FE0000', display: 'flex', gap: '1ch' }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
          fill="#FE0000"
        />
      </svg>

      <span>Unresolved</span>
    </div>
  );
};

const AddComment = () => {
  const history = useHistory();
  const location = useLocation();
  const [row, setRow] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleClosePage = () => {
    history.push('/admin/queries');
  };

  const handleSaveQuery = async (e, row) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/query/update`,
      {
        method: 'POST',
        body: JSON.stringify({
          queryId: location.state.row._id,
          reply: message,
          isResolved: true
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': JSON.parse(localStorage.getItem('token'))
        }
      }
    );
    const data = await response.json();
    setLoading(false);
    if (data.status) {
      successSwal.fire('Updated the Query!', '', 'success');
      history.push('/admin/queries');
    } else errorSwal.fire('Error while updating', data?.error, 'error');
    // console.log(data);
  };

  useEffect(() => {
    if (location?.state?.row) {
      setRow(location.state.row);
    }
  }, [location]);

  return (
    <div>
      <div className="add-folio-header">
        <IconButton
          size="large"
          style={{ color: '#132f5e' }}
          onClick={handleClosePage}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <h2 className="add-folio-title">Add Comment</h2>
      </div>

      <div className="query-main-top">
        <div className="query-main-top-row">
          <div className="query-main-top-row-title">Query ID</div>
          <div className="query-main-top-row-value">#{row?._id}</div>
        </div>

        <div className="query-main-top-row">
          <div className="query-main-top-row-title">From</div>
          <div className="query-main-top-row-value">{row?.user?.name}</div>
        </div>

        <div className="query-main-top-row">
          <div className="query-main-top-row-title">Query Subject</div>
          <div className="query-main-top-row-value">{row?.subject || 'NA'}</div>
        </div>

        <div className="query-main-top-row">
          <div className="query-main-top-row-title">Query Detail</div>
          <div className="query-main-top-row-value">
            {row?.description || 'NA'}
          </div>
        </div>
      </div>

      <div
        className="query-dialog-details"
        style={{ backgroundColor: 'white' }}
      >
        <div className="query-dialog-details-row">
          <div className="query-dialog-details-row-label">Status</div>
          <div className="query-dialog-details-row-data">
            {statusGiver(row.isResolved)}
          </div>
        </div>
        {row.isResolved && (
          <div className="query-dialog-details-row">
            <div className="query-dialog-details-row-label">Added comment</div>
            <div className="query-dialog-details-row-data">
              {row.reply || <i>Not added yet</i>}
            </div>
          </div>
        )}
        <div
          className="query-dialog-details-row"
          style={{ alignItems: 'flex-start' }}
        >
          <div className="query-dialog-details-row-label">
            {row.isResolved ? 'Update comment' : 'Add comment'}
          </div>
          <div
            className="query-dialog-details-row-data"
            id="add-comment-details-row-data"
          >
            <TextField
              autoFocus
              // margin="dense"
              id="name"
              type="text"
              fullWidth
              // variant="standard"
              value={message}
              onChange={handleChangeMessage}
              multiline
              rows={2}
              sx={{ width: '100%' }}
              className="add-folio-searchbar-multiline"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-evenly',
          gap: 20,
          padding: '1rem',
          flex: '1'
        }}
      >
        <Button
          onClick={handleClosePage}
          variant="outlined"
          style={{
            borderRadius: '4px',
            border: '1px solid var(--primary-color)',
            color: 'var(--primary-color)',
            backgroundColor: 'white',
            fontSize: '1rem',
            fontWeight: '500'
          }}
          className="add-multiple-new-transaction-button"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveQuery}
          disabled={!message.length}
          variant="outlined"
          className="submit-multiple-new-transaction-button"
          sx={{
            borderRadius: '4px',
            backgroundColor: message.length
              ? 'var(--primary-color) !important'
              : 'hsl(10deg, 35%, 70%) !important',
            color: message.length ? 'white' : 'hsl(10deg, 10%, 90%) !important'
          }}
        >
          {row?.reply ? 'Update' : 'Submit'}
        </Button>
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

export default AddComment;
