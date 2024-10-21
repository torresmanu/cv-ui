import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import PaddedPaper from "../../../components/PaddedPaper";
import Button from "@material-ui/core/Button";
import {Logo} from "../../components/Logo";
import arrow from "../../../images/arrow.png";
import {useHistory} from "react-router-dom";

export default function RegisterForm(
  {  title,
     displayBack=true,
     marginRight="0%",
     marginLeft="0%",
     marginBottom = '20px',
     children
  }) {
  const history = useHistory();

  return (
    <PaddedPaper marginright={marginRight} marginleft={marginLeft}>
      { displayBack ?
        <Grid item>
          <Button
             color='primary'
             style={{color: '#3397EF'}}
             onClick={(e)=>{
               e.stopPropagation();
               history.goBack();
             }}
           >
            <Logo logo={arrow} otherStyles={{paddingRight: 10}}/>
            {` Back`}
           </Button>
        </Grid>
      :
      <div></div>}
      <Typography component="h1" variant="h3" style={{marginBottom: marginBottom}}>
        {title}
      </Typography>
      {children}
    </PaddedPaper>
  );
}
