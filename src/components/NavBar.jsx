import { Badge, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useNavigate } from "react-router-dom";
import StatusCard from "./StatusCard";

function NavBar({ botStatus }) {
  const navigate = useNavigate();
  return (
    <Box>
      <Stack
        spacing={4}
        direction={"row"}
        justifyContent="space-between"
        alignItems="baseline"
        sx={{
          p: 2,

          background: "#000000",
          width: "100%",
          position: "fixed",
          zIndex: 2000,
        }}
      >
        <Stack
          direction={"row"}
          //   justifyContent='space-between'
          alignItems="center"
        >
          {/* <AutoGraphIcon /> */}
          <Typography fontSize={30}>stokastiX</Typography>
        </Stack>

        <Stack
          direction={"row"}
          alignItems="center"
          spacing={4}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {" "}
          <Button
            sx={{ color: "gray" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Dashboard
          </Button>
          <Button
            sx={{ color: "gray" }}
            onClick={() => {
              navigate("/logs");
            }}
          >
            Logs
          </Button>
          <Button
            sx={{ color: "gray" }}
            onClick={() => {
              navigate("/analytics");
            }}
          >
            Analytics
          </Button>
        </Stack>
        <StatusCard botStatus={botStatus} />
      </Stack>

      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent={"center"}
        spacing={4}
        sx={{ display: { xs: "flex", md: "none" }, pt: 11 }}
      >
        {" "}
        <Button
          sx={{ color: "gray" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Dashboard
        </Button>
        <Button
          sx={{ color: "gray" }}
          onClick={() => {
            navigate("/logs");
          }}
        >
          Logs
        </Button>
        <Button
          sx={{ color: "gray" }}
          onClick={() => {
            navigate("/analytics");
          }}
        >
          Analytics
        </Button>
      </Stack>
    </Box>
  );
}

export default NavBar;
