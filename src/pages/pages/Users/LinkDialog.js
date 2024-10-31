import {default as React, useEffect} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Button from "@material-ui/core/Button/index";
import {DataTable} from "../../../components/DataTable";
import {DialogActions} from "@material-ui/core";
import LinkActions from "./LinkActions";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LinkDialog({ open, handleClose, linked_institutions }){
  const [formattedData, setFormattedData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setFormattedData(Object.entries(linked_institutions).map(([institution_id, institution_name]) => ({
      'keyid': +institution_id,
      'institution_name': institution_name,
      'is_linked': true
    })))
  }, [linked_institutions]);
  
  const displayColumns = () => [
    {
      name: "Name",
      options: {
        display: true,
        searchable: true,
        search: true
      }
    },
    {
      name: "ID",
      options: {
        display:true,
        filter: false,
        searchable: true
      }
    },  
    {
      name: "Link / Unlink",
      options: {
        display:true,
        filter: false,
        searchable: true,
        customBodyRender: (value, tableMeta) => {
          const institutionId = tableMeta.rowData[1];

          function setValue(){ 
            const newValue = tableMeta.currentTableData.map((item) =>
              item.data[1] === institutionId ? {
                  institution_name: item.data[0], keyid: item.data[1], is_linked: !value}
                  : {institution_name: item.data[0], keyid: item.data[1], is_linked: item.data[2]}
            );
            setFormattedData(newValue);
          };
          return (
            <LinkActions
              institution_id={tableMeta.rowData[1]}
              is_linked={value}
              setValue={setValue}
              setIsLoading={setIsLoading}
            />
          )
        },
      }
    }
  ];

  const columns = [ "institution_name", "keyid", "is_linked"];
  const options = {
    filter: false,
    confirmFilters: true,
    filterType: 'textField',
    selectableRows: 'none',
    print: false,
    searchAlwaysOpen: false,
    searchPlaceholder: 'Search by Institution Name or ID...',
    responsive: 'standard',
    viewColumns: false,
    // Search ALL columns, including hidden fields that use display:false, viewColumns:false...
    customSearch: (searchQuery, currentRow, columns) => {
        let isFound = false;
        currentRow.forEach(col => {
          if (col && col.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0) {
            isFound = true;
          }
        });
        return isFound;
    },
  };

  return (
    <Dialog
      fullWidth
      maxWidth={'sm'}
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
              {`Select Institution to Link or Unlink: `}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={handleClose} style={{margin: "0px", minWidth: "100%", fontSize: "16px"}}>
              &times;
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        { isLoading ?  
          <Grid container justify="center">
            <Grid item style={{paddingTop: '10%', paddingBottom: '5%'}}>
              <CircularProgress alt={'loading..'}/>
            </Grid>
          </Grid> 
            :
          <DataTable
            model={'LinkInstitutions'}
            displayColumns={displayColumns()}
            tableColumns={columns}
            title={'Institutions'}
            labelButton='Institutions'
            showModalTitle={false}
            overrideOption={options}
            backButton={false}
            tableData={formattedData}
          />
        }
      </DialogContent>
      <DialogActions>
        <Button
          className={"save"}
          style={{float: "right", borderRadius: '8px', marginBottom: "15px", marginRight: "15px", width: "100px"}}
          color="primary"
          variant="outlined"
          onClick={handleClose}
        >
          CLOSE
        </Button>
      </DialogActions>
  </Dialog>
  )
}
