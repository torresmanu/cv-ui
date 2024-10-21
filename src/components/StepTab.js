import React from 'react'
import {Grid, Typography} from "@material-ui/core";
import {Logo} from "../pages/components/Logo";
import Button from "@material-ui/core/Button";

export const StepTab = ({step, title, button=false, handleButton, style={}}) => {
  const styles ={marginTop: "30px", backgroundColor: '#F9F9F9', borderRadius: '8px'};
  const mergedStyles = {...styles, ...style};
  return(
    <Grid
      container
      spacing={5}
      direction={"row"}
      alignItems={"center"}
      style={mergedStyles}
    >
      {step ?
        <Grid item sm={1} xs={2}>
          <Logo logo={step} width='32px' padding={0} otherStyles={{marginTop: 5}}/>
        </Grid> : <div style={{marginLeft:5}}></div>
      }

      <Grid item sm={9} xs={10}>
        <Typography variant='h5' align={"left"}>{title}</Typography>
      </Grid>
      {button &&
      <Grid item xs={12} sm={2}>
        <Button
          variant="text"
          color="primary"
          onClick={handleButton}
          fullWidth
        >
          Clear all
        </Button>
      </Grid>}
    </Grid>
  )
};
