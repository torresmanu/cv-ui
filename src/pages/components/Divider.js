import React from 'react';
import styled from 'styled-components';
import { Divider as MuiDivider } from '@material-ui/core';

const StyledDivider = styled(MuiDivider)`
  && {
    margin-bottom: 10px;
  }
`;

const Divider = () => {
  return <StyledDivider />;
};

export default Divider;
