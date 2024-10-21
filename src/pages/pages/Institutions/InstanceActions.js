import React from 'react'
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import EditIcon from "@material-ui/icons/EditOutlined";
import {IconButton, Tooltip} from "@material-ui/core";
import Button from "@material-ui/core/Button/index";
import GLOBALS from "../../../services/GLOBALS.json";
import PasswordRecoveryDialog from "../Users/PasswordRecoveryDialog";
import {InstanceService} from "../../../services/InstanceService";
import AppReleaseDialog from "./AppReleaseDialog";
import CreateInstanceDialog from "./CreateInstanceDialog";
import HardwareInformationDialog from './HardwareInformationDialog';

export default function InstanceActions (
  {
     row_data,
     institution_id,
     institution_name,
     change,
     setChange,
     openCreateDialog,
     setOpenCreateDialog,
     responseData,
  }) {
const history = useHistory();
const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
const canEdit = permissions['instances']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_EDIT_INSTANCES));
const canUpdateInstances = permissions['instances']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_UPDATE_INSTANCES));
const [openHardwareDialog, setOpenHardwareDialog] = React.useState(false);
const [openPasswordDialog, setOpenPasswordDialog] = React.useState(false);
const [openVersionDialog, setOpenVersionDialog] = React.useState(false);
const [password , setPassword] = React.useState('');
const [versionData , setVersionData] = React.useState('');
const [loading , setLoading] = React.useState(true);
const [loadingVersionList , setLoadingVersionList] = React.useState(true);

const instance_id = row_data[0];
const enabled = row_data[5];
const pc_serial_number = row_data[6];
const vr_serial_number = row_data[8];

function handleClose(){
  setOpenVersionDialog(false);
  setChange(true);
}
function handleCreate(){
  setOpenCreateDialog(false);
  setChange(true);
}
    return(
      <React.Fragment>
          <Grid item style={{minWidth: '240px'}}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={3}>
                { canEdit &&
                <Tooltip title="Edit">
                  <IconButton
                    style={{color: '#3397EF'}}
                    onClick={(e)=>{
                      e.stopPropagation();
                      history.push("/editInstance",
                        {
                          instance_id: instance_id,
                          institution_id: institution_id,
                          institution_name: institution_name,
                          pc_serial_number: pc_serial_number,
                          vr_serial_number: vr_serial_number,
                          });
                    }}
                    >
                    <EditIcon/>
                    </IconButton>
                </Tooltip>
                }
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={3}>
                  <Button
                    style={{borderRadius: '8px', color: '#3397EF', borderColor: '#3397EF', marginLeft: 5}}
                    onClick={(e)=>{
                      e.stopPropagation();
                      setOpenHardwareDialog(true);
                    }}
                    color="primary"
                    variant="outlined"
                    fullWidth
                    >
                    Hardware Information
                  </Button>
                </Grid>
                  { canUpdateInstances && enabled ?
                    <>
                      <Grid container spacing={3} style={{marginTop: 5}}>
                        <Button
                          style={{borderRadius: '8px', color: '#3397EF', borderColor: '#3397EF', marginLeft: 5, marginTop: 5}}
                          onClick={(e)=>{
                            e.stopPropagation();
                            setOpenPasswordDialog(true);
                              InstanceService.password_recovery(institution_id, instance_id)
                                .then( (response) => {
                                  setPassword(response.data)
                                  setLoading(false)
                                })
                                .catch(()=> {
                                  setTimeout(true);
                                })
                          }}
                          color="primary"
                          variant="outlined"
                          fullWidth
                          >
                          Show New Password
                        </Button>
                      </Grid>
                      <Grid container spacing={3} style={{marginTop: 5}}>
                        <Button
                          style={{borderRadius: '8px', color: '#3397EF', borderColor: '#3397EF', marginLeft: 5, marginTop: 5}}
                          onClick={(e)=>{
                            e.stopPropagation();
                            setOpenVersionDialog(true);
                              InstanceService.get_version_list().then( (response) => {
                                  setVersionData(response.data)
                                  setLoadingVersionList(false)
                                })
                                .catch(()=> {
                                  setTimeout(true);
                                })
                          }}
                          color="primary"
                          variant="outlined"
                          fullWidth
                          >
                          Change App Version {change}
                        </Button>
                      </Grid>
                    </> : <div></div>
                  }
              </Grid>
            </Grid>
          </Grid>
        <HardwareInformationDialog
          open={openHardwareDialog}
          handleClose={(e)=>setOpenHardwareDialog(false)}
          institution_id={institution_id}
          pc_sn={row_data[6]}
          pc_model={row_data[7]}
          et_sn={row_data[8]}
          et_model={row_data[9]}
          instance_id={instance_id}
        />
        <PasswordRecoveryDialog
          open={openPasswordDialog}
          handleClose={(e)=>setOpenPasswordDialog(false)}
          institution_id={institution_id}
          instance_id={instance_id}
          password={password}
          loading={loading}
        />
        <AppReleaseDialog
          open={openVersionDialog}
          handleClose={handleClose}
          institution_id={institution_id}
          instance_id={instance_id}
          versionData={versionData}
          loading={loadingVersionList}
        />
        <CreateInstanceDialog
          open={openCreateDialog}
          handleClose={handleCreate}
          institution_id={institution_id}
          instance_id={instance_id}
          password={password}
          responseData={responseData}
        />
      </React.Fragment>
    )
}
