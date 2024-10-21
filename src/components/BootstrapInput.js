import React from 'react';
import { withStyles, InputBase, Tooltip } from '@material-ui/core';

const BaseBootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#3397EF',
    },
    '&:hover': {
      borderColor: '#3397EF',
    },
    whiteSpace: 'nowrap',         // Prevent text from wrapping to the next line
    overflow: 'hidden',           // Hide the overflowed text
    textOverflow: 'ellipsis',     // Show ellipsis ('...') when the text overflows

  },
}))(InputBase);

const BootstrapInput = (props) => { 
  return (
    <Tooltip title={props.value || ''} arrow>
      <BaseBootstrapInput {...props} />
    </Tooltip>
  );
};

export default BootstrapInput;