import React from 'react';
import styled from "styled-components";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography as MuiTypography
} from "@material-ui/core/index";

import Divider from '../pages/components/Divider';

const Card = styled(MuiCard)`
  margin-top: 20px;
  background: #F9F9F9;
`;

const CardContent = styled(MuiCardContent)`
  border: none;
  border-radius: 10px 10px 10px 10px;
`;

const Text = styled(MuiTypography)`
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 24px;
text-transform: capitalize;

/* blue/100 */

color: #3397EF;
`;



function CardContainer({ title, children }) {
  return (
    <Card mb={12} style={{ borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', height: '100%'}}>
      <CardContent>
        {title !== "" &&
        <React.Fragment>
          <Text gutterBottom variant="h6" component="h2">
            {title}
          </Text>
          <Divider />
        </React.Fragment>
        }
        
        {children}
      </CardContent>
    </Card>
  );
};

export default CardContainer;
