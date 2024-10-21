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
import ButtonWithStyles from "../../../components/ButtonWithStyles";

export default function DeleteDialog({open, handleClose, handleDelete, evaluation}){

  return (
      <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">
                {`Delete Evaluation`}
            </DialogTitle>
            <Divider />
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`Are you sure you want to Delete `}
              <Typography component="strong" variant="inherit">
                <Typography component="em" variant="inherit">
                  {`${evaluation}`}
                </Typography>
              </Typography>
              {`?`}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <ButtonWithStyles
                onClick={handleClose}
                color="primary"
                variant="text"
              >
                Cancel
              </ButtonWithStyles>
              <ButtonWithStyles 
                className={"delete"}
                variant="outlined"
                color="delete"
                fullwidth
                onClick={handleDelete}
              > 
                Delete
              </ButtonWithStyles>
            </DialogActions>
          </Dialog>
      </React.Fragment>
)
}
