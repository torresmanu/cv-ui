import React from "react";
import MUIDataTable from "mui-datatables";
import { Grid, CircularProgress } from "@material-ui/core";
import {Logo} from "../../pages/components/Logo";
import logo from "../../images/search.png";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import arrow from "../../images/arrow.png"
import Button from "@material-ui/core/Button";
import {Add, CalendarToday} from "@material-ui/icons";
import {InstanceService} from "../../services/InstanceService";
import GLOBALS from "../../services/GLOBALS.json";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {makeStyles} from "@material-ui/core/styles";
import AddUserDialog from "../../pages/pages/Users/AddUserDialog";
import AccessDenied from "../AccessDenied";
import { de, fi } from "date-fns/locale";
import { set } from "date-fns";

const useStyles = makeStyles({
  button: {
    float: "right",
    marginTop:'15px',
    borderRadius: '8px',
    "&:disabled": {
      backgroundColor: 'rgba(0, 0, 0, 0.12)'
    }
  }
});

// options are MUIDataTable options
const DefaultRenderDataTable = (getListModel, fields, options, key, setKey) => {
  const classes = useStyles();
  const history = useHistory();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openInstanceDialog, setOpenInstanceDialog] = React.useState(false);
  const [instanceData, setInstanceData] = React.useState({});
  const [selectedDate, setSelectedDate] = React.useState(fields.date);
  const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
  const canEditUsers = permissions['portal_users']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.SET));
  const canCreateInstances = permissions['instances']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_CREATE_INSTANCES));

  const dateFrom = fields?.date === "undefined" ? "Beginning of Time" : fields?.date?.substring(0, 10) || null;
  const route = fields?.model === "KPI" ? "/stats/evaluations" : "/stats/failures";

  function isValidDate() {
    return (selectedDate && Object.prototype.toString.call(selectedDate) === "[object Date]" &&
      !isNaN(selectedDate) && selectedDate < new Date());
  }

  if(fields?.data[0]?.includes("Access denied")){
    return(
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
        </Grid>
        {fields.isLoading ? (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "80vh" }}
          >
            <Grid item xs={7}>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : <AccessDenied/>}
      </React.Fragment>
    )
  }
  else{
    if (!fields.filterRender && fields.data.length === 0) {
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >

        </Grid>
        {fields.isLoading ? (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "80vh" }}
          >
            <Grid item xs={7}>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : fields.emptyResultsComponent ? (
          fields.emptyResultsComponent(fields.title, fields.id)
        ) : (
          <>
            <Button
              color='primary'
              style={{color: '#3397EF'}}
              onClick={(e) => {
                e.stopPropagation();
                history.goBack();
              }}
            >
              <Logo logo={arrow} otherStyles={{paddingRight: 10}}/>
              {` Back`}
            </Button>
            <Grid item xs={ 12 }>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Logo logo={logo}  width={'250px'} />
                  <Typography variant="h1" gutterBottom align="center">
                    No Entries Found
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={ 12 }>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom align="center">
                    It seems we can’t find any results based on your search.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {fields.model === 'Users' && canEditUsers ?
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
              <Grid item>
                  <Button
                    style={{
                      marginTop:'15px',
                      marginBottom: '20px',
                      borderRadius: '8px',
                      backgroundColor: '#3397EF'}}
                    color="primary"
                    variant="contained"
                    startIcon={<Add/>}
                    onClick={()=> setOpenDialog(true)}
                    >
                      ADD USER
                  </Button>
                </Grid>
                <AddUserDialog
                  open={openDialog}
                  handleClose={(e)=>{
                    setOpenDialog(false)
                    setKey(key + 1); // Update the key to force a refresh
                  }} 
                  institution_id={fields.id}
                  institution_name={fields.title}
                />
              </Grid>
              :
              fields.model === 'Instances' && canCreateInstances && fields.enabled ?
              <>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                        marginTop:'15px',
                        marginBottom: '20px',
                        borderRadius: '8px',
                        backgroundColor: '#3397EF'}}
                      color="primary"
                      variant="contained"
                      startIcon={<Add/>}
                      onClick={(e) => {
                        InstanceService.create(fields.id).then((response) => {                      
                          if (response && response.http_code === 800) { 
                            // Handle specific code 800 response
                            setOpenInstanceDialog(true);
                            setInstanceData(response);
                          } else {
                            // Handle successful scenarios
                            fields.setResponseData(response);
                            fields.setRerender(true);
                            fields.setOpenDialog(true);
                          }
                        })
                      }}
                      
                      >
                        ADD INSTANCE
                    </Button>
                  </Grid>
                </Grid>

                </>
                :
                fields.model === "KPI" || fields.model === "Failures" ?
                <>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="subtitle1" gutterBottom align="center">
                      Searched from: {dateFrom}
                    </Typography>
                  </Grid>
                  </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item >
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                              InputAdornmentProps={{style:{margin: "-10px", padding:'0px'}}}
                              style={{marginTop: '45px'}}
                              disableToolbar
                              autoOk={true}
                              variant="inline"
                              format="dd/MM/yyyy"
                              margin="none"
                              id="date-picker-inline"
                              label={"Select a date"}
                              value={selectedDate}
                              fullWidth
                              maxDate={new Date()}
                              onChange={(selectedDate) => setSelectedDate(selectedDate)}
                              maxDateMessage={"Date should not be after today"}
                              KeyboardButtonProps={{
                                  'aria-label': 'change date',
                              }}
                          />
                        </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.button}
                      style={{
                        marginTop:'50px',
                        marginRight:'15px',
                        marginLeft:'15px'}}
                      color="primary"
                      variant="contained"
                      startIcon={<CalendarToday/>}
                      disabled={!isValidDate()}
                      onClick={()=> history.push(route , {date: selectedDate.toISOString()})}
                      >
                        Filter by Date
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                        marginTop:'50px',
                        marginRight:'15px',
                        borderRadius: '8px'}}
                      color="primary"
                      variant="outlined"
                      startIcon={<CalendarToday/>}
                      onClick={()=> history.push("/Stats/evaluations", {date: "undefined"})}
                      >
                        Results from Beginning of Time
                    </Button>
                  </Grid>
                </Grid>
                </>
                : <div></div>
                
            }
          </>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={6}>
            {fields.backButton ?
              <Button
                color='primary'
                style={{color: '#3397EF'}}
                onClick={(e) => {
                  e.stopPropagation();
                  history.goBack();
                }}
              >
                <Logo logo={arrow} otherStyles={{paddingRight: 10}}/>
                {` Back`}
              </Button>
              :
              <div></div>
            }
          </Grid>
          { fields.addButton ?
              fields.model === "Institutions" ?
                <Grid item sm={6} xs={12}>
                  <Button
                    style={{
                      float: "right",
                      marginTop:'15px',
                      marginBottom: '20px',
                      borderRadius: '8px',
                      backgroundColor: '#3397EF'}}
                    color="primary"
                    variant="contained"
                    startIcon={<Add/>}
                    onClick={()=> history.push('/addInstitution', {institution_id: undefined})}
                    >
                      ADD INSTITUTION
                  </Button>
                </Grid>
              :
                fields.model === "Instances" && fields.enabled ?
                <Grid item sm={6} xs={12}>
                  <Button
                    style={{
                      float: "right",
                      marginTop:'15px',
                      marginBottom: '20px',
                      borderRadius: '8px',
                      backgroundColor: '#3397EF',
                    }}
                    color="primary"
                    variant="contained"
                    disabled={!fields.enabled}
                    startIcon={<Add/>}
                    onClick={(e)=>{
                      InstanceService.create(fields.id).then((response)=>{
                        fields.setResponseData(response)
                        fields.setRerender(true)
                      })
                      fields.setOpenDialog(true)
                    }}
                    >
                      ADD INSTANCE
                  </Button>
                </Grid>
                :
                fields.model === "KPI" || fields.model === "Failures" ?
                <Grid container>
                  <Grid item sm={5} xs={12}>
                    <Typography
                      style={{
                        marginTop:'25px',
                        color: '#939393',
                        marginLeft:'12px'}}>
                      Showing results from: {dateFrom}
                    </Typography>
                  </Grid>
                  <Grid item sm={2} xs={8} >
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                              InputAdornmentProps={{style:{margin: "-10px", padding:'0px'}}}
                              disableToolbar
                              autoOk={true}
                              variant="inline"
                              format="dd/MM/yyyy"
                              margin="none"
                              id="date-picker-inline"
                              label={"Select a date"}
                              value={selectedDate}
                              fullWidth
                              maxDate={new Date()}
                              onChange={(selectedDate) => setSelectedDate(selectedDate)}
                              maxDateMessage={"Date should not be after today"}
                              KeyboardButtonProps={{
                                  'aria-label': 'change date',
                              }}
                          />
                        </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item sm={2} xs={4}>
                    <Button
                      className={classes.button}
                      color="primary"
                      variant="contained"
                      startIcon={<CalendarToday/>}
                      disabled={!isValidDate()}
                      onClick={()=> history.push(route, {date: selectedDate.toISOString()})}
                      >
                        Filter by Date
                    </Button>
                  </Grid>
                  <Grid item sm={3} xs={12}>
                    <Button
                      className={classes.button}
                      color="primary"
                      variant="outlined"
                      onClick={()=> history.push("/stats/evaluations", {date: "undefined"})}
                      >
                        Results from Beginning of Time
                    </Button>
                  </Grid>
                </Grid>
                : fields.model === "Users" ?
                <>
                <Grid item sm={6} xs={12}>
                  <Button
                    style={{
                      float: "right",
                      marginTop:'15px',
                      marginBottom: '20px',
                      borderRadius: '8px',
                      backgroundColor: '#3397EF'}}
                    color="primary"
                    variant="contained"
                    startIcon={<Add/>}
                    onClick={()=> setOpenDialog(true)}
                    >
                      ADD USER
                  </Button>
                </Grid>
                <AddUserDialog
                  open={openDialog}
                  handleClose={(e)=>{
                    setOpenDialog(false)
                    setKey(key + 1); // Update the key to force a refresh
                  }}
                  institution_id={fields.id}
                  institution_name={fields.title}
                />
                </>
                  :
                    <div></div>
              :
            <div></div>
          }
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
        </Grid>
        {
            <MUIDataTable
              className={"table-with-help"}
              title={fields.model !== 'PermissionSets' ? `${fields.title} (${fields.data.length})` : ''}
              data={fields.data}
              columns={fields.displayColumns}
              options={options}
            />
        }
      </React.Fragment>
    );
  }
  }
};
export default DefaultRenderDataTable;
