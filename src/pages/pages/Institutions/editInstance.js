import React, {useEffect} from "react";
import {
  Button,
  Grid,
  Typography,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import RegisterForm from "../RegisterForm/RegisterForm";
import step1 from "../../../images/step1.png"
import step2 from "../../../images/step2.png"
import step3 from "../../../images/step3.png"
import step4 from "../../../images/step4.png"
import step5 from "../../../images/step5.png"
import {StepTab} from "../../../components/StepTab";
import {useHistory, useLocation} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import {InstanceService} from "../../../services/InstanceService";
import LiberateInstanceDialog from "./LiberateInstanceDialog";
import GLOBALS from "../../../services/GLOBALS.json";
import MouseOverPopover from "../../../utils/MouseOverPopover";
import {KeyboardDatePicker} from "@material-ui/pickers";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import BootstrapInput from "../../../components/BootstrapInput";
import ChangeHMDDialog from "./ChangeHMDDialog";
import '../../../App.css';
import { formattedDate } from "../../../utils/date";
import InstanceInformation from "./InstanceInformation";
import ButtonWithStyles from "../../../pages/components/ButtonWithStyles";

function EditInstance() {
  const location = useLocation();
  const props = location.state;
  const history = useHistory();
  const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
  const canLiberateInstances = permissions['instances']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_LIBERATE_INSTANCES));
  const canChangeHMD = permissions['instances']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_CHANGE_HMD_SN));
  const [dirty, setDirty] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openChangeHMDDialog, setOpenChangeHMDDialog] = React.useState(false);
  const [product_name_options, setProductNameOptions] = React.useState([]);
  const [computer_supplier_options, setComputerSupplierOptions] = React.useState([]);
  const [computer_model_options, setComputerModelOptions] = React.useState([]);
  const [eyetracker_supplier_options, setEyeTrackerSupplierOptions] = React.useState([]);
  const [eyetracker_model_options, setEyeTrackerModelOptions] = React.useState([]);
  const [responsible_options, setPcResponsibleOptions] = React.useState([]);
  const [sw_installation_date, setSwInstallationDate] = React.useState(new Date());
  const [configuration_date, setConfigurationDate] = React.useState(new Date());
  const [state, setState] = React.useState({
    contact_name: "",
    eyetracker_SN: "",
    computer_SN: "",
    location_description: "",
    contact_email: "",
    comments: "",
    instance: "",
    complete_uid: "",
    current_version: "",
    last_modify: "",
    product_name: -1,
    computer_supplier: -1,
    computer_model: -1,
    eyetracker_supplier: -1,
    eyetracker_model: -1,
    product_sell_condition: -1,
    released: 0,
    enabled: false,
    purpose: "",
    pc_configuration: false,
    configuration_responsible: "",
    vr_configuration: false,
    configuration_comments: "",
    sw_installation: false,
    sw_installation_responsible: "",
    functional_control: 0,
    functional_control_id: "",
    release_responsible: "",
    release_date: "",
    hmd_sn_change: ""
    })

  useEffect(
  () => {
    InstanceService.get_all_std_string()
      .then( (response) => {
        const product_name = [];
        const computer_supplier = [];
        const computer_model = [];
        const eyetracker_supplier = [];
        const eyetracker_model = [];
        //const product_sell_condition = [];
        const pc_config_reject = [];
        const vr_install_reject = [];
        const vm_install_reject = [];
        const responsible = []; 
        Object.values(response).map((item)=>{
          if (item?.string_type === 'product_name') {
            product_name.push( {value: item?.keyid, label: item?.string_value})
          }
          else if (item?.string_type === 'computer_supplier') {
            computer_supplier.push({value: item?.keyid, label: item?.string_value})
          }
          else if (item?.string_type === 'eyetracker_supplier') {
            eyetracker_supplier.push({value: item?.keyid, label: item?.string_value})
          }
          else if (item?.string_type === 'computer_model') {
            computer_model.push({value: item?.keyid, label: item?.string_value})
          }
          else if (item?.string_type === 'eyetracker_model') {
            eyetracker_model.push({value: item?.keyid, label: item?.string_value})
          }
          else if (item?.string_type === 'pc_config_reject') {
            pc_config_reject.push({value: item?.keyid, label: item?.string_value})
          }
          else if (item?.string_type === 'vr_install_reject') {
            vr_install_reject.push({value: item?.keyid, label: item?.string_value})
          }
          else if (item?.string_type === 'vm_install_reject') {
            vm_install_reject.push({value: item?.keyid, label: item?.string_value})
          }
          else if (item?.string_type.includes('responsible')) {
            responsible.push({value: item?.keyid, label: item?.string_value})
          }

        })
        setProductNameOptions( product_name || [])
        setComputerSupplierOptions( computer_supplier || [])
        setComputerModelOptions( computer_model || [])
        setEyeTrackerSupplierOptions( eyetracker_supplier || [])
        setEyeTrackerModelOptions( eyetracker_model || [])
        setPcResponsibleOptions( responsible || [])

        if(props.instance_id !== undefined){
          InstanceService.get_product(props.institution_id, props.instance_id)
            .then((response) => {
              if(response === undefined){
                history.goBack()
              }
              else {
                setState(response)
                
                if(response?.computer_SN){
                  handleChange(response?.computer_SN, 'computer_SN')
                }
                else{
                  handleChange(props?.pc_serial_number, 'computer_SN')
                }
  
                if(response?.eyetracker_SN){
                  handleChange(response?.eyetracker_SN, 'eyetracker_SN')
                }
                else{
                  handleChange(props?.vr_serial_number, 'eyetracker_SN')
                }

                // Find the first object with "functional_control": 0
                const functionalVerification = response.functional_control_details?.find(
                  (item) => item.functional_control === 0
                );
                // Set state.functional_verification to the found object or null if not found
                if (functionalVerification) {
                  handleChange(functionalVerification, 'functional_verification');
                } else {
                  handleChange(null, 'functional_verification');
                }
                // Find the last object where "hmd_change_email" is not null or empty string
                const hmdChanged = response.functional_control_details
                ?.filter(
                  (item) => item.hmd_change_email && item.hmd_change_email !== ""
                )
                .pop(); // Get the last item in the filtered array

              if (hmdChanged) {
                handleChange(hmdChanged, 'hmd_changed');
              } else {
                handleChange(null, 'hmd_changed');
              }

  
                //Dates are not in state. because of DatePicker requirements and are setted to null if no date provided from api.
                handleSwInstallationDateChange(response?.sw_installation_date ? response?.sw_installation_date : null)
                handlePcConfigDate(response?.configuration_date ? response?.configuration_date : null)
                setDirty(false)
                setLoading(false);
              }
              
            }
          ).catch((reason)=>{
            history.goBack()
          })
        }
        else setLoading(false);

      })
      .catch(()=> {
        setTimeout(true);
      })
  },
  []
  );

  const purpose_options = [{value: 0, label: 'Research'}, {value: 1, label: 'Commercial'}, {value: 2, label: 'Demo'}];
  const product_sell_condition_options = [{value: 0, label: 'Loaned'}, {value: 1, label: 'Sold'}, {value: 2, label: 'Internal Use'}];

  const userFirstName = sessionStorage.getItem('user_first_name');
  const userLastName = sessionStorage.getItem('user_last_name');
  const userId = sessionStorage.getItem('user_id');

  // this is needed to show date as DD/MM/YYYY
  const formatted_date = formattedDate(state?.release_date);

  function handleSubmit() {
    InstanceService.set_product(props.institution_id, props.instance_id,{
      computer_supplier: state.computer_supplier,
      eyetracker_supplier: state.eyetracker_supplier,
      computer_model: state.computer_model,
      eyetracker_model: state.eyetracker_model,
      eyetracker_SN: state.eyetracker_SN,
      computer_SN: state.computer_SN,
      contact_name: state.contact_name,
      contact_email: state.contact_email,
      location_description: state.location_description,
      product_sell_condition: state.product_sell_condition,
      product_name: state.product_name,
      comments: state.comments,
      enabled: state.enabled,
      purpose: state.purpose,
      pc_configuration: state.pc_configuration,
      configuration_responsible: state.configuration_responsible,
      vr_configuration: state.vr_configuration,
      configuration_date: configuration_date,
      configuration_comments: state.configuration_comments,
      sw_installation: state.sw_installation,
      sw_installation_responsible: state.sw_installation_responsible,
      release_responsible: state.release_responsible.id,
      release_date: state.release_date,

      // Dates are not in state. because of DatePicker requirements
      pc_config_date: configuration_date,      
      sw_installation_date: sw_installation_date,

    }).then((response)=>(
      history.goBack()
    ))
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
    else history.goBack();
  }

  const handleLiberate = () => {
      setOpenDialog(true);
  };

  // This function is used to format the date to the format that is used in the database
  function formatDateToCustomFormat() { 
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // this function is called when the user liberates the instance
  const handleChecked = () => { 
    handleChange(1, 'released')
    handleChange({id: userId, name: `${userFirstName}, ${userLastName}`}, 'release_responsible')
    handleChange(formatDateToCustomFormat(), 'release_date')
  }
  function handleChange(value, key) {
    setState(prevState => ({
        ...prevState, [key]: value }));
  }

  function handleSelectChange(newValue, actionMeta, type) {
    if (actionMeta.action === 'create-option'){
      InstanceService.set_std_string(type, newValue.value).then((response)=>{
        handleChange(parseInt(response.keyid), type);
      }
      )
    }else{
      handleChange(newValue.value, type)
    }
    setDirty(true)
  }

  const handleSwInstallationDateChange = (date) => {
    const isValidDate = date instanceof Date && !isNaN(date);
    setSwInstallationDate(date);
    //Disable Save Button if date is not valid
    isValidDate ? setDirty(true) : setDirty(false);
  };

  const handlePcConfigDate = (date) => {
    const isValidDate = date instanceof Date && !isNaN(date);
    setConfigurationDate(date);
    //Disable Save Button if date is not valid
    isValidDate ? setDirty(true) : setDirty(false);
  };

  return (
    <>
    { !loading ?
      <RegisterForm title={ props?.institution_name + (props.instance_id !== undefined ? ' - Edit Instance' : ' - Add Instance') }>
        <>
          <form>
              <React.Fragment>
                <LiberateInstanceDialog
                  open={openDialog}
                  handleClose={(e)=>setOpenDialog(false)}
                  institutionId={props.institution_id}
                  instanceId={props.instance_id}
                  handleChecked={handleChecked}
                />
                <ChangeHMDDialog
                  open={openChangeHMDDialog}
                  handleClose={(e)=>setOpenChangeHMDDialog(false)}
                  instance_id={props.instance_id}
                  institution_id={props.institution_id}
                />
                {props.instance_id !== undefined &&
                  <InstanceInformation state={state}/>
                }
                <StepTab step={step1} title={'Product Information'}/>
                <Grid container spacing={5} className="container">
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Product Name
                    </Typography>
                      <CreatableSelect
                        defaultValue={product_name_options.find((p)=>p.value === state.product_name)}
                        onChange={(e, action)=>handleSelectChange(e, action, 'product_name')}
                        options={product_name_options}
                      />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Contact Name
                    </Typography>
                    <BootstrapInput
                      id={'contact_name'}
                      value={state.contact_name || ''}
                      placeholder="Enter Contact Name"
                      onChange={(event) => {
                        handleChange(event.target.value, 'contact_name')
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
                      Contact Email
                    </Typography>
                    <BootstrapInput
                      id={'contact_email'}
                      value={state.contact_email || ''}
                      placeholder="Enter Contact Email"
                      onChange={(event) => {
                        handleChange(event.target.value, 'contact_email')
                        setDirty(true)
                      }}
                      fullWidth
                      onKeyPress={handleKeypress}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '8px' }}>
                        <Typography variant='body1'>
                          Location Description
                        </Typography>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <MouseOverPopover
                          text='Enter institution branch, evaluation office ID, or another information useful for locating the device into the institution.'
                        />
                      </div>
                    </div>
                    <BootstrapInput
                      id={'location_description'}
                      value={state.location_description || ''}
                      placeholder="Enter Location Description"
                      onChange={(event) => {
                        handleChange(event.target.value, 'location_description')
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
                      Purpose
                    </Typography>
                    <Select
                        defaultValue={purpose_options.find((p)=>p.value === state.purpose)}
                        onChange={(e, action)=>handleSelectChange(e, action, 'purpose')}
                        options={purpose_options}
                      />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Condition
                    </Typography>
                    <Select
                        defaultValue={product_sell_condition_options.find((p)=>p.value === state.product_sell_condition)}
                        onChange={(e, action)=>handleSelectChange(e, action, 'product_sell_condition')}
                        options={product_sell_condition_options}
                      />
                  </Grid>
                </Grid>
                <StepTab step={step2} title={'Computer Information'}/>
                <Grid container spacing={5} className="container">
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Computer Supplier
                    </Typography>
                    {/*<CreatableSelect
                      defaultValue={computer_supplier_options.find((p)=>p.value === state.computer_supplier)}
                      onChange={(e, action)=>handleSelectChange(e, action, 'computer_supplier')}
                      options={computer_supplier_options}
                    />*/}
                    <BootstrapInput
                      id={'computer_supplier'}
                      value={computer_supplier_options.find((p)=>p.value === state.computer_supplier)?.label || ''}
                      placeholder="Computer Supplier"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Computer Model
                    </Typography>
                    {/*<CreatableSelect
                      defaultValue={computer_model_options.find((p)=>p.value === state.computer_model)}
                      onChange={(e, action)=>handleSelectChange(e, action, 'computer_model')}
                      options={computer_model_options}
                      disabled
                    />*/}
                  
                    <BootstrapInput
                      id={'computer_model'}
                      value={computer_model_options.find((p)=>p.value === state.computer_model)?.label || ''}
                      placeholder="Computer Model"
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={5} alignItems="center">
                  <Grid item sm={8} xs={12}>
                    <Typography variant='body1'>
                      Computer Serial Number
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <BootstrapInput
                      id={'computer_SN'}
                      value={state.computer_SN || ''}
                      placeholder="Computer Serial Number"
                      onChange={(event) => {
                        handleChange(event.target.value, 'computer_SN')
                        setDirty(true)
                      }}
                      fullWidth
                      onKeyPress={handleKeypress}
                      disabled
                    />
                  </Grid>
                  {(props.pc_serial_number !== "" && state.computer_SN !== null ) && (props.pc_serial_number !== state.computer_SN) &&
                    <Grid item sm={4} xs={12}>
                      <Grid container alignItems="center">
                        <Grid item sm={2} xs={4}>
                          <ReportProblemOutlinedIcon style={{ color: '#FFC107' }} />
                        </Grid>
                        <Grid item sm={10} xs={8}>
                          <Typography variant='body1' style={{ color: '#FFC107' }}>
                            Computer Serial Number is different from the one registered in the instance.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  }
                </Grid>
                <StepTab step={step3} title={'HMD Information'}/>
                <Grid container spacing={5} className="container">
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      HMD Supplier
                    </Typography>
                    {/*<CreatableSelect
                      defaultValue={eyetracker_supplier_options.find((p)=>p.value === state.eyetracker_supplier)}
                      onChange={(e, action)=>handleSelectChange(e, action, 'eyetracker_supplier')}
                      options={eyetracker_supplier_options}
                      disabled
                    />*/}
                    <BootstrapInput
                      id={'et_supplier'}
                      value={eyetracker_supplier_options.find((p)=>p.value === state.eyetracker_supplier)?.label || ''}
                      placeholder="HMD Supplier"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      HMD Model
                    </Typography>
                    {/*<CreatableSelect
                      defaultValue={eyetracker_model_options.find((p)=>p.value === state.eyetracker_model)}
                      onChange={(e, action)=>handleSelectChange(e, action, 'eyetracker_model')}
                      options={eyetracker_model_options}
                      disabled
                    />*/}
                    <BootstrapInput
                      id={'et_model'}
                      value={eyetracker_model_options.find((p)=>p.value === state.eyetracker_model)?.label || ''}
                      placeholder="HMD Model"
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      HMD Serial Number
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <BootstrapInput
                      id={'eyetracker_SN'}
                      value={state.eyetracker_SN || ''}
                      placeholder="Eyetracker Serial Number"
                      onChange={(event) => {
                        handleChange(event.target.value, 'eyetracker_SN')
                        setDirty(true)
                      }}
                      fullWidth
                      onKeyPress={handleKeypress}
                      disabled
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    {(props.vr_serial_number !== "" && state.eyetracker_SN !== null ) && (props.vr_serial_number !== state.eyetracker_SN) &&
                      <Grid container alignItems="center">
                        <Grid item sm={2} xs={4}>
                          <ReportProblemOutlinedIcon style={{ color: '#FFC107' }} />
                        </Grid>
                        <Grid item sm={10} xs={8}>
                          <Typography variant='body1' style={{ color: '#FFC107' }}>
                            HMD Serial Number is different from the one registered in the instance.
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                  </Grid>
                  {canChangeHMD &&
                    <Grid item xs={12} sm={4}>
                      <ButtonWithStyles                      
                        onClick={()=>setOpenChangeHMDDialog(true)}
                        fullWidth={true}
                      >
                      REQUEST HMD CHANGE
                      </ButtonWithStyles>
                    </Grid>
                  }
                </Grid>
                <StepTab step={step4} title={'PC and HMD Configuration'}/>
                <Grid container spacing={5} className="container">
                  <Grid item sm={4} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={state.pc_configuration === 1 || state.pc_configuration === true}
                          onChange={(event) => {
                            handleChange(event.target.checked ? 1 : 0, 'pc_configuration');
                            setDirty(true);
                          }}
                          name="pc_configuration"
                          color="primary"
                        />
                        }
                        label="PC Configuration"
                      />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.vr_configuration === 1 || state.vr_configuration === true}
                            onChange={(event) => {
                              handleChange(event.target.checked ? 1 : 0, 'vr_configuration');
                              setDirty(true)
                            }}
                            name="vr_configuration"
                            color="primary"
                          />
                        }
                        label="HMD Configutation"
                      />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1' style={{marginBottom: '8px'}}>
                      Responsible
                    </Typography>
                    <CreatableSelect
                      defaultValue={responsible_options.find((p)=>p.value === state.configuration_responsible)}
                      onChange={(e, action) => {
                        handleSelectChange(e, action, 'configuration_responsible')
                        setDirty(true)
                      }}
                      options={responsible_options}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Configuration Date
                    </Typography>
                    <KeyboardDatePicker
                      disableToolbar
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      value={configuration_date}
                      onChange={(date) =>{
                        handlePcConfigDate(date)
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item sm={8} xs={12}>
                  <Typography variant='body1'>
                      Comments and Observations
                    </Typography>
                      <TextField
                        style={{width:'100%'}}
                        fullWitdh
                        id={"configuration_comments"}
                        multiline
                        placeholder="Enter Comments"
                        rows={2}
                        variant="outlined"
                        onChange={(event) => {
                          handleChange(event.target.value, 'configuration_comments')
                          setDirty(true)
                        }}
                        value={state.configuration_comments || ''}
                        onKeyPress={handleKeypress}
                      />
                  </Grid>
                </Grid>
                <StepTab step={step5} title={'Software Installation Information'}/>
                <Grid container spacing={5} className="container">
                  <Grid item sm={4} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.sw_installation === 1 || state.sw_installation === true}
                            onChange={(event) => {
                              handleChange(event.target.checked ? 1 : 0, 'sw_installation');
                              setDirty(true)
                            }}
                            name="sw_installation"
                            color="primary"
                          />
                        }
                        label="Software Installation"
                      />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1' style={{marginBottom: '8px'}}>
                      Responsible
                    </Typography>
                    <CreatableSelect
                      defaultValue={responsible_options.find((p)=>p.value === state.sw_installation_responsible)}
                      onChange={(e, action) => {
                        handleSelectChange(e, action, 'sw_installation_responsible')
                        setDirty(true)
                      }}
                      options={responsible_options}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Installation Date
                    </Typography>
                    <KeyboardDatePicker
                      disableToolbar
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      value={sw_installation_date}
                      onChange={(date) =>{
                        handleSwInstallationDateChange(date)
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </Grid>                 
                </Grid>
                <Grid container spacing={15}> 
                  <Grid item sm={8} xs={12}>
                    <Divider style={{marginTop: 20}}/>
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.functional_verification?.functional_control === 0 || false}
                          disabled={true}
                          name="functional_control"
                          color="primary"
                        />
                      }
                      label="Functional Verification"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Functional Verification Responsible
                    </Typography>
                    <BootstrapInput
                      id={'functional_responsible'}
                      value={ state.functional_verification?.name || ''}
                      placeholder="Functional Verification Responsible"
                      fullWidth
                      disabled={true}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Functional Verification Date
                    </Typography>
                    <BootstrapInput
                      id={'functional_date'}
                      value={ state.functional_verification?.last_modify ? formattedDate(state.functional_verification?.last_modify) : ''}
                      placeholder="Functional Verification Date"
                      fullWidth
                      disabled={true}
                    />
                  </Grid>
                </Grid>
                {state.hmd_changed &&
                <>  
                  <Grid container spacing={15}> 
                    <Grid item sm={8} xs={12}>
                      <Divider style={{marginTop: 20, marginBottom: 15}}/>
                    </Grid>
                  </Grid>                
                  <Grid container spacing={5}>
                    <Grid item sm={4} xs={12}>
                      <Typography variant='body1'>
                        HMD Change Responsible
                      </Typography>
                      <BootstrapInput
                        id={'hmd_change_responsible'}
                        value={ state.hmd_changed.hmd_change_lname ? 
                          `${state.hmd_changed.hmd_change_lname}, ${state.hmd_changed.hmd_change_fname}`
                            : ''}
                        placeholder="HMD Change Responsible"
                        fullWidth
                        disabled={true}
                        onKeyPress={handleKeypress}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Typography variant='body1'>
                        HMD Change Date
                      </Typography>
                      <BootstrapInput
                        id={'functional_date'}
                        value={ state.hmd_changed.last_modify ? formatted_date(state.hmd_changed.last_modify) : ''}
                        placeholder="Functional Date"
                        fullWidth
                        disabled={true}
                        onKeyPress={handleKeypress}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={5}>
                    <Grid item sm={4} xs={12}>
                      <Typography variant='body1'>
                        HMD Change Responsible Email
                      </Typography>
                      <BootstrapInput
                        id={'functional_responsible_email'}
                        value={ state.hmd_changed.hmd_change_email  || ''}
                        placeholder="HMD Change Responsible Email"
                        fullWidth
                        disabled={true}
                        onKeyPress={handleKeypress}
                      />
                    </Grid>
                  </Grid>
                </>
                }
                <Grid container spacing={15}> 
                  <Grid item sm={8} xs={12}>
                    <Divider style={{marginTop: 20}}/>
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item sm={4} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.released}
                            onChange={(event) => {
                              handleLiberate()
                            }}
                            name="released"
                            color="primary"
                            disabled={state.released || !canLiberateInstances || !(state?.functional_verification)}
                          />
                        }
                        label={state.released ? "Instance Released" : "Release Instance"}
                      />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Release Responsible
                    </Typography>
                    <BootstrapInput
                      id={'release_responsible'}
                      value={ state.released ? state.release_responsible.name : ''}
                      placeholder="Release Responsible"
                      fullWidth
                      disabled={true}
                      onKeyPress={handleKeypress}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Typography variant='body1'>
                      Release Date
                    </Typography>
                    <BootstrapInput
                      id={'release_date'}
                      value={ state.released ? formatted_date : ''}
                      placeholder="Release Date"
                      fullWidth
                      disabled={true}
                      onKeyPress={handleKeypress}
                    />
                  </Grid>
                </Grid>
                <StepTab title={'Instance Status'}/>
                <Grid container spacing={5} className="container">
                  <Grid item sm={4} xs={12}>
                     <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.enabled === '1' || state.enabled === true}
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
                </Grid>
                <Divider style={{marginTop: 30}}/>
                <Grid container style={{marginTop: "30px"}}>
                  <Grid item sm={8} xs={12}>
                    <TextField
                      style={{width:'100%'}}
                      fullWitdh
                      id={"comments"}
                      multiline
                      label="Enter Comments"
                      rows={2}
                      variant="outlined"
                      onChange={(event) => {
                        handleChange(event.target.value, 'comments')
                        setDirty(true)
                      }}
                      value={state.comments || ''}
                      onKeyPress={handleKeypress}
                    />
                  </Grid>
                </Grid>
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
                    disabled={!dirty}
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
      </Grid>    }
    </>
  );
}

export default EditInstance;