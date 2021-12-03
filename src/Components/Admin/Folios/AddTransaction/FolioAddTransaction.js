import React, { useState, useEffect } from 'react';
import AdNavbar from '../../Navbar/Navbar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import './FolioAddTransaction.css';
import CustomizedTables from './table';

import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import TransactionContainer from './TransactionContainer/TransactionContainer';

const FolioAddTransaction = () => {
  const history = useHistory();

  return (
    <div className="folio-add-transaction-main">
      <div>
        <AdNavbar />
      </div>
      <div className="folio-add-transaction-container">
        <div className="folio-add-transaction-header">
          <h1 className="folio-add-transaction-header-label">Folios</h1>
          <IconButton
            size="large"
            style={{ color: 'var(--secondary-color)' }}
            onClick={() => {
              history.push('/admin/folios');
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
        <h1 className="folio-add-transaction-subheading">
          Record New Transaction
        </h1>

        <TransactionContainer />
      </div>
    </div>
  );
};

export default FolioAddTransaction;
