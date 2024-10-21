import {default as React} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Button from "@material-ui/core/Button/index";
import {CircularProgress, DialogActions} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {FileCopyOutlined, Done} from "@material-ui/icons";


export default function CreateInstanceDialog({ open, handleClose, responseData}){
  const [isCopied, setIsCopied] = React.useState(false);
  const handleCopyData = () => {
    navigator.clipboard.writeText(`Institution Number: ${responseData?.institution}\nInstance Number: ${responseData?.instance_number}\nActivation Code: ${responseData?.activation_code}\nPassword: ${responseData?.app_rec_passwd}`).then(() => {
      setIsCopied(true);
    }).catch((err) => {
      console.error('Error copying to clipboard', err);
    });
  }
  const startIcon = isCopied ? <Done /> : <FileCopyOutlined />;
  const title = responseData?.http_code === 800 ? 'Instance Creation Failed' : 'Instance Created';

  return (
    <Dialog
      fullWidth
      maxWidth={'md'}
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
              {title}
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
        { responseData !== '' && responseData?.http_code !== 800?
          <>
            <Grid container>
              <Grid item xs={4}>
                <Typography>Institution Number: </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant={'h5'}>{responseData?.institution}</Typography>
              </Grid>
            </Grid>
            <Grid container style={{marginTop: "5px"}}>
              <Grid item xs={4}>
                <Typography>Instance Number: </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant={'h5'}>{responseData?.instance_number}</Typography>
              </Grid>
            </Grid>
            <Grid container style={{marginTop: "5px"}}>
              <Grid item xs={4}>
                <Typography>Activation Code: </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant={'h5'}>{responseData?.activation_code}</Typography>
              </Grid>
            </Grid>
            <Grid container style={{marginTop: "5px"}}>
              <Grid item xs={4}>
                <Typography>Password: </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant={'h5'}>{responseData?.app_rec_passwd}</Typography>
              </Grid>
            </Grid>
          </>
          :
          responseData?.http_code === 800 ?
          <Typography variant={'h6'}>{responseData?.message || "error"}</Typography>
          :
          <>
            <Grid container justify="center">
              <Grid item style={{paddingTop: '10%', paddingBottom: '5%'}}>
                <CircularProgress/>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item style={{paddingBottom: '5%'}}>
                <Typography variant='h6'>Creating new Instance...</Typography>
              </Grid>
            </Grid>
          </>
        }

      </DialogContent>
      <DialogActions>
          {responseData !== '' && responseData?.http_code !== 800 &&
           <Button 
            variant="text"
            color="primary"
            style={{marginBottom: "15px"}}
            onClick={handleCopyData}
            startIcon={startIcon}
          >
            Copy Instance Data
          </Button>}
        <Button
          className={"cancel"}
          style={{float: "right", borderRadius: '8px', marginBottom: "15px", marginRight: "15px", width: "100px"}}
          color="primary"
          variant="contained"
          onClick={handleClose}
        >
          {responseData?.http_code !== 800 ? 'ACCEPT' : 'CLOSE'}
        </Button>
      </DialogActions>
  </Dialog>
  )
}
