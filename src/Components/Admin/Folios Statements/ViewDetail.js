import React, { useState, useEffect } from 'react';
import AdNavbar from '../../Admin/Navbar/Navbar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import '../Folios/AddTransaction/FolioAddTransaction.css';
import CustomizedTables from './table';

import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import TransactionContainer from '../Folios/AddTransaction/TransactionContainer/TransactionContainer';

const ViewDetail = () => {
  const history = useHistory();
  const location = useLocation();
  // console.log(location?.state?.row);

  return (
    <div className="folio-add-transaction-main">
      <div>
        <AdNavbar style={{ height: '100% !important' }} />
      </div>
      <div className="folio-add-transaction-container">
        <div className="folio-add-transaction-header">
          <h1 className="folio-add-transaction-header-label">
            {location?.state?.row?.user.name}'s Folio Statements
          </h1>
          <IconButton
            size="large"
            style={{ color: 'var(--secondary-color)' }}
            onClick={() => {
              history.push('/admin/folioStatements');
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
        {/* <h1 className="folio-add-transaction-subheading">
          Record New Transaction
        </h1> */}

        <TransactionContainer />
      </div>
    </div>
  );
};

export default ViewDetail;
