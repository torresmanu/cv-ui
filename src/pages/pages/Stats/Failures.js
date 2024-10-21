import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from "@date-io/date-fns";
import 'chart.js'; 

import {
  Grid,
  Card as MuiCard,
  Box, 
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { CalendarToday } from '@material-ui/icons';

import { setStartDate, setEndDate } from '../../../redux/actions/dateFilterActions';
import { fetchKpiData } from '../../../redux/actions/kpiDataActions';
import DataSection from "./DataSection";
import ButtonWithStyles from '../../../components/ButtonWithStyles';
import {InstitutionService} from '../../../services/InstitutionService';
import GLOBALS from '../../../services/GLOBALS.json';
import AccessDenied from '../../../components/AccessDenied';
import NoEntriesFound from '../../../components/NoEntriesFound';


export default function Dashboard() {
  const dispatch = useDispatch();
  const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
  const canListInstitutions = permissions['institution']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.LIST));
  const canGetFailures = permissions['stats']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_GET_FAILURES));
  const { startDate, endDate } = useSelector((state) => state.dateFilter);
  const {
    isKPILoading,
    calibrationData,
    trustworthyData,
    processingFailsData,
    discardedData,
    completedEvaluations,
    successfulTasks,
    error,
  } = useSelector((state) => state?.kpiData);

  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(-1);

  useEffect(() => {
    async function fetchInstitutions() {
      const data = await InstitutionService.list();
      const filteredData = data?.filter(institution => institution.keyid !== 0 && institution.distribution_site !== 1);
      setInstitutions(filteredData || []);
    }

    fetchInstitutions();
  }, []);


  const handleBeggingOfTime = () => {
    dispatch(setStartDate(null))
    dispatch(setEndDate(null));
    dispatch(fetchKpiData( undefined, undefined, selectedInstitution ));
  };

  const handleInstitutionChange = (event) => {
    setSelectedInstitution(event.target.value);
  };
  

  const isValidDate = (date) =>
    date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date) && date < new Date();

  useEffect(() => {
    if (isValidDate(startDate) && isValidDate(endDate)) {
      dispatch(fetchKpiData( startDate, endDate, selectedInstitution ));
    }
    else if(startDate === null && endDate === null) {
      dispatch(fetchKpiData( undefined, undefined, selectedInstitution ));
    }
  }, [dispatch, startDate, endDate, selectedInstitution]);

  return (
    canGetFailures && canListInstitutions ?
      error ?
      <NoEntriesFound /> 
      :
      <React.Fragment>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <MuiCard style={{ borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <Box p={3} display="flex" alignItems="center">
                <Grid container spacing={5}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={12} md={3}>
                      <KeyboardDatePicker
                        InputAdornmentProps={{ style: { margin: "-10px", padding: "0px" } }}
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="none"
                        id="start-date-picker"
                        label={"Start Date"}
                        value={startDate}
                        fullWidth
                        maxDate={new Date()}
                        onChange={(date) => dispatch(setStartDate(date))}
                        maxDateMessage={"Date should not be after today"}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}> 
                      <KeyboardDatePicker
                        InputAdornmentProps={{ style: { margin: "-10px", padding: "0px" } }}
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="none"
                        id="end-date-picker"
                        label={"End Date"}
                        value={endDate}
                        fullWidth
                        maxDate={new Date()}
                        onChange={(date) => dispatch(setEndDate(date))}
                        maxDateMessage={"Date should not be after today"}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="institution-select-label">Institution</InputLabel>
                      <Select
                        labelId="institution-select-label"
                        id="institution-select"
                        value={selectedInstitution}
                        onChange={handleInstitutionChange}
                      >
                        <MenuItem value={-1}>All</MenuItem>
                        {institutions.map((institution) => (
                          <MenuItem key={institution.keyid} value={institution.keyid}>
                            {institution.institution_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <ButtonWithStyles
                      color="primary"
                      variant="outlined"
                      startIcon={<CalendarToday />}
                      onClick={handleBeggingOfTime}
                    >
                      Beginning of Time
                    </ButtonWithStyles>
                  </Grid>
                </Grid>
              </Box>
            </MuiCard>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item xs={window.innerWidth > 1200 ? 8 : 12 } >
            <Grid container spacing={8} padding={14}>
              <Grid item xs={12} md={6}>
                <DataSection sectionTitle="Calibrations" data={calibrationData} isLoading={isKPILoading} dataType="calibrations" />
              </Grid>
              <Grid item xs={12} md={6}>
                <DataSection sectionTitle="Trustworthy Tasks" data={trustworthyData} isLoading={isKPILoading} dataType="trustworthy" />
              </Grid>
              <Grid item xs={12} md={12}>
                <DataSection sectionTitle="Discarded Tasks" data={discardedData} isLoading={isKPILoading} dataType="discarded" />
              </Grid>
            </Grid>
          </Grid>
          {
            window.innerWidth > 1200 &&
              <Grid item sm={4} xs={12}>
                <Grid container spacing={8} padding={14}>
                  <Grid item xs={12} md={12}>
                    <DataSection sectionTitle="Processing Failures" data={processingFailsData} isLoading={isKPILoading} dataType="processing" />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <DataSection sectionTitle="Successful Tasks" data={successfulTasks} isLoading={isKPILoading} dataType="successful_tasks" />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <DataSection sectionTitle="Completed Evaluations" data={completedEvaluations} isLoading={isKPILoading} dataType="completed_evals" />
                  </Grid>
                  </Grid>
              </Grid>
        }
        </Grid>
      </React.Fragment>
    :
      <AccessDenied />
    
  );
}