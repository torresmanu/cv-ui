import {default as React} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Button from "@material-ui/core/Button/index";
import { DialogActions } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    float: "right",
    borderRadius: '8px',
    marginTop: "15px",
    marginRight: "15px",
    marginBottom: "15px",
    width: "100px"
  }
});

export default function DatasetErrorDialog({ open, handleClose, handlePlot, title}){
  const classes = useStyles();
  const selection = 'barChart';

  return (
    <Dialog
      fullWidth
      maxWidth={'xs'}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{
        minHeight: '100vh',
        maxHeight: '100vh',
      }}
    >
      <DialogTitle disableTypography>
        <Grid container spacing={3} style={{alignItems: "end"}}>
          <Grid item xs={11}>
            <Typography variant="h5" gutterBottom>
              Dataset already exists
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={handleClose} style={{margin: "0px", minWidth: "100%", fontSize: "16px"}}>
              &times;
            </Button>
          </Grid>
        </Grid>
        <Divider/>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='body1'>
              Please set a dataset name that is not used.
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                disabled={selection === ''}
                onClick={handleClose}
              >
                OK
              </Button>
            </div>
          </Grid>
        </Grid>
      </DialogActions>
  </Dialog>
  )
}
