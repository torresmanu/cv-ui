import API from './api'
import snackbarMessages from "./snackbarMessages"
import GLOBALS from "./GLOBALS";
import { handleError } from "./handleError";

export const DBService = {

    //Get filter values. Will return all possible filter with all posible values for each.
    getFilterValues: function () {
        return API.post(GLOBALS.ENDPOINTS.DB.GET_FILTER_VALUES + '/0').then((response) => {
            return response.data || []
        })
        .catch((error) => {
            handleError(error || '', snackbarMessages?.error?.researchDB?.get_filter_values || '');
            return error?.response
        })
    },

   //Search dataset by applied filters. Will return all data about the subjects and evaluations that match the filters 
   search: function (appliedFilters) {
      return API.post(GLOBALS.ENDPOINTS.DB.SEARCH+ '/0', appliedFilters).then((response) => {
          return response.data.data || []
      })
          .catch((error) => {
            console.log("Error in DBService.search when applying filters: ")
            console.log(appliedFilters || "No filters applied")
            handleError(error || '', snackbarMessages?.error?.researchDB?.search || '') ;
          })
   },

};

