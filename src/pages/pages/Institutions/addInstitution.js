import React, {useEffect} from "react";
import {
  Button,
  Grid,
  Typography,
  Divider,
  FormControl,
  Select, MenuItem, FormControlLabel, Checkbox
} from "@material-ui/core";
import RegisterForm from "../RegisterForm/RegisterForm";
import step1 from "../../../images/step1.png"
import step2 from "../../../images/step2.png"
import step3 from "../../../images/step3.png"
import step4 from "../../../images/step4.png"
import {StepTab} from "../../../components/StepTab";
import {useHistory, useLocation} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {InstitutionService} from "../../../services/InstitutionService";
import BootstrapInput from "../../../components/BootstrapInput";
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import InstitutionInformation from "./InstitutionInformation";
import AvailableEvaluations from "../Evaluations/AvailableEvaluations";
import ExistingEvaluations from "../Evaluations/ExistingEvaluations";
import { TaskSequencesService } from "../../../services/TaskSequencesService";


function AddInstitution() {
  const location = useLocation();
  const props = location.state;
  const history = useHistory();
  const [dirty, setDirty] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [regions, setRegions] = React.useState([]);
  const [state, setState] = React.useState({
    institution_name: "",
    phone_number: "",
    country: "",
    state_or_province: "",
    address: "",
    postal_code: "",
    email: "",
    region: "",
    enabled: true,
    distribution_site: false
  })
  const [institutionEvaluations, setInstitutionEvaluation] = React.useState([]);
  const [existingEvaluations, setExistingEvaluations] = React.useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = React.useState('');

  const handleSelectChange = (event) => {
    setSelectedEvaluation(event);
  };

  const handleDeleteEvaluation = (evaluation_id) => {
    if (evaluation_id !== undefined) {
      setInstitutionEvaluation(institutionEvaluations.filter(evaluation => evaluation !== evaluation_id));
      setDirty(true);
    }
  }

  const handleAddEvaluation = () => {
    if (selectedEvaluation !== '') {
      setInstitutionEvaluation([...institutionEvaluations, selectedEvaluation]);
      setSelectedEvaluation('');
      setDirty(true);
    }
  }

  countries.registerLocale(en);
  const countryOptions = Object.entries(countries.getNames('en'))
    .filter(([code, name]) => name !== 'Falkland Islands (Malvinas)')
    .map(([code, name]) => ({label: name, value: code }));  

  useEffect(
  () => {
    TaskSequencesService.list()
    .then((response) => {
      setExistingEvaluations(response?.existing_evaluations ?? []);
      props.institution_id !== undefined ?
      InstitutionService.get(props?.institution_id || undefined)
        .then( (response) => { 
          // Use default values ("" for strings) in case data fields are null or undefined
          handleChange(response.data?.phone_number ?? "", 'phone_number')
          handleChange(response.data?.country ?? "", 'country')
          handleChange(response.data?.state_or_province ?? "", 'state_or_province')
          handleChange(response.data.address ?? "", 'address')
          handleChange(response.data.postal_code ?? "", 'postal_code')
          handleChange(response.data.email ?? "", 'email')
          handleChange(response.data.institution_name ?? "", 'institution_name')
          handleChange(response.data.region ?? "", 'region')
          handleChange(response.data.enabled === 1 ? true : false, 'enabled')
          handleChange(response.data.distribution_site === 1 ? true : false, 'distribution_site')
          setInstitutionEvaluation(JSON.parse(response.data?.available_evaluations) || []);

          setLoading(false);
        })
        .catch(()=> {
          setTimeout(true);
        })
      :
      InstitutionService.getRegionList()
        .then( (response) => {
          setRegions(response.data);
          setLoading(false);
        })
        .catch(()=> {
          setTimeout(true);
        })
    })
    .catch(() => {
      setTimeout(true);
    })
    
  },
  []
  );

  function handleSubmit() {
     InstitutionService.set(props?.institution_id || undefined, state, institutionEvaluations).then(handleCallBack());
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13 || e.charCode === 13) {
      handleSubmit();
    }
  };

  function handleCallBack() {
    const callback = props?.callback;
    if (callback){
      callback()
    }
    else history.push("/institutions");
  }

  function handleChange(value, key) {
    if (key === 'phone_number') {
      // Allow only + and numbers
      const filteredValue = value.replace(/[^\d+]/g, '');
      setState(prevState => ({
          ...prevState, [key]: filteredValue
      }));
    } else {
      setState(prevState => ({
          ...prevState, [key]: value
      }));
    }
  }

  return (
    <>
    { !loading ?

      <RegisterForm title={ props.institution_id !== undefined ? 'Edit Institution' : 'Add Institution' }>
        <>
          <form>
              <React.Fragment>
                <InstitutionInformation state={state}/>
                <StepTab step={step1} title={'Institution Information'}/>
                <Grid container spacing={5} style={{marginTop: '30px'}}>
                  <Grid item sm={4} xs={12}>
                    {props.institution_id === undefined ?
                      <>
                        <Typography>
                          Select Region
                        </Typography>
                        <Select
                        disabled={props.institution_id !== undefined}
                        style={{marginTop: "8px"}}
                        fullWidth
                        labelId="region"
                        id="region"
                        value={state.region}
                        label="region"
                        onChange={(event)=>{
                          handleChange(event.target?.value, 'region')
                        }}
                        >{
                          regions?.map((r)=>{
                            return(<MenuItem value={r} key={r}>{r}</MenuItem>)
                          })}
                        </Select>
                    </>
                    :
                      <>
                        <Typography>
                          Institution Region
                        </Typography>
                        <BootstrapInput
                          disabled={true}
                          id={'country'}
                          value={state.region || ''}
                          fullWidth
                        />
                      </>
                    }
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Institution Name
                    </Typography>
                    <BootstrapInput
                      id={'institution_name'}
                      value={state.institution_name || ''}
                      placeholder="Enter Institution Name"
                      onChange={(event) => {
                        handleChange(event.target.value, 'institution_name')
                        setDirty(true)
                      }}
                      fullWidth
                      onKeyPress={handleKeypress}
                      //disabled={!canEdit}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Email
                    </Typography>
                    <BootstrapInput
                      id={'email'}
                      value={state.email || ''}
                      placeholder="Enter Email"
                      onChange={(event) => {
                        handleChange(event.target.value, 'email')
                        setDirty(true)
                      }}
                      fullWidth
                      onKeyPress={handleKeypress}
                      //disabled={!canEdit}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Phone number
                    </Typography>
                    <BootstrapInput
                      id={'phone_number'}
                      value={state.phone_number || ''}
                      placeholder="Enter Phone Number"
                      onChange={(event) => {
                        handleChange(event.target.value, 'phone_number')
                        setDirty(true)
                      }}
                      fullWidth
                      onKeyPress={handleKeypress}
                      //disabled={!canEdit}
                    />
                  </Grid>
                </Grid>
                <StepTab step={step2} title={'Institution Address'}/>
                <Grid container spacing={5} style={{marginTop: "30px"}}>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Country
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        style={{paddingTop: "8px"}}
                        labelId="country-label"
                        id="country"
                        value={state.country || ''}
                        onChange={(event) => {
                            handleChange(event.target.value, 'country')
                            setDirty(true)
                          }
                        }
                      >
                      {countryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      State or Province
                    </Typography>
                    <BootstrapInput
                      id={'state_or_province'}
                      value={state.state_or_province || ''}
                      placeholder="Enter State or Province"
                      onChange={(event) => {
                        handleChange(event.target.value, 'state_or_province')
                        setDirty(true)
                      }}
                      fullWidth
                      onKeyPress={handleKeypress}
                      //disabled={!canEdit}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Address
                    </Typography>
                    <BootstrapInput
                      id={'address'}
                      value={state.address || ''}
                      placeholder="Enter Address"
                      onChange={(event) => {
                        handleChange(event.target.value, 'address')
                        setDirty(true)
                      }}
                      fullWidth
                      onKeyPress={handleKeypress}
                      //disabled={!canEdit}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Zip Code
                    </Typography>
                    <BootstrapInput
                      id={'postal_code'}
                      value={state.postal_code || ''}
                      placeholder="Enter Zip Code"
                      onChange={(event) => {
                        handleChange(event.target.value, 'postal_code')
                        setDirty(true)
                      }}
                      fullWidth
                      onKeyPress={handleKeypress}
                      //disabled={!canEdit}
                    />
                  </Grid>
                </Grid>
                <StepTab step={step3} title={'Institution Status'}/>
                <Grid container spacing={5} style={{marginTop: '30px'}}>
                  <Grid item sm={4} xs={12}>
                     <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.enabled}
                          onChange={(event) => {
                            handleChange(event.target.checked, 'enabled');
                            setDirty(true)
                          }}
                          name="enabled"
                          color="primary"
                        />
                      }
                      label="Enabled"
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                     <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.distribution_site}
                          onChange={(event) => {
                            handleChange(event.target.checked, 'distribution_site');
                            setDirty(true)
                          }}
                          name="distribution_site"
                          color="primary"
                          disabled={props.institution_id !== undefined}
                        />
                      }
                      label="Distribution Site"
                    />
                  </Grid>
                </Grid>
                {!state.distribution_site &&
                <React.Fragment>
                  <StepTab step={step4} title={'Institution Evaluations'}/>
                  <ExistingEvaluations
                    selectedEvaluation={selectedEvaluation} 
                    existingEvaluations={existingEvaluations} 
                    handleSelectChange={handleSelectChange}
                    handleAddEvaluation={handleAddEvaluation}
                    institutionEvaluations={institutionEvaluations}
                    label={"Add Evaluation"}
                    selectWidth={4}
                  />
                  <AvailableEvaluations 
                    institutionEvaluations={institutionEvaluations} 
                    existingEvaluations={existingEvaluations} 
                    handleDeleteEvaluation={handleDeleteEvaluation}
                    handleEditEvaluation={null}
                    evalOnEdition={null}
                  />
                </React.Fragment>
                }
              </React.Fragment>
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
                    disabled={!dirty || state.institution_name === "" || state.region === ""}
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
        </>
      </RegisterForm>
    :
      <Grid container justify="center">
        <Grid item style={{paddingTop: '10%', paddingBottom: '5%'}}>
          <CircularProgress alt={'loading..'}/>
        </Grid>
      </Grid>   
    }
    </>
  );
}


export default AddInstitution;
