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
import useWindowSize from '../../../../utils/useWindowSize';

const FolioAddTransaction = () => {
  const history = useHistory();
  const size = useWindowSize();

  return (
    <div className="folio-add-transaction-main">
      {size.width > 768 ? (
        <div>
          <AdNavbar />
        </div>
      ) : (
        <div className="add-folio-header">
          <IconButton
            size="large"
            style={{ color: '#132f5e' }}
            onClick={() => {
              history.push('/admin/folios');
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <h2 className="add-folio-title">Record New Transaction</h2>
        </div>
      )}

      <div className="folio-add-transaction-container">
        {size.width > 768 && (
          <div>
            <div className="add-folio-header-pc">
              <h2 className="add-folio-title">Folio Statements</h2>
              <IconButton
                size="large"
                style={{ color: '#132f5e' }}
                onClick={() => {
                  history.push('/admin/folios');
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </div>
            <h1 id="add-folio-subtitle">Record New Transaction</h1>
          </div>
        )}
        <TransactionContainer />
      </div>
    </div>
  );
};

export default FolioAddTransaction;
