import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SliderSelect({ _title, _value, _updater, _botStatus }) {
  const handleChange = (event) => {
    _updater(event.target.value);
  };

  return (
    <Box width={"100%"}>
      <Typography>
        {_title} : {_value}
      </Typography>
      <Slider
        key={_title + "slider"}
        step={_title === "Fixed Target ROI %" ? 10 : 1}
        marks={_title === "Fixed Target ROI %" ? true : false}
        min={_title === "Fixed Target ROI %" ? 30 : 1}
        max={
          _title === "Fixed Target ROI %"
            ? 500
            : _title === "Max Leverage"
              ? 125
              : _title === "EMA Length"
                ? 55
                : 100
        }
        disabled={_botStatus ? true : false}
        onChange={handleChange}
        // defaultValue={_value}
        value={_value}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
