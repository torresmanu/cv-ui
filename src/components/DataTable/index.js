import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import CustomTableFooter from "./DefaultCustomTableFooter";
import DefaultRenderDataTable from "./DefaultRenderTable";
import {getProperty, removeNotIncluded} from "../../utils/objects";
import {InstitutionService} from "../../services/InstitutionService";
import {InstanceService} from "../../services/InstanceService";
import {KPIService} from "../../services/KPIService";
import { PortalUsersService } from "../../services/PortalUsersService";


export const applyFormat = (displayColumns, tableColumns) => (object) => {
  return displayColumns.map((displayColumn, index) => {
    if (displayColumn.skipFormatting) {
      return "";
    }
    const formatter = displayColumn.formatter;
    const propertyName = tableColumns[index];
    if (formatter) {
      return formatter(getProperty(object, propertyName));
    } else {
      return getProperty(object, propertyName);
    }
  });
};



export const DataTable = ({
  tableColumns,
  displayColumns,
  model,
  title,
  labelButton,
  overrideOption,
  additionalParams,
  maxWidth = "sm",
  filterParams = null,
  customSelect = null,
  withDialog = false,
  showModalTitle = true,
  renderDataTable = DefaultRenderDataTable,
  emptyResultsComponent = null,
  introJsMessage = null,
  id = null,
  addButton = false,
  backButton= true,
  rerender = false,
  setRerender,
  setOpenDialog = false,
  setResponseData = false,
  date =  null,
  enabled = null,
  tableData = []
}) => {
  const columns = tableColumns;
  const [originalData, setOriginalData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [createDialog, setCreateDialog] = React.useState(false);
  const [updateDialog, setUpdateDialog] = React.useState(false);
  const [updateRow, setUpdateRow] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [totalRows, setTotalRows] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [page, setPage] = React.useState(0);
  const [key, setKey] = useState(0);

  const manageData = (data) => {
    setIsLoading(false);
    if(data) {
      setOriginalData(data);
      setTotalRows(data["count"]);
      setData(
        data
          .map((object) => removeNotIncluded(object, columns))
          .map(applyFormat(displayColumns, tableColumns))
      );
    }
  };

  const getListModel = (paginationParams) => {
    setPage(paginationParams["page"]);
    setIsLoading(true);
    const keyid = id ? id : 0;

    paginationParams["page"] += 1;
    model=== "Institutions" ?
      InstitutionService.list().then((data) => {
        manageData(data);
      })
    : model === "Instances" ?
      InstanceService.get(keyid).then((data) => {
        data.map((instance)=> instance.enabled = instance.enabled === "" ? 0 : instance.enabled)
        manageData(data);
      })
    : model === "InstancesTable" ?
      InstanceService.list().then((data) => {
        data.map((instance)=> instance.enabled = instance.enabled === "" ? 0 : instance.enabled)
        manageData(data);
      })
    : model === "Evaluators" ?
      KPIService.getEvaluators().then((data) => {
        manageData(data);
      })
    : model === "KPI" ?     
      // keeping just the first 10 characters from date because time is not relevant
      KPIService.getMasterEvaluations(date.substring(0, 10)).then((data) => {
      setIsLoading(false);
      if(data?.data?.message?.includes("Access denied")){
        setOriginalData(Object.values(data));
        setTotalRows(0);
        setData( [data?.data?.message] );
      }
      else if(data) {
        const values_data = Object.values(data);
        manageData(values_data);
      }
    })
    : model === "Failures" ?     
      // keeping just the first 10 characters from date because time is not relevant
      KPIService.getFailureStats(date.substring(0, 10)).then((data) => {
      setIsLoading(false);
      if(data?.data?.message?.includes("Access denied")){
        setOriginalData(Object.values(data));
        setTotalRows(0);
        setData( [data?.data?.message] );
      }
      else if(data) {
        const values_data = Object.values(data);
        manageData(values_data);
      }
    })
    : model === "MasterUsersList" ?
    PortalUsersService.getMasterList().then((data) => {
      manageData(data);
    })
    : model === "Users" ? InstitutionService.getUsersForInstitution(keyid).then((data) => { 
      manageData(data);
    })
    :
    model=== "LinkInstitutions" ?
      InstitutionService.list().then((data) => { 
      if(data) {
        const mergedData = tableData.concat(data);
        // Remove duplicates by 'id'
        const uniqueData = Object.values(
          mergedData.reduce((acc, item) => {
            const isLinked = item.is_linked === true;
            if (!acc[item.keyid] || isLinked) {
              acc[item.keyid] = item;
            }
            return acc;
          }, {})
        ).sort((a, b) => {
          // Move 'is_linked' items to the beginning
          if (a.is_linked && !b.is_linked) {
            return -1;
          } else if (!a.is_linked && b.is_linked) {
            return 1;
          } else {
            return 0;
          }
        });
        manageData(uniqueData);
      }
    })
    :
    manageData(data)
  };

  const deleteRows = (rows) => {
    rows.forEach((element) => {
     /* const originalRowData = originalData[element.dataIndex];
      ItemsService.destroy(model, originalRowData).then((response) => {
        getListModel({ page: page, per_page: rowsPerPage });
        if (response.error) setDeleteDialog(true);
      });*/
    });
  };

  const fields = {
    page,
    rowsPerPage,
    createDialog,
    setCreateDialog,
    model,
    labelButton,
    updateDialog,
    setUpdateDialog,
    updateRow,
    title,
    showModalTitle,
    data,
    displayColumns,
    maxWidth,
    deleteDialog,
    setDeleteDialog,
    isLoading,
    emptyResultsComponent,
    introJsMessage,
    additionalParams,
    id,
    addButton,
    backButton,
    setOpenDialog,
    setResponseData,
    setRerender,
    date,
    enabled
  };

  const options = {
    print: false,
    download: false,
    filter: false,
    serverSide: false,
    viewColumns: false,
    sort: false,
    elevation: 0,
    onRowClick: function (rowData, rowMeta) {
      const originalRowData = originalData[rowMeta.rowIndex];
      originalRowData.editPage = true;
      setUpdateRow(originalRowData);
      setUpdateDialog(true);
    },
    customToolbarSelect: customSelect
      ? (selectedRows, displayData, setSelectedRows) => {
          const Component = customSelect.component;
          return (
            <Component
              selectedRows={selectedRows}
              displayData={displayData}
              setSelectedRows={setSelectedRows}
              icons={customSelect.icons}
              deleteRows={() => deleteRows(selectedRows.data)}
              tableCallback={() => {
                setSelectedRows([]);
                getListModel({ page: page, per_page: rowsPerPage });
              }}
            />
          );
        }
      : null,
    rowsPerPageOptions: [5, 10, 20],
    rowsPerPage: rowsPerPage,
    count: totalRows,
    customFooter: (
      totalRows,
      page,
      rowsPerPage,
      setRowsPerPage,
      setPage,
      textLabels
    ) => (
      <CustomTableFooter
        count={totalRows}
        page={page}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setPage={setPage}
        textLabels={textLabels}
      />
    ),
    page: page,
    search: true,
    searchText: searchText,
    textLabels: {
      body: {
        toolTip: "Sort",
        noMatch: isLoading ? (
          <CircularProgress />
        ) : !withDialog ? (
          "No results "
        ) : (
          <>
          </>
        ),
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Showing records from:",
        displayRows: "of",
      },
    },
    ...overrideOption,
  };

  useEffect(() => {
    getListModel({ page: page, per_page: rowsPerPage });
  }, [filterParams?.staticFilters, rerender, key]);
  return renderDataTable(getListModel, fields, options, key, setKey);
};
