import {default as React} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Button from "@material-ui/core/Button/index";
import {CircularProgress, DialogActions, MenuItem, Select} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {InstanceService} from "../../../services/InstanceService";

export default function AppReleaseDialog({open, handleClose, versionData, loading, institution_id, instance_id}){
  const [eyetracker, setEyetracker] = React.useState('');
  const [version, setVersion] = React.useState('');
  const [versionValues, setVersionValues] = React.useState([]);

  const devAllowedUserIds = ['1', '3']; // Add all allowed user IDs here
  const prodAllowedUserIds = ['1', '3', '47']; // Add all allowed user IDs here
  const isDev = process.env.REACT_APP_API_URL.includes("dev");

  const allowedUserIds = isDev ? devAllowedUserIds : prodAllowedUserIds;

  const handleEyetrackerChange = (event) => {
    event.stopPropagation();
    setEyetracker(event.target.value);
    setVersionValues((Object.values(versionData))[event.target.value])
  };

  const handleVersionChange = (event) => {
    event.stopPropagation();
    setVersion(event.target.value);
  };

  const handleSave = (event) => {
    event.stopPropagation();
    const data = { 
      update_type: 'single', //String to describe the update operation For now must be ‘single’
      institution_id: institution_id,
      institution_instance: instance_id,
      version_string: version,
      eyetracker_key: Object.keys(versionData)[eyetracker] //string key for eyetracker index
    }
    InstanceService.update(data).then((response)=>{
      handleClose();
    });
  };

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="dialog-container" onClick={handleDialogClick}>
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
                {`New App Release for Instance ${instance_id}`}
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
          { !loading ?
            <>
              <Grid container>
                <Grid item xs={12} style={{marginTop: 20}}>
                  <Typography>Select Eyetracker Type</Typography>
                    <Select
                      fullWidth
                      labelId="eyetracker"
                      id="eyetracker"
                      value={eyetracker}
                      label="Eyetracker Type"
                      onChange={handleEyetrackerChange}
                    >{
                      Object.keys(versionData).map((reg, idx) => {
                        // Check if the user_id stored in sessionStorage is different from 1
                        if (!allowedUserIds.includes(sessionStorage.getItem('user_id'))) {
                          // If different, only display "hpomnicept"
                          if (reg === 'hpomnicept' || reg === 'varjo') {
                            return (
                              <MenuItem key={idx} value={idx} name={reg}>
                                {reg}
                              </MenuItem>
                            );
                          } else {
                            // For other items, return null to skip rendering
                            return null;
                          }
                        } else {
                          // If user_id is 1, display all items
                          return (
                            <MenuItem key={idx} value={idx} name={reg}>
                              {reg}
                            </MenuItem>
                          );
                        }
                      })
                      }
                    </Select>
                </Grid>
                <Grid item xs={12} style={{marginTop: 20}}>
                  <Typography>Select Version</Typography>
                    <Select
                      fullWidth
                      labelId="version"
                      id="version"
                      value={version}
                      label="Version"
                      onChange={handleVersionChange}
                      disabled={eyetracker===''}
                    >{
                      versionValues.map((reg)=>{
                      return(<MenuItem value={reg}>{reg}</MenuItem>)
                    })}
                    </Select>
                </Grid>
              </Grid>
            </>
            :
            <>
              <Grid container justify="center">
                <Grid item style={{paddingTop: '10%', paddingBottom: '5%'}}>
                  <CircularProgress/>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item style={{paddingBottom: '5%'}}>
                  <Typography variant='h6'>Loading...</Typography>
                </Grid>
              </Grid>
            </>
          }

        </DialogContent>
        <DialogActions>
          <Button
            className={"cancel"}
            style={{float: "right", borderRadius: '8px', marginBottom: "15px", marginRight: "15px", width: "100px"}}
            color="primary"
            variant="outlined"
            onClick={handleClose}
          >
            CANCEL
          </Button>
          <Button
            className={"cancel"}
            style={{float: "right", borderRadius: '8px', marginBottom: "15px", marginRight: "15px", width: "100px"}}
            color="primary"
            variant="contained"
            onClick={handleSave}
          >
            SAVE
          </Button>
        </DialogActions>
    </Dialog>
  </div>
  )
}
