import {default as React} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Button from "@material-ui/core/Button/index";
import {DialogActions} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ComputerIcon from '@material-ui/icons/Computer';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ButtonWithStyles from "../../components/ButtonWithStyles.js";
import DataWithIcon from "../../../components/DataWithIcon";
import '../../../App.css';

export default function HardwareInformationDialog({ open, handleClose, pc_sn, pc_model, et_sn, et_model}){
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
              {`Last Hardware Information`}
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
      <DialogContent style={{marginLeft: "10px"}}>
        {
          <>
            <Grid container spacing={5}>        
              <DataWithIcon Icon={ComputerIcon} label="PC Serial:" value={pc_sn} />
            </Grid>
            <Grid container spacing={5} className="marginTop20">
              <DataWithIcon Icon={ComputerIcon} label="PC Model:" value={pc_model} />
            </Grid>
            <Grid container spacing={5} className="marginTop20">
              <DataWithIcon Icon={VisibilityOutlinedIcon} label="Headset Serial:" value={et_sn} />
            </Grid>
            <Grid container spacing={5} className="marginTop20">
              <DataWithIcon Icon={VisibilityOutlinedIcon} label="Headset Model:" value={et_model} />
            </Grid>
          </>
  
        }
      </DialogContent>
      <DialogActions>
        <ButtonWithStyles
          variant="contained"
          onClick={handleClose}
        >
          ACCEPT
        </ButtonWithStyles>
      </DialogActions>
  </Dialog>
  )
}
