import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Avatar,
  Button,
  Card as MuiCard,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography as MuiTypography,
  CircularProgress,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import step1 from "../../../images/step1.png";
import { spacing } from "@material-ui/system";
import { useHistory, useLocation } from "react-router-dom";
import { PermissionsService } from "../../../services/PermissionsService";
import { StepTab } from "../../../components/StepTab";
import RegisterForm from "../RegisterForm/RegisterForm";
import { redirectTo } from "../../../routes/functions";
import usedEndpoints from "../../../services/usedEndpoints";

const Card = styled(MuiCard)`
  &:hover {
    background: #eef7ff;
    border-radius: 8px;
  }
`;

const Typography = styled(MuiTypography)(spacing);

const useStyles = makeStyles(() => ({
  titleFont: {
    color: '#3397EF',
    textAlign: 'center',
  },
  subtitleFont: {
    color: '#2e3c4d',
    textAlign: 'center',
  },
}));

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

function capitalizeFirstLetter(string) {
  //Set spaces instead of _ and capitalize first letter
  const str = string.replace(/_/g, " ")
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Permissions() {
  const styles = useStyles();
  const history = useHistory();
  const location = useLocation();
  const props = location.state;
  const [isLoading, setLoading] = React.useState(true);
  const [permissionList, setPermissionList] = React.useState({});
  const [userPermissions, setUserPermissions] = React.useState({});
  const [timeout, setTimeoutState] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);

  function handleSave() {
    PermissionsService.set(props?.user_id, props?.institution_id, userPermissions).then(() => {
      // if modifying your own permissions set permissions again so user doesn't need to log in again to see UI changes
      if ((props?.user_id).toString() === sessionStorage.getItem('user_id') && props.institution_id === 0) {
        sessionStorage.setItem('permissions', JSON.stringify(userPermissions));
        history.goBack();
      } else {
        history.goBack();
      }
    });
  }

  function handleChecked(key, value) {
    return userPermissions[key]?.includes(value);
  }

  function handleChange(key, value) {
    setDirty(true);
    setUserPermissions(prevState => {
      const list = prevState[key] || [];
      const updatedList = list.includes(value)
        ? list.filter(v => v !== value)
        : [...list, value];

      // Ensure that when 'institution get' is checked, 'task_sequences list' is also checked
      if (key === 'institution' && value === 'get' && !list.includes(value)) {
        return {
          ...prevState,
          [key]: updatedList,
          'task_sequences': [...(prevState['task_sequences'] || []), 'list']
        };
      }

      else if (key === 'portal_users' && value === 'get_permissions' && !list.includes(value)) {
        return {
          ...prevState,
          [key]: [...updatedList, 'list_permissions']
        };
      }

      //ensure that whe 'portal_users set' is checked, 'portal_users search' is also checked
      else if (key === 'portal_users' && value === 'set' && !list.includes(value)) {
        return {
          ...prevState,
          [key]: [...updatedList, 'search']
        };
      }

      return { ...prevState, [key]: updatedList };
    });
  }

  useEffect(() => {
    PermissionsService.list(props?.institution_id).then(response => {
      if (response.data.http_code === 429) {
        setTimeoutState(true);
        setError(response.data.message);
      } else {
        const filteredEndpoints = {};
        for (const key in usedEndpoints) {
          if (response?.data.hasOwnProperty(key)) {
            filteredEndpoints[key] = response?.data[key].filter(endpoint => usedEndpoints[key].includes(endpoint));
            if (filteredEndpoints[key].length === 0) {
              delete filteredEndpoints[key];
            }
          }
        }
        setPermissionList(filteredEndpoints);
        PermissionsService.get(props?.user_id, props?.institution_id).then(res => {
          const permissionsData = res.data || Object.keys(response?.data).reduce((acc, key) => ({ ...acc, [key]: [] }), {});
          setUserPermissions(permissionsData);
          setLoading(false);
        }).catch(() => {
          setTimeoutState(true);
        });
      }
    }).catch(() => {
      setTimeoutState(true);
    });
  }, [props]);

  return (
    <React.Fragment>
      {!isLoading ? (
        <RegisterForm title="Modify User Permissions">
          <form>
            <React.Fragment>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar
                    alt={props?.lastname}
                    src="../images/user.png"
                    style={{ color: '#3397EF', backgroundColor: '#DDEAF6' }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props?.lastname}
                  </Typography>
                  <Typography variant="body2">
                    {props?.email}
                  </Typography>
                </Grid>
              </Grid>
              <StepTab step={step1} title="Objects Permissions" />
              {Object.keys(permissionList).map((key, i) => (
                <Grid item xs={12} key={i}>
                  <StepTab title={capitalizeFirstLetter(key)} />
                  <Grid container style={{ marginTop: '30px' }}>
                    {permissionList[key].map((v, idx) => (
                      <Grid item xs={12} sm={6} xl={4} key={idx}>
                        <FormControlLabel
                          label={v}
                          control={
                            <Checkbox
                              id={v}
                              value={v}
                              fullWidth
                              checked={handleChecked(key, v)}
                              onChange={() => handleChange(key, v)}
                              disabled={ (v === 'search' && key === 'portal_users' && handleChecked('portal_users', 'set')) || (v === 'list' && key === 'task_sequences' && handleChecked('institution', 'get')) ||(v === 'list_permissions' && key === 'portal_users' && handleChecked('portal_users', 'get_permissions'))}
                            />
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
              <Divider style={{ marginTop: 30 }} />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div style={{ marginTop: "25px" }}>
                    <Button
                      className="save"
                      style={{ float: "right", borderRadius: '8px', marginLeft: "10px", marginBottom: "15px", width: "144px" }}
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                      disabled={!dirty}
                    >
                      SAVE
                    </Button>
                  </div>
                  <div style={{ marginTop: "25px" }}>
                    <Button
                      className="save"
                      style={{ float: "right", borderRadius: '8px', marginBottom: "15px", width: "100px" }}
                      color="primary"
                      variant="outlined"
                      onClick={() => history.goBack()}
                    >
                      CANCEL
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </React.Fragment>
          </form>
        </RegisterForm>
      ) : timeout ? (
        <Grid item xs={12}>
          <Wrapper>
            <Card mb={6}>
              <Typography variant="h4" gutterBottom className={styles.subtitleFont}>
                User Permissions could not be loaded, please try again.
              </Typography>
              {error ? (
                <Typography variant="h6" gutterBottom className={styles.titleFont}>
                  Error Message: {error}
                </Typography>
              ) : null}
            </Card>
          </Wrapper>
        </Grid>
      ) : (
        <Grid container justify="center">
          <Grid item style={{ paddingTop: '10%', paddingBottom: '5%' }}>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Permissions;
