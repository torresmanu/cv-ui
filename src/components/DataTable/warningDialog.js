import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider} from "@material-ui/core";
import React from "react";

export default function WarningDialog({open,
                                       onClose,
                                       title,
                                       contentText=[],
                                       })
        {
        return (
            <React.Fragment>
                <Dialog
                  open={open}
                  onClose={onClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description">
                  <DialogTitle id="alert-dialog-slide-title">
                      {title}
                  </DialogTitle>
                  <Divider />
                  <DialogContent>
                    {contentText.map((text)=>(
                      <DialogContentText id="alert-dialog-slide-description">
                        {text}
                      </DialogContentText>
                    ))}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={onClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
            </React.Fragment>
)
}
