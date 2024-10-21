// IndicatorsSelection.js

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { titleCase } from '../../../utils/toTitleCase';

function IndicatorsSelection({
  indicators,
  selectedIndicator,
  onChange,
  label,
}) {
  return (
    <FormControl fullWidth >
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedIndicator}
        onChange={(event) => onChange(event.target.value)}
        label={label}
      >
        {indicators.map((indicator) => (
          <MenuItem key={indicator} value={indicator}>
            {titleCase(indicator)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default IndicatorsSelection;