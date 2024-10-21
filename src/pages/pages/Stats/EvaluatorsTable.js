import React from 'react';
//Components
import {DataTable} from "../../../components/DataTable";
import {getStyles} from "../../../components/DataTable/CustomStyles";
//Material UI
import {MuiThemeProvider} from "@material-ui/core";
import moment from "moment/moment";

const dateFormat = 'DD MMM YYYY';

const displayColumns = () => [
  {
    name: "Evaluator Name",
    options: {
      display: false,
      searchable: true,
      search: true
    }
  },
  {
    name: "Evaluator",
    options: {
      customBodyRender: (value, tableMeta) => {
        return `${value}, ${tableMeta.rowData[0]}`
      },
      searchable: true,
      search: true,
      display:true,
      filter: false,
    }
  },
  {
    name: "Last Evaluation Date",
    options: {
      customBodyRender: (date, tableMeta) => {
        if (!moment(date).isValid()){
          return '-'
        }
        return moment(date).format(dateFormat)
      },
      searchable: true
    }
  },
  {
    name: "Institutions",
    options: {
      customBodyRender: (value, tableMeta) => {
          return value.replace(/,/g, ', ')
      },
      searchable: true,
      search: true,
      display:true,
    }
  },
  {
    name: "Email",
    options: {
      searchable: true,
      search: true,
      display:true,
    }
  }
 ];

const columns = [ "name",
                  "lastname",
                  "lasteval",
                  "institutions",
                  "email"
                ];



export default function KPI (){
const [rerender , setRerender] = React.useState(false);
const today = new Date();
const formattedDate = today.toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

const options = {
  filter: false,
  confirmFilters: true,
  filterType: 'textField',
  sort: true,
  selectableRows: 'none',
  print: false,
  download: true,
  downloadOptions: {filename: `EvaluatorsTable_${formattedDate}.csv`, separator: ',', useDisplayedColumnsOnly: true},
  searchAlwaysOpen: false,
  searchPlaceholder: 'Search by any column...',
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
  return(
    <MuiThemeProvider
      theme={(theme) => {
        return getStyles(theme);
      }}
    >

      <DataTable
        model={'Evaluators'}
        displayColumns={displayColumns()}
        tableColumns={columns}
        title={'Evaluators Table'}
        labelButton='Evaluators'
        showModalTitle={false}
        overrideOption={options}
        addButton={true}
        rerender={rerender}
        setRerender={setRerender}
      />
    </MuiThemeProvider>
  )
}
