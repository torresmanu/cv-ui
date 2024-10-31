import {CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Grid,} from "@material-ui/core";
import React from "react";

export default function LoadingDialog({open, onClose, title}) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <Grid container>
                    <Grid item xs={12}>
                        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom:'5px'}}>
                        <DialogContent>
                            <Grid container>
                                <Grid item>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Por favor, aguarde a que finalice la tarea.
                                    </DialogContentText>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <CircularProgress/>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Grid>
                </Grid>
            </Dialog>
        </React.Fragment>
    );
}
