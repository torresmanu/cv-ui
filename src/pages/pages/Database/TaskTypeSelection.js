// TaskTypeSelection.js

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { titleCase } from '../../../utils/toTitleCase';

function TaskTypeSelection({ taskTypes, selectedTaskType, onChange, label }) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedTaskType}
        onChange={(event) => onChange(event.target.value)}
        label={label}
      >
        {taskTypes.map((taskType) => (
          <MenuItem key={taskType} value={taskType}>
            {titleCase(taskType)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default TaskTypeSelection;