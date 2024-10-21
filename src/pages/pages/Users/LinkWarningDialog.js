import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider} from "@material-ui/core";
import React from "react";
import {PortalUsersService} from "../../../services/PortalUsersService";
import {useHistory} from "react-router-dom";

export default function UnlinkWarningDialog({open, handleClose, user_name, user_lastname, institution_name, user_id, institution_id}){
  const history = useHistory();

  const handleLink = (e) => {
    e.stopPropagation();
    PortalUsersService.link(user_id, institution_id, 0).then((response)=>{
      e.stopPropagation();
      history.goBack()
    }).catch((error) => {
      handleClose();
    })
  }

  return (
      <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">
                {`Unlink User from ${institution_name}`}
            </DialogTitle>
            <Divider />
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`Are you sure you want to Unlink `}
              <Typography component="strong" variant="inherit">
                <Typography component="em" variant="inherit">
                  {`${user_name} ${user_lastname}`}
                </Typography>
              </Typography>
              {` from `}
              <Typography component="strong" variant="inherit">
                <Typography component="em" variant="inherit">
                  {`${institution_name}`}
                </Typography>
              </Typography>
              {`?`}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleLink} color="primary" variant="contained">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
      </React.Fragment>
)
}
