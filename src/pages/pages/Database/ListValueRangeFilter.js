import React, { useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'; // To connect to Redux store
import ValueRangeFilter from './ValueRangeFilter';
import DateRangeFilter from './DateRangeFilter';
import ListFilter from './ListFilter';
import BooleanFilter from './BooleanFilter';
import { setSelectedSubFilter, setSubFilterType } from '../../../redux/store/dbFilterSlice';
import { titleCase } from "../../../utils/toTitleCase";



function ListValueRangeFilter({ 
  isValueRangeInvalid,
  getFilterType,
  filterOptions,
  handleValueRangeValueSelection,
  selectedValue,
  handleListValueSelection,
  handleBooleanSelection
}) {
  const [selectedSubValue, setSelectedSubValue] = useState({});
  const [subFilterOptions, setSubFilterOptions] = useState([]);
  const dispatch = useDispatch();

  // Get filtersObject from Redux store (for example 'MSFC' options)
  const {
    filters,
    selectedFilter,
    selectedCategory,
    subFilterType,
    disabledKeys,
  } = useSelector((state) => state.filters || {});


  // Handle the selection of the first filter (e.g., MSFC)
  const handleFilterSelection = (filterKey) => {
    // Construct the full path (e.g., 'subjects.MSFC.ambulation1')
    const fullFilterKey = `${selectedCategory}.${selectedFilter}.${filterKey}`;
  
    // Find the filter value using the full path
    const filterValue = filters[selectedCategory][selectedFilter][filterKey]; // Ensure the correct path is used
    setSelectedSubValue(filterKey);
    const selectedFilterType = getFilterType(filterValue);
    dispatch(setSubFilterType(selectedFilterType));

    // If the filter type is an array, set the subFilterOptions
    if (selectedFilterType === 'array') {
      const options = filterOptions
        .find((obj) => obj.key === filterKey).value
        .map(item => {return { key: item, value: item };
      });
      setSubFilterOptions(options)
    }

    dispatch(setSelectedSubFilter(fullFilterKey)); // Store full key in the selected filter
  };

  const handleDisablesValues = (option) => {
    // Adjust category based on whether selectedCategory is 'subjects' or not
    const adjustedCategory = selectedCategory === 'subjects' ? 'subject' : '';

    // Construct the full key
    const fullKey = adjustedCategory ? `${adjustedCategory}.${selectedFilter}.${option.key}` : `${selectedFilter}.${option.key}`;
    
    // Check if the full key is in disabledKeys
    return disabledKeys.includes(fullKey);
  };

  // Get the selectedSubValue full key and check if it exists in disabledKeys
  const adjustedCategory = selectedCategory === 'subjects' ? 'subject' : '';
  const selectedSubValueFullKey = adjustedCategory ? `${adjustedCategory}.${selectedFilter}.${selectedSubValue}` : `${selectedFilter}.${selectedSubValue}`;

  // Set value to '' if the selectedSubValue is disabled, otherwise keep it as is
  const selectValue = disabledKeys.includes(selectedSubValueFullKey) ? '' : selectedSubValue;

  return (
    <>
      {/* First Dropdown to select the parent filter (e.g., MSFC) */}
      <Grid item xs={12} sm={3}>
        <Typography variant='h6'>Select Value Name</Typography>
        <FormControl fullWidth>
          <InputLabel>Select Value</InputLabel>
          <Select
            value={selectValue}
            onChange={(e) => handleFilterSelection(e.target.value)} // Trigger on first selection
          >
            {filterOptions?.map((option) => (
              <MenuItem key={option.key} value={option.key} disabled={handleDisablesValues(option)}>
                {titleCase(option.key)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Render appropriate range or date picker based on the filterType */}
      {subFilterType === 'int' || subFilterType === 'float' ? (
        <ValueRangeFilter
          isValueRangeInvalid={isValueRangeInvalid}
          handleValueRangeValueSelection={handleValueRangeValueSelection}
          selectedValue={selectedValue}
        />
      ) : subFilterType === 'datetime' ? (
        <DateRangeFilter
          handleValueRangeValueSelection={handleValueRangeValueSelection}
          isValueRangeInvalid={isValueRangeInvalid}
          selectedValue={selectedValue}
        />
      ) : subFilterType === 'array' ?
        <ListFilter
          handleListValueSelection={handleListValueSelection}
          selectedValue={selectedValue}
          filterOptions={subFilterOptions}
          handleDisablesValues={handleDisablesValues}
        />
        : subFilterType === 'bool' &&
          <BooleanFilter
            handleBooleanSelection={handleBooleanSelection}
            selectedValue={selectedValue}
          />
      }
    </>
  );
}

export default ListValueRangeFilter;