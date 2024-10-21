import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Typography,
  Box,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { 
  loadFilterValues,
  setSelectedFilter,
  applyFilters,
  setSelectedCategory,
  setSelectedSubFilter,
  clearAllFilters
 } from '../../../redux/store/dbFilterSlice';
import ListFilter from './ListFilter';
import DateRangeFilter from './DateRangeFilter';
import ValueRangeFilter from './ValueRangeFilter';
import ListValueRangeFilter from './ListValueRangeFilter';
import { titleCase } from '../../../utils/toTitleCase';
import Autocomplete from '@material-ui/lab/Autocomplete';


const FilterSelection = () => {
  const dispatch = useDispatch();

  const {
    filters: { subjects = {}, evaluations = {} } = {},
    institutionMap = {},
    portalUserMap = {},
    evaluationTypeMap = {},
    isLoading,
    selectedFilter,
    selectedCategory,
    subFilterType,
    disabledKeys
  } = useSelector((state) => state.filters || {});

  const [filterType, setFilterType] = useState('');
  const [selectedValue, setSelectedValue] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    dispatch(setSelectedFilter(null));
    dispatch(clearAllFilters());
    dispatch(loadFilterValues());
  }, [dispatch]);

  const getFilterType = (filterValue) => {
    if (Array.isArray(filterValue)) {
      return 'array';
    } else if (typeof filterValue === 'string') {
      if (filterValue === 'datetime') {
        return 'datetime';
      } else if (filterValue === 'int' || filterValue === 'float') {
        return filterValue; // 'int' or 'float'
      }
    } else if (typeof filterValue === 'object') {
      return 'list_value_range';
    }
    return filterValue;
  };

  const handleFilterSelection = (filterKey, category) => { 
    dispatch(setSelectedFilter(filterKey));
    dispatch(setSelectedCategory(category));
    dispatch(setSelectedSubFilter(''));
    const filterValue = category === "subjects" ? subjects[filterKey] : evaluations[filterKey];
    const selectedFilterType = getFilterType(filterValue);
    setFilterType(selectedFilterType);
    setSelectedValue({});
    dispatch(setSelectedSubFilter(''))
    if (selectedFilterType === 'array' || selectedFilterType === 'list_value_range') {
      handleListFilterOptions(filterKey, category);
    }
  };

  const handleBooleanSelection = (value) => {
    setSelectedValue(value);
  };

  // Fetch the filter options asynchronously for list_value_range filters
  const handleListFilterOptionsAsync = (filterKey) => {
    const category = selectedCategory === "subjects" ? "subjects" : "evaluations";
    handleListFilterOptions(filterKey, category);
  };

  // Fetch the filter options for array and list_value_range filters
  const handleListFilterOptions = (filterKey, category) => {
    let optionsArray = [];
    const filterValue = category === "subjects" ? subjects[filterKey] : evaluations[filterKey];

    if (filterKey === 'vm_institution_id') {
      optionsArray = filterValue.map((id) => ({
        key: parseInt(id),
        value: institutionMap[id] || id,
      }));
    } else if (filterKey === 'vm_portal_user_id') {
      optionsArray = filterValue.map((id) => ({
        key: parseInt(id),
        value: portalUserMap[id] || id,
      }));
    } else if (filterKey === 'evaluation_type_id') {
      optionsArray = filterValue.map((id) => ({
        key: parseInt(id),
        value: evaluationTypeMap[id] || id,
      }));
    } else if (filterKey === 'vm_instance_id') {
      optionsArray = filterValue.map((id) => ({
        key: parseInt(id),
        value: parseInt(id),
      }));
    }else if (Array.isArray(filterValue)) {
      optionsArray = filterValue
        .map((value) => ({
          key: value,
          value,
        }));
    } else if (typeof filterValue === 'object') {
      optionsArray = Object.keys(filterValue)
      .filter((value) => value !== 'indicators') // Skip 'indicators'
        .map((key) => ({
          key,
          value: filterValue[key],
        }));
    }

    setFilterOptions(optionsArray);
  };

  const handleListValueSelection = (value) => { 
    setSelectedValue(value);
  };

  const handleValueRangeValueSelection = (value, limit_type) => {
    setSelectedValue((prevValue) => ({
      ...prevValue,
      [limit_type]: value,
    }));
  };

  const handleDisablesValues = (option) => {
    return false;
  };

  const isValueRangeInvalid = (selectedValue) => {
    const min = selectedValue?.min;
    const max = selectedValue?.max;
  
    // If both min and max are undefined, return false
    if (min == null && max == null) return false;
  
    // Check if both min and max are of the same type (either both numbers or both dates)
    if (min != null && max != null) {
      const areDates = min instanceof Date && max instanceof Date;
      const areNumbers = !isNaN(min) && !isNaN(max);
  
      // Check if they are dates
      if (areDates) {
        const invalidMinDate = isNaN(min.getTime()); // Invalid date if getTime() is NaN
        const invalidMaxDate = isNaN(max.getTime()); // Invalid date if getTime() is NaN
        const invalidRange = min.getTime() > max.getTime(); // Invalid if min is greater than max
  
        return invalidMinDate || invalidMaxDate || invalidRange;
      }
  
      // If they are numbers, use parseFloat to compare
      if (areNumbers) {
        const invalidRange = parseFloat(min) > parseFloat(max);
        const invalidMin = min !== '' && isNaN(parseFloat(min));
        const invalidMax = max !== '' && isNaN(parseFloat(max));
        return invalidRange || invalidMin || invalidMax;
      }
  
      // If min and max are mixed types (e.g., one is a date and the other is a number), it's invalid
      return true;
    }
  
    // Check if a single value (min or max) is a date or a number and valid
    if (min != null) {
      const isMinDate = min instanceof Date;
      const invalidMinDate = isMinDate && isNaN(min.getTime());
      const invalidMin = !isMinDate && isNaN(parseFloat(min));
      if (invalidMin || invalidMinDate) return true;
    }
  
    if (max != null) {
      const isMaxDate = max instanceof Date;
      const invalidMaxDate = isMaxDate && isNaN(max.getTime());
      const invalidMax = !isMaxDate && isNaN(parseFloat(max));
      if (invalidMax || invalidMaxDate) return true;
    }
  
    // If only one value (min or max) is valid, the range is considered valid
    return false;
  };

  const isApplyDisabled = (category) => {
    let invalidValue = false;
    let invalidCategory = false;
    category === selectedCategory ? invalidCategory = false : invalidCategory = true;
    if (filterType === 'array') {
      invalidValue = !selectedValue || Object.keys(selectedValue).length === 0;
    } else if (filterType === 'int' || filterType === 'float' || filterType === 'datetime') {
      invalidValue = isValueRangeInvalid(selectedValue);
    } else if (filterType === 'list_value_range') {
      if (subFilterType === 'array') {
        invalidValue = !selectedValue || Object.keys(selectedValue).length === 0;
      } else if (subFilterType === 'bool'){
          invalidValue = false;
      } else {
        invalidValue = isValueRangeInvalid(selectedValue);
      }
    } else {
      invalidValue = !selectedValue || Object.keys(selectedValue).length === 0;
    }
    return invalidValue || !selectedFilter || invalidCategory;
  };

  const handleApply = () => {
    const fullFilterKey = `${selectedCategory}.${selectedFilter}`;
    const filterKey = selectedFilter; // Without the category prefix
  
    dispatch(
      applyFilters({ 
        filter: fullFilterKey,
        value: selectedValue,
        filterType: filterType,
        filterCategory: selectedCategory,
        filterKey: filterKey,
      })
    );
    setSelectedValue({});
  };

  const renderFilterControls = (filtersObject, type) => {
    const filterKeys = Object.keys(filtersObject || {});

    const category = type.toLowerCase() === 'subject' ? 'subjects' : 'evaluations';

    return (
      <Grid container spacing={2} >
       <Grid item xs={12} sm={3}>
        <Typography variant="h6">{type} Filters</Typography>
        <FormControl fullWidth>
          <Autocomplete
            value={category === selectedCategory && selectedFilter ? selectedFilter : ''}
            onChange={(event, newValue) => handleFilterSelection(newValue, category)}
            options={filterKeys.filter((value) => value !== '_id')} // Filter out unwanted keys
            getOptionLabel={(option) => titleCase(option)} // Convert the options to a human-readable form
            getOptionDisabled={(option) => disabledKeys.includes(option)} // Disable the option if it's in disabledKeys
            renderInput={(params) => <TextField {...params} label="Select Filter" />}
          />
        </FormControl>
      </Grid>
        
        {/* Conditional rendering based on filterType */}
        {category === selectedCategory && (
          filterType === 'array' ? (
          <ListFilter
            handleListValueSelection={handleListValueSelection}
            selectedValue={selectedValue}
            filterOptions={filterOptions}
            disabledKeys={disabledKeys}
          />
        ) : filterType === 'list_value_range' ? (
          <ListValueRangeFilter
            isValueRangeInvalid={isValueRangeInvalid}
            handleValueRangeValueSelection={handleValueRangeValueSelection}
            filterOptions={filterOptions}
            getFilterType={getFilterType}
            handleListFilterOptions={handleListFilterOptionsAsync}
            selectedValue={selectedValue}
            handleListValueSelection={handleListValueSelection}
            handleBooleanSelection={handleBooleanSelection}
          />
        ) : filterType === 'int' || filterType === 'float' ? (
          <ValueRangeFilter
            isValueRangeInvalid={isValueRangeInvalid}
            handleValueRangeValueSelection={handleValueRangeValueSelection}
            selectedValue={selectedValue}
          />
        ) : filterType === 'datetime' && (
          <DateRangeFilter
            handleValueRangeValueSelection={handleValueRangeValueSelection}
            isValueRangeInvalid={isValueRangeInvalid}
            selectedValue={selectedValue}
          />
        ))}

        <Grid item xs={12} sm={2} style={{ position: 'relative', height: '80px' }}> {/* Example height */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            position="absolute" // Absolute inside the relative parent
            bottom={10} // Adjust to stick to the bottom
            width="100%" // Make sure the button takes full width
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleApply}
              disabled={isApplyDisabled(category)}
            >
              Apply
            </Button>
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {isLoading ? (
              <Skeleton animation="wave" height="75px" />
            ) : (
              renderFilterControls(subjects, 'Subject')
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {isLoading ? (
              <Skeleton animation="wave" height="75px" />
            ) : (
              renderFilterControls(evaluations, 'Evaluation')
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FilterSelection;