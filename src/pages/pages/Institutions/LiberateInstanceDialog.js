import {default as React} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Button from "@material-ui/core/Button/index";
import {DialogActions} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {InstanceService} from "../../../services/InstanceService";


export default function LiberateInstanceDialog({ open, handleClose, institutionId, instanceId, handleChecked}){

  function handleLiberate() {
    InstanceService.liberate_product(institutionId, instanceId).then((response)=>{
      if(response){
        handleChecked()
        handleClose()
      }
  })
  }

  return (
    <Dialog
      fullWidth
      maxWidth={'sm'}
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
              {`Warning`}
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
            <Typography>Are you sure do you want to release this instance? </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          className={"cancel"}
          style={{float: "right", borderRadius: '8px', marginBottom: "15px", marginRight: "5px", width: "100px"}}
          color="primary"
          variant="outlined"
          onClick={handleClose}
        >
          CANCEL
        </Button>
        <Button
          className={"save"}
          style={{float: "right", borderRadius: '8px', marginBottom: "15px", marginRight: "15px"}}
          variant="contained"
          color="primary"
          onClick={handleLiberate}
        >
          RELEASE
        </Button>
      </DialogActions>
  </Dialog>
  )
}
