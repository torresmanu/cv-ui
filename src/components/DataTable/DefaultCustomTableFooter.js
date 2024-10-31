import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MuiTablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import { withStyles } from "@material-ui/core/styles";

const defaultFooterStyles = {
};

function NoPagination() {
  return (
    <div>
    </div>
  );
}

class DefaultCustomTableFooter extends React.Component {

  handleRowChange = event => {
    this.props.setRowsPerPage(event.target.value);
  };

  handlePageChange = (_, page) => {
    this.props.setPage(page);
  };

  render() {
    const { count, page, rowsPerPage, textLabels, defaultRowsPerPage=10 } = this.props;
    const footerStyle = {
      display:'flex',
      justifyContent: 'flex-end',
      padding: '0px 24px 0px 24px'
    };

    return (
      count > defaultRowsPerPage ? 
        <TableFooter>
          <TableRow>
            <TableCell style={footerStyle} colSpan={1000}>
              <MuiTablePagination
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={textLabels.rowsPerPage}
                labelDisplayedRows={({ from, to, count }) => count > rowsPerPage ? `${from}-${to} ${textLabels.displayRows} ${count}` : ''}
                backIconButtonText={textLabels.previous}
                nextIconButtonText={textLabels.next}
                rowsPerPageOptions={[5,10,20]}
                onChangePage={this.handlePageChange}
                onChangeRowsPerPage={this.handleRowChange}
                ActionsComponent={count > rowsPerPage ? TablePaginationActions : NoPagination}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      :
        <React.Fragment>
          &nbsp;
        </React.Fragment>
    );
  }

}

export default withStyles(defaultFooterStyles, { name: "CustomTableFooter" })(DefaultCustomTableFooter);