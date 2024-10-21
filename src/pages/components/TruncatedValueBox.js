import React from 'react';
import { Box, Tooltip } from '@material-ui/core';

const TruncatedValueBox = ({ label, value }) => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '5px',
        marginTop: '10px',
      }}
    >
      <Tooltip title={value || ''} arrow>
        <Box
          component="span"
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}
        >
          {label}: <strong>{value}</strong>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default TruncatedValueBox;