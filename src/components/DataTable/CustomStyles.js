import {createMuiTheme} from "@material-ui/core/styles";

export function customChipsRender(values) {
    return values.some((element) => element !== "")
        ? values.filter((element) => element !== "")
        : [];
}

export function updateChips(filterList, filterPos, index) {
    if (filterPos !== -1) {
        filterList[index][filterPos] = "";
    } else {
        filterList[index].some((element, idx) => {
            if (element !== "") {
                filterList[index][idx] = "";
                return true;
            }
            return false;
        });
    }
    return filterList;
}


export function getStyles(theme){
    return createMuiTheme({
        ...theme,
        overrides: {
            ...theme.overrides,
            MUIDataTableFilter: {
                gridListTile: {
                    marginTop: "none !important",
                },
                title: {
                    fontWeight: "bold",
                    fontSize: "larger",
                    marginLeft: "none !important",
                },
                resetLink: {
                    marginBottom: "3px",
                    backgroundColor: "none !important",
                },
            },
            MuiGridList: {
                root: {
                    width: "305px",
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    flexFlow: "column-wrap",
                    paddingLeft: "7px",
                },
            },
            MuiGridListTile: {
                tile: {
                    marginLeft: "10px !important",
                    marginRight: "15px !important",
                    paddingTop:"10px !important"
                },
                root: {
                    width: "100% !important",
                    padding: "0px !important",
                },
            },
            MuiButton: {
                contained: {
                    color: "white",
                    backgroundColor: "#003153",
                    "&:hover": {
                        backgroundColor: "#00223a",
                    },
                },
                textPrimary: {
                    "&:hover": {
                        backgroundColor: "none !important",
                        textDecoration: "underline",
                    },
                },
                root: {
                    "&:hover": {
                        backgroundColor: "none !important",
                    },
                },
            },
            MuiTableRow:{
                root: {
                    cursor: 'pointer',
                }
            }
        },
    });
};
