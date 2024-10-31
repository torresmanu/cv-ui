import React, {useEffect} from "react";
import {
  Button,
  Grid,
  Divider
} from "@material-ui/core";
import {
  Link as LinkIcon,
  LinkOff as LinkOffIcon,
  LockOpen as LockOpenIcon,
  PersonAddDisabled as PersonAddDisabledIcon,
  PersonAdd as PersonAddIcon,
} from "@material-ui/icons";
import RegisterForm from "../RegisterForm/RegisterForm";
import step3 from "../../../images/step3.png"
import {StepTab} from "../../../components/StepTab";
import {useHistory, useLocation} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {PortalUsersService} from "../../../services/PortalUsersService";
import {validatePassword} from "../../auth/authHelper";
import LinkDialog from "./LinkDialog";
import GLOBALS from "../../../services/GLOBALS.json";
import { red, green } from '@material-ui/core/colors';
import UnlinkWarningDialog from "./LinkWarningDialog";
import AddUserForm from "./addUserForm";

function AddUser() {
  const location = useLocation();
  const props = location.state;
  const history = useHistory();
  const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
  const canLinkUser = permissions['portal_users']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.LINK_USER));
  const canSetPermissions = permissions['portal_users']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_SET_PERMISSIONS));
  const canGetPermissions = permissions['portal_users']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_GET_PERMISSIONS));
  const canListPermissions = permissions['portal_users']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_LIST_PERMISSIONS));
  const canModifyPermissions = canSetPermissions && canGetPermissions && canListPermissions;
  const [dirty, setDirty] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [openLinkDialog, setOpenLinkDialog] = React.useState(false);
  const [openUnlinkWarningDialog, setOpenUnlinkWarningDialog] = React.useState(false);
  const [mismatchWarningDialog, setMismatchWarningDialog] = React.useState(false);
  const [warningDialog, setWarningDialog] = React.useState(false);
  const [portal_access, setPortalAccess] = React.useState(false);
  const [admin_access, setAdminAccess] = React.useState(false);
  const [dist_access, setDistAccess] = React.useState(false);
  const [emailConfrimed, setEmailConfirmed] = React.useState(false);
  const [state, setState] = React.useState({
    name: "",
    lastname: "",
    password: "",
    password_confirmation: "",
    company: "",
    email: "",
    email_confirmation: "",
    is_enabled: true,
  })

  useEffect(
  () => {
    props.user_id !== undefined ?
      PortalUsersService.get(props?.user_id || undefined)
        .then( (response) => {
          handleChange(response.data.name, 'name')
          handleChange(response.data.lastname, 'lastname')
          handleChange(response.data.company, 'company')
          handleChange(response.data.email, 'email')
          handleChange(response.data.email, 'email_confirmation')
          handleChange(response.data.enabled, 'is_enabled')
          handleChange(response.data.institutions, 'institutions')
          const role = response.data.user_role;
          // Check if each bit is on
          setPortalAccess((role & 1) !== 0);
          setDistAccess((role & 2) !== 0);
          setAdminAccess((role & 4) !== 0);
          setLoading(false);
        })
        .catch(()=> {
          setTimeout(true);
        })
      :
      props.user_email !== undefined &&
      handleChange(props.user_email, 'email')
      setLoading(false);
  },
  []
  );



  function SetService(role){
    PortalUsersService.set(props?.user_id || undefined, state, props?.institution_id, role).then(() =>{
      if ((props?.user_id)?.toString() === sessionStorage.getItem('user_id')){
          sessionStorage.setItem('user_first_name', state.name);
          sessionStorage.setItem('user_last_name', state.lastname);
      }
      handleCallBack();
    });
  }  

  function handleSubmit() {
    const portal = portal_access ? 1 :0;
    const dist = dist_access ? 2 :0;
    const admin = admin_access ? 4 :0;
    const role = portal+dist+admin;
    // role must be a number between 0 and 7
    if(state.password !== "" || props.user_id === undefined){
      // Check if both passwords match
      if(state.password !== state.password_confirmation){
        setMismatchWarningDialog(true);
      }else
      if(validateForm()){
        SetService(role);
      }else {
        setWarningDialog(true)
      }
    }else{
      SetService(role);
    }
  }

  function handleCallBack() {
    const callback = props?.callback;
    if (callback){
      callback()
    }
    else history.goBack();
  }

  function handleModifyPermissions() {
     history.push("/permissions",
       {user_id: props.user_id,
        institution_id: props.institution_id,
        institution_name: props.institution_name,
        lastname: state.lastname,
        email: state.email
      });
  }

  function handleChange(value, key) {
    setState(prevState => ({
        ...prevState, [key]: value }));
  }

  function validateForm() {
    const password_ok = validatePassword(state?.password, state?.email) && (state.password === state.password_confirmation);
    const email_ok = state.email === state.email_confirmation;
    return password_ok && email_ok;
  }

  const handleWarningClose = () => {
    setMismatchWarningDialog(false)
    setWarningDialog(false)
  };

  function handleAccessChange(value) {
    setDirty(true);
    if(value===1){
      const bool = portal_access;
      setPortalAccess(!bool);
    }else if(value===2){
      const bool = dist_access;
      setDistAccess(!bool);
    }else if(value===4){
      const bool = admin_access;
      setAdminAccess(!bool);
    }
  }

  //When enabling, enable=1, when disabling, enable=0
  function handleEnable(e, user_id, enable=1) {
    e.stopPropagation();
    PortalUsersService.enable(user_id, enable).then((response) => {handleCallBack()})
      .catch((error) => {console.log(error);})
  }

  return (
    <>
    { !loading ?
      <RegisterForm title={ props?.institution_name + (props.user_id !== undefined ? ' - Edit User' : ' - Add User') }>
        <>
          <form>
            <AddUserForm
              state={state}
              handleChange={handleChange}
              props={props}
              handleAccessChange={handleAccessChange}
              handleSubmit={handleSubmit}
              setDirty={setDirty}
              portal_access={portal_access}
              admin_access={admin_access}
              dist_access={dist_access}
              setEmailConfirmed={setEmailConfirmed}
            />
            { props.user_id &&
              <>
                <StepTab step={step3} title={'User Actions'}/>
                <Grid container spacing={5} style={{marginTop: "30px"}}>
                  { !props.is_master_list &&
                  <>
                    <Grid item sm={4} xs={12}>
                      <Button
                        className={"modify_permissions"}
                        style={{borderRadius: '8px'}}
                        variant="contained"
                        color="primary"
                        onClick={handleModifyPermissions}
                        fullWidth
                        startIcon={<LockOpenIcon/>}
                        disabled={!canModifyPermissions || props?.is_distribution === 1}
                      >
                        Modify Permissions
                      </Button>
                    </Grid>
                    { props.institution_id !== 0 &&
                      <Grid item sm={4} xs={12}>
                        <Button
                          className={"unlink_institution"}
                          style={{ color: red[500], borderColor: red[500], borderRadius: '8px' }}
                          variant="outlined"
                          onClick={(e)=>setOpenUnlinkWarningDialog(true)}
                          fullWidth
                          startIcon={<LinkOffIcon/>}
                          disabled={!canLinkUser} 
                        >
                          Unlink Institution
                        </Button>
                      </Grid>
                    }
                    </>
                  }
                </Grid>
                <Grid container spacing={5} style={{marginTop: "15px"}}>
                  { props.is_master_list && 
                  <>
                    <Grid item sm={4} xs={12}>
                      <Button
                        className={"link_institution"}
                        style={{ borderRadius: '8px'}}
                        color="primary"
                        variant="contained"
                        onClick={(e)=>setOpenLinkDialog(true)}
                        fullWidth
                        startIcon={<LinkIcon/>}
                        disabled={!canLinkUser}
                      >
                        Link / Unlink Institutions
                      </Button>
                    </Grid>
                    { state.is_enabled ?
                        <Grid item sm={4} xs={12}>
                          <Button
                            className={"disable_user"}
                            style={{ color: red[500], borderColor: red[500], borderRadius: '8px' }}
                            variant="outlined"
                            onClick={(e)=>handleEnable(e, props.user_id, 0)}
                            fullWidth
                            startIcon={<PersonAddDisabledIcon/>}
                          >
                            Disable User
                          </Button>
                        </Grid>
                        :
                        <Grid item sm={4} xs={12}>
                          <Button
                            className={"enable_user"}
                            style={{ color: green[500], borderColor: green[500], borderRadius: '8px' }}
                            variant="outlined"
                            onClick={(e)=>handleEnable(e, props.user_id, 1)}
                            fullWidth
                            startIcon={<PersonAddIcon/>}
                          >
                            Enable User
                          </Button>
                        </Grid>
                      }
                  </>
                  }
                </Grid>
              </>
            }
            <Divider style={{marginTop: 30}}/>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div style={{marginTop: "25px"}}>
                  <Button
                    className={"save"}
                    style={{float: "right", borderRadius: '8px', marginLeft: "10px", marginBottom: "15px", width: "144px"}}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!dirty || state.name === "" || state.lastname === "" || state.email === "" || !emailConfrimed}
                  >
                    SAVE
                  </Button>
                </div>
                <div style={{marginTop: "25px"}}>
                  <Button
                    className={"save"}
                    style={{float: "right", borderRadius: '8px', marginBottom: "15px", width: "100px"}}
                    color="primary"
                    variant="outlined"
                    onClick={handleCallBack}
                  >
                    CANCEL
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
          {props.is_master_list ? 
            <LinkDialog
              open={openLinkDialog}
              handleClose={(e)=>setOpenLinkDialog(false)}
              user_id={props.user_id}
              linked_institutions={state?.institutions || []}
            />
            : props.institution_id !== 0 &&
            <UnlinkWarningDialog
              open={openUnlinkWarningDialog}
              handleClose={(e)=>setOpenUnlinkWarningDialog(false)}
              user_id={props.user_id}
              institution_id={props.institution_id}
              user_name={state?.name || ''}
              user_lastname={state?.lastname || ''}
              institution_name={props?.institution_name || ''}
            />
          } 
        </>
      </RegisterForm>
    :
            <Grid container justify="center">
              <Grid item style={{paddingTop: '10%', paddingBottom: '5%'}}>
                <CircularProgress alt={'loading..'}/>
              </Grid>
            </Grid>    }
    </>
  );
}


export default AddUser;
