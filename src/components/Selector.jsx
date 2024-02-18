import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function Selector({ _title, _value, _updater, _options, _botStatus }) {
  const handleChange = (event) => {
    _updater(event.target.value);
  };

  return (
    <FormControl
      fullWidth
      variant="standard"
      disabled={_botStatus ? true : false}
    >
      <InputLabel id="demo-simple-select-label">{_title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={_value}
        label="Age"
        onChange={handleChange}
      >
        {_options.map((_option) => {
          return (
            <MenuItem key={_option.key} value={_option.value}>
              {_option.name}
            </MenuItem>
          );
        })}

        {/* <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  );
}

export default Selector;
