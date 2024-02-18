import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { Grid, Stack } from "@mui/material";

export default function LogSelector({ logView, setLogView }) {
  const handleChange = (event) => {
    setLogView({
      ...logView,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    showTicker,
    showSl,
    showIndTrig,
    showIndTick,
    showStats,
    showParams,
  } = logView;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl component="fieldset" variant="standard">
        {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
        <FormGroup>
          <Grid container justifyContent={"space-between"} gap={2}>
            {/* <Stack direction ='row' justifyContent={'space-between'}> */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={showParams}
                  onChange={handleChange}
                  name="showParams"
                />
              }
              label="Bot Params"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showTicker}
                  onChange={handleChange}
                  name="showTicker"
                />
              }
              label="Ticker"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showSl}
                  onChange={handleChange}
                  name="showSl"
                />
              }
              label="Stop Loss"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showIndTrig}
                  onChange={handleChange}
                  name="showIndTrig"
                />
              }
              label="Trig Indicators"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showIndTick}
                  onChange={handleChange}
                  name="showIndTick"
                />
              }
              label="Tick Indicators"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showStats}
                  onChange={handleChange}
                  name="showStats"
                />
              }
              label="Stats"
            />
            {/* </Stack> */}
          </Grid>
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
    </Box>
  );
}
