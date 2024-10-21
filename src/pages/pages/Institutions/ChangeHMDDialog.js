import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from "@material-ui/core";
import { InstanceService } from "../../../services/InstanceService";
import ButtonWithStyles from "../../../pages/components/ButtonWithStyles";

export default function ChangeHMDDialog({
  open,
  handleClose,
  instance_id,
  institution_id,
}) {
  const [newEtSn, setNewEtSn] = useState('');

  const handleSave = () => {
    InstanceService.set_hmd_sn(institution_id, instance_id, newEtSn);
    handleClose();
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Request HMD Change for Instance: ${institution_id}.${instance_id}`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Please enter the new HMD Serial Number for the instance.
          </Typography>
          <TextField
            label="Enter Serial Number"
            variant="standard"
            value={newEtSn}
            onChange={(e) => setNewEtSn(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <ButtonWithStyles onClick={handleClose} variant="text">
            Cancel
          </ButtonWithStyles>
          <ButtonWithStyles onClick={handleSave} variant="contained" disabled={newEtSn===''}>
            Confirm
          </ButtonWithStyles>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
