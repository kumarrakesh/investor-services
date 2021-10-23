import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu({ options, setFundname, fundname }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (fundname) => {
    setFundname(fundname);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {fundname}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose('');
          }}
        >
          All funds
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            onClick={() => {
              handleClose(option.fundname);
            }}
          >
            {option.fundname}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
