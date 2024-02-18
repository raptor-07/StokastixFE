import { Card, Stack, Typography, Box } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
function StatusCard({ botStatus }) {
  return (
    <Box>
      <Stack direction={"row"} alignItems="center" spacing={1}>
        <Typography sx={{ color: "gray" }}>
          {botStatus ? "Bot Running" : "Bot Stopped"}
        </Typography>
        <CircleIcon
          sx={{ color: botStatus ? "green" : "red", fontSize: "16px" }}
        />
      </Stack>
    </Box>
  );
}

export default StatusCard;
