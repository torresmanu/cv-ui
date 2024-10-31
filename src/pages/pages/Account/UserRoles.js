import {default as React} from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Button from "@material-ui/core/Button/index";
import {DataTable} from "../../../components/DataTable";
import {DialogActions} from "@material-ui/core";
import {PermissionsService} from "../../../services/PermissionsService";


const displayColumns = () => [
  {
    name: "Role",
    options: {
      display: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <>
            <Typography variant={'h6'}>
              {value}
            </Typography>
          </>

        )
      },
      searchable: true,
      search: true
    }
  },
  {
    name: "Description",
    options: {
      display:true,
      filter: false,
      searchable: true
    }
  },
  {
    name: "Set",
    options: {
      display:false,
      filter: false,
      searchable: true
    }
  },
 ];

const columns = [ "name", "description", "set"];
export default function RolesDialog({ open, handleClose, user_id, institution_id }){

  const options = {
    filter: false,
    confirmFilters: true,
    filterType: 'textField',
    selectableRows: 'none',
    print: false,
    searchAlwaysOpen: true,
    searchPlaceholder: 'Search by Role or Description...',
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
    onRowClick: function (rowData, rowMeta) {
      // rowdata[2] is the unique string that identify the Set
      PermissionsService.setSets(user_id, institution_id, rowData[2]).then((response)=>{
        handleClose()
      })
    },
  };


  return (
    <Dialog
      fullWidth
      maxWidth={'md'}
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
              {`Select User Role: `}
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
        <DataTable
          model={'PermissionSets'}
          displayColumns={displayColumns()}
          tableColumns={columns}
          showModalTitle={false}
          overrideOption={options}
          backButton={false}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={"save"}
          style={{float: "right", borderRadius: '8px', marginBottom: "15px", marginRight: "15px", width: "100px"}}
          color="primary"
          variant="outlined"
          onClick={handleClose}
        >
          CANCEL
        </Button>
      </DialogActions>
  </Dialog>
  )
}
