import {default as React} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Button from "@material-ui/core/Button/index";
import {CircularProgress, DialogActions} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ButtonWithStyles from "../../components/ButtonWithStyles";
import {FileCopyOutlined, Done} from "@material-ui/icons";

export default function PasswordRecoveryDialog({ open, handleClose, password, loading}){
  const [isCopied, setIsCopied] = React.useState(false);
  const handleCopyData = (e) => {
    e.stopPropagation();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(password).then(() => {
        setIsCopied(true);
      }).catch((err) => {
        console.error('Error copying to clipboard', err);
      });
    } else {
      console.error('Clipboard API not available');
      alert('Clipboard API not available. Please copy manually.');
    }
  }
  const startIcon = isCopied ? <Done /> : <FileCopyOutlined />;

  return (
    <Dialog
      fullWidth
      maxWidth={'sm'}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle disableTypography>
        <Grid container spacing={3} style={{alignItems: "end"}}>
          <Grid item xs={11}>
            <Typography variant="h5" gutterBottom>
              {`Recovery Password`}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={handleClose} >
              &times;
            </Button>
          </Grid>
        </Grid>
        <Divider/>
      </DialogTitle>
      <DialogContent padding={16}>
        { !loading ?
          <>
            <Grid container>
              <Grid item xs={4}>
                <Typography>Your new password is: </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant={'h5'}>{password}</Typography>
              </Grid>
            </Grid>
          </>
          :
          <>
            <Grid container justify="center">
              <Grid item>
                <CircularProgress/>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item>
                <Typography variant='h6'>Retrieving New Password...</Typography>
              </Grid>
            </Grid>
          </>
        }

      </DialogContent>
      <DialogActions>
          <Button 
            variant="text"
            color="primary"
            onClick={handleCopyData}
            startIcon={startIcon}
          >
            Copy Password
        </Button>
        <ButtonWithStyles
          className={"cancel"}
          color="primary"
          variant="contained"
          onClick={handleClose}
        >
          ACCEPT
        </ButtonWithStyles>
      </DialogActions>
  </Dialog>
  )
}