import React from "react";
import { Grid, Typography, FormControl, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { titleCase } from "../../../utils/toTitleCase";
import { useSelector } from "react-redux"; // Import useSelector

function ListFilter({ handleListValueSelection, selectedValue, filterOptions }) {
  const disabledKeys = useSelector((state) => state.filters.disabledKeys);

  return (
    <Grid item xs={12} sm={3}>
      <Typography variant="h6">Value</Typography>
      <FormControl fullWidth>
        <Autocomplete
          value={selectedValue || null}
          onChange={(event, newValue) => handleListValueSelection(newValue)}
          options={filterOptions || []}
          getOptionLabel={(option) => titleCase(option.value) || ''}
          getOptionDisabled={(option) => disabledKeys?.includes(option.key)} // Disable the option if it's in disabledKeys
          renderInput={(params) => <TextField {...params} label="Select Value" />}
        />
      </FormControl>
    </Grid>
  );
}

export default ListFilter;