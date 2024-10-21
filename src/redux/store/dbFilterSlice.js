// dbFilterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DBService } from '../../services/DBService';
import { titleCase } from '../../utils/toTitleCase';
import { formatDate, isISODate } from '../../utils/date';


// Async thunk for loading filter values from DBService
export const loadFilterValues = createAsyncThunk(
  'filters/loadFilterValues',
  async (_, { rejectWithValue }) => {
    try {
      const response = await DBService.getFilterValues();
      if (response?.http_code === 200) {
        return response.data;
      } else {
        return rejectWithValue('Failed to load filter values');
      }
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Helper to handle array filters
const handleArrayFilter = (existingFilter, value) => {
  let existingValues = [];
  if (existingFilter && existingFilter["$in"]) {
    existingValues = existingFilter["$in"];
  }

  if (!existingValues.includes(value.key)) {
    existingValues.push(value.key);
  }

  return { "$in": existingValues };
};

// Helper to handle range filters (int, float, datetime)
const handleRangeFilter = (value, parseFn = parseFloat, dateFormatFn = null) => {
  const formattedValue = {};
  
  if (value.min != undefined && value.min !== '') {
    formattedValue["$gte"] = dateFormatFn ? dateFormatFn(value.min, 'yyyy-MM-dd') : parseFn(value.min);
  }

  if (value.max != undefined && value.max !== '') {
    formattedValue["$lte"] = dateFormatFn ? dateFormatFn(value.max, 'yyyy-MM-dd') : parseFn(value.max);
  }

  return formattedValue;
};

// Helper function to reset filter-related state
const resetFilterState = (state) => {
  state.selectedFilter = null;
  state.selectedSubFilter = null;
  state.selectedCategory = null;
  state.filterType = '';
};

const dbFilterSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: { subjects: [], evaluations: [] },
    institutionMap: {},
    portalUserMap: {},
    evaluationTypeMap: {},
    isLoading: true,
    error: null,
    selectedFilter: null,
    selectedSubFilter: null,
    selectedCategory: null,
    appliedFilters: {},
    appliedValues: [],
    filtersToRender: [], // Added to manage filters to display in AppliedFilters component
    filterType: '',      // Added to keep track of the current filter type
    subFilterType: '',   // Added to keep track of the current sub-filter type
    searchDisable: true,
    disabledKeys: [],
  },
  reducers: {
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    setSelectedSubFilter: (state, action) => {
      state.selectedSubFilter = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setSubFilterType: (state, action) => {
      state.subFilterType = action.payload;
    },
    applyFilters: (state, action) => {
      const { filter, value, filterType, filterCategory } = action.payload;
    
      // Clean the filter key by removing any existing prefixes
      let cleanFilter = filter.replace(/^(subjects?|evaluations?)\./, '');
    
      let filterKey;
      if (filterCategory === 'subjects') {
        // Prepend 'subject.' prefix
        filterKey = `subject.${cleanFilter}`;
      } else if (filterCategory === 'evaluations') {
        // For evaluation filters, do not prepend any prefix
        filterKey = cleanFilter;
      } else {
        filterKey = filter;
      }
    
      let displayFilterKey;
    
      // If state.selectedSubFilter is defined, clean it similarly
      if (state.selectedSubFilter) {
        let cleanSubFilter = state.selectedSubFilter.replace(/^(subjects?|evaluations?)\./, '');
    
        if (filterCategory === 'subjects') {
          state.selectedSubFilter = `subject.${cleanSubFilter}`;
        } else if (filterCategory === 'evaluations') {
          state.selectedSubFilter = cleanSubFilter;
        } else {
          state.selectedSubFilter = state.selectedSubFilter; // Keep it as is if not subject or evaluation
        }
        
        displayFilterKey = titleCase(cleanSubFilter);
        filterKey = `${state.selectedSubFilter}`;
      } else {
        displayFilterKey = titleCase(cleanFilter);
      }
    
      const filterToRender = {
        filterTitleCase: displayFilterKey,
        filter_type: filterType,
        sub_filter_type: state.subFilterType,
        filter_values: value,
        filterCategory: filterCategory,
        filterKey: filterKey,
      };
    
      // Add the filter to filtersToRender
      state.filtersToRender.push(filterToRender);
    
      // Initialize the filters object if it doesn't exist
      if (!state.appliedFilters[`${filterCategory}_filters`]) {
        state.appliedFilters[`${filterCategory}_filters`] = {};
      }
    
      // Prepare the filter value based on filterType
      let formattedValue;
    
      if (filterType === 'array') {
        const existingFilter = state.appliedFilters[`${filterCategory}_filters`][filterKey];
        formattedValue = handleArrayFilter(existingFilter, value);
    
      } else if (filterType === 'int' || filterType === 'float') {
        formattedValue = handleRangeFilter(value, parseFloat);
        state.disabledKeys.push(cleanFilter);
        
      } else if (filterType === 'datetime') {
        formattedValue = handleRangeFilter(value, null, formatDate);
        state.disabledKeys.push(cleanFilter);
        resetFilterState(state);
      } else if (filterType === 'list_value_range') {
        if (state.subFilterType === 'array') {
          const existingFilter = state.appliedFilters[`${filterCategory}_filters`][filterKey];
          formattedValue = handleArrayFilter(existingFilter, value);
          state.disabledKeys.push(value.key);
        } else if (state.subFilterType === 'int' || state.subFilterType === 'float') {
          formattedValue = handleRangeFilter(value, parseFloat);
          state.disabledKeys.push(filterKey);
          resetFilterState(state);
        } else if (state.subFilterType === 'datetime') {
          formattedValue = handleRangeFilter(value, null, formatDate);
          state.disabledKeys.push(filterKey);
          resetFilterState(state);
        }
        else if (state.subFilterType === 'bool') {
          formattedValue = value === true || false;
          state.disabledKeys.push(filterKey);
          resetFilterState(state);
        }
      }
    
      // Update the appliedFilters with the new filter
      state.appliedFilters[`${filterCategory}_filters`][filterKey] = formattedValue;
      state.searchDisable = false;
    },
    clearAllFilters: (state) => {
        state.appliedFilters = {};
        state.filtersToRender = [];
        state.appliedValues = [];
        state.appliedKeys = [];
        state.disabledKeys = [];
    },
    removeAppliedFilter: (state, action) => {
      const filterToRemove = action.payload;
      const { filterCategory, filterKey, filter_values, filter_type, sub_filter_type } = filterToRemove;
      // Remove it from disabledKeys
      let cleanFilter = filterKey.replace(/^(subjects?|evaluations?)\./, '');
      state.disabledKeys = filter_type === 'list_value_range' ? 
        sub_filter_type === 'array' ?
          state.disabledKeys.filter((key) => key !==filter_values.key)
          : state.disabledKeys.filter((key) => key !==filterKey)
        :
        state.disabledKeys.filter((key) => key !== cleanFilter);

      // Remove from filtersToRender
      state.filtersToRender = state.filtersToRender.filter(
        (filter) =>
          !(
            filter.filterKey === filterKey &&
            filter.filterCategory === filterCategory &&
            JSON.stringify(filter.filter_values) === JSON.stringify(filter_values)
          )
      );
    
      const categoryKey = `${filterCategory}_filters`;
    
      // Remove from appliedFilters
      if (state.appliedFilters[categoryKey]) {
        if (filter_type === 'array') {
          // Remove the specific value from the $in array
          const existingFilter = state.appliedFilters[categoryKey][filterKey];
          if (existingFilter && existingFilter["$in"]) {
            existingFilter["$in"] = existingFilter["$in"].filter(
            (val) => val !== filter_values.value
          );
          if (existingFilter["$in"].length === 0) {
            // If no values left, remove the filter key
            delete state.appliedFilters[categoryKey][filterKey];
          } else {
            // Update the filter with remaining values
            state.appliedFilters[categoryKey][filterKey] = existingFilter;
          }
        }
        } else {
          // For other filter types, remove the filter key
          delete state.appliedFilters[categoryKey][filterKey];
        }
    
        // If the category filters are empty, delete the category
        if (Object.keys(state.appliedFilters[categoryKey]).length === 0) {
          delete state.appliedFilters[categoryKey];
        }
      }
    },
    setSearchDisable: (state, action) => {
      state.searchDisable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFilterValues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFilterValues.fulfilled, (state, action) => {
        const { institutions, portal_users, evaluation_types, ...filters } = action.payload;

        // Remove 'last_file_id' from subjects and evaluations filters
        const cleanedSubjects = { ...filters.subjects };
        const cleanedEvaluations = { ...filters.evaluations };

        delete cleanedSubjects['last_file_id'];
        delete cleanedEvaluations['last_file_id'];

        state.filters = {
          subjects: cleanedSubjects,
          evaluations: cleanedEvaluations,
        };

        state.institutionMap = institutions || {};
        state.portalUserMap = portal_users || {};
        state.evaluationTypeMap = evaluation_types || {};
        state.isLoading = false;
      })
      .addCase(loadFilterValues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions to be used in components
export const {
  setSelectedFilter,
  setSelectedSubFilter,
  setSelectedCategory,
  setFilterType,
  setSubFilterType,
  applyFilters,
  removeAppliedFilter,
  clearAllFilters,
  setSearchDisable
} = dbFilterSlice.actions;

export default dbFilterSlice.reducer;