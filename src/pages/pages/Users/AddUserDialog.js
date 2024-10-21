import {default as React} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Button from "@material-ui/core/Button/index";
import {DialogActions, CircularProgress, Divider} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import BootstrapInput from "../../../components/BootstrapInput";
import { PortalUsersService } from "../../../services/PortalUsersService";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import Avatar from "@material-ui/core/Avatar";
import {red} from "@material-ui/core/colors";
import isValidEmail from "../../../utils/emailValidator";

export default function AddUserDialog({ open, handleClose, institution_id, institution_name}){
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const [user_email, setUserEmail] = React.useState('');   
  const [user_name, setUserName] = React.useState('');
  const [user_lastname, setUserLastName] = React.useState('');
  const [user_id, setUserId] = React.useState();
  const [dirty, setDirty] = React.useState(false);
  const [error, setError] = React.useState('');

//useEffect will trigger when the user_email changes if the user_email and the user_name were not empty
React.useEffect(() => {
  if (user_email && user_name && user_lastname) {
    setUserName('')
    setUserLastName('')
  }
}, [user_email, user_name]);


  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13 || e.charCode === 13) {
      handleSubmit();
    }
  };

  function handleSubmit() {
    if(isValidEmail(user_email)){
    setLoading(true)
    PortalUsersService.search(user_email).then((response) => {
      if(response?.data?.length > 0){
        setUserName(response?.data[0]?.name)
        setUserLastName(response?.data[0]?.lastname)
        setUserId(response?.data[0]?.keyid)
        setLoading(false)
      }
      else{
        history.push('/addUser',{
          user_id: undefined,
          user_email: user_email,
          institution_id: institution_id,
          institution_name: institution_name
        })

      }
    }).catch((error) => {
      handleCancel()
    })
  } else setError('Please enter a valid email address')
  }

  function handleLink(user_id) {
    PortalUsersService.link(user_id, institution_id,1).then((response) => {
      handleCancel();
    })
  }

  function handleCancel() {
    setUserEmail('')
    setUserName('')
    setUserLastName('')
    handleClose()
  }

  return (
    <Dialog
      fullWidth
      maxWidth={'xs'}
      open={open}
      onClose={handleCancel}
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
              {`Add User to ${institution_name}`}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={handleCancel} style={{margin: "0px", minWidth: "100%", fontSize: "16px"}}>
              &times;
            </Button>
          </Grid>
        </Grid>
        <Divider/>
      </DialogTitle>
      <DialogContent>
        {loading ? 
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
          :
          <>
          <Grid container>
            <Grid item sm={12} xs={12}>
              <Typography variant='body1'>
                User Email
              </Typography>
              <BootstrapInput
                id={'contact_name'}
                value={user_email || ''}
                placeholder="Enter Email Address"
                onChange={(event) => {
                  setUserEmail(event.target.value)
                  setError('')
                  setDirty(true)
                }}
                fullWidth
                onKeyPress={handleKeypress}
                //disabled={!canEdit}
              />
            </Grid>
            {error && 
            <Grid item xs={12}>
              <Typography component="h3" variant="body2" style={{color: red[500], marginTop: "10px", marginLeft: "10px"}}>
                {error}
              </Typography>
            </Grid>
          }
          </Grid>
          {user_name && user_lastname &&
          <>
          <Grid container style={{marginTop: '10px'}}>
            <Grid item sm={1} xs={2}>
              <ReportProblemOutlinedIcon style={{ color: '#FFC107' }} />
            </Grid>
            <Grid item sm={10} xs={6}>
              <Typography variant='body2' gutterBottom style={{ color: '#333333', fontWeight: 'bold'}}>
                User Already Exists
              </Typography>
            </Grid>
          </Grid>
      
          <div style={{backgroundColor: '#F2F2F2', borderRadius: 8, padding: '10px'}}>              
            <Grid container >
              <Grid item sm={2} xs={4}>
                <Avatar
                  alt={user_name}
                  src="../images/user.png"
                  style={{color: '#3397EF', backgroundColor: '#DDEAF6'}}
                />
              </Grid>
              <Grid item sm={10} xs={8}>
                <Typography variant="body1">
                  {user_name} {user_lastname}
                </Typography>
                <Typography variant="body2">
                  {user_email}
                </Typography>
              </Grid>
            </Grid>
            </div>
          </>
          }
        </>
        }
      </DialogContent>
      <DialogActions>
        <Button
          className={"cancel"}
          style={{float: "right", borderRadius: '8px', marginBottom: "15px", marginRight: "5px", width: "100px"}}
          color="primary"
          variant="outlined"
          onClick={handleCancel}
        >
          CANCEL
        </Button> 
        {user_name && user_lastname ?
          <Button
            className={"save"}
            style={{float: "left", borderRadius: '8px', marginBottom: "15px", marginRight: "15px"}}
            variant="contained"
            color="primary"
            onClick={(event) => handleLink(user_id)}
            disabled={!dirty}
          >
            LINK USER TO INSTITUTION
          </Button>
          :
          <Button
            className={"save"}
            style={{float: "right", borderRadius: '8px', marginBottom: "15px", marginRight: "15px"}}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!dirty}
          >
            ADD USER
          </Button>
        }
      </DialogActions>
  </Dialog>
  )
}
