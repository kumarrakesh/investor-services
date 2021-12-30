import React, { useState, useEffect } from 'react';
import AdNavbar from '../../Navbar/Navbar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import './FolioEditTransaction.css';
import CustomizedTables from '../AddTransaction/table';

import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import TransactionContainer from '../AddTransaction/TransactionContainer/TransactionContainer';
import useWindowSize from '../../../../utils/useWindowSize';

const FolioEditTransaction = () => {
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
              <h2 className="add-folio-title">Edit Transaction</h2>
              <IconButton
                size="large"
                style={{ color: '#132f5e' }}
                onClick={() => {
                  history.push({
                    pathname: '/admin/folioStatements/viewDetail',
                    state: {
                      from: history.location.state.from,
                      row: history.location.state.folio
                    }
                  });
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </div>
            {/* <h1 id="add-folio-subtitle">Record New Transaction</h1> */}
          </div>
        )}
        <TransactionContainer />
      </div>
    </div>
  );
};

export default FolioEditTransaction;
