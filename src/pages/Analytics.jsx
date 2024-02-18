import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
} from "@mui/material";
import React, { useState } from "react";

function Analytics({ botMode }) {
  const [loading, setLoading] = useState(true);
  let airtable_url;

  if (botMode === "live") {
    airtable_url = process.env.REACT_APP_AIR_TABLE_URL;
  } else {
    airtable_url = process.env.REACT_APP_AIR_TABLE_URL_BT;
  }
  return (
    <Grid
      container
      //   py={{ xs: 12, md: 12 }}
      px={{ xs: 2, md: 2 }}
      maxWidth={"xl"}
      width={"100%"}
      mx={"auto"}
      justifyContent="space-between"
      // spacing={2}
    >
      {loading && (
        <Box
          sx={{
            height: "auto",
            width: "100%",

            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 122000,
          }}
        >
          <LinearProgress />
        </Box>
      )}
      <iframe
        className="airtable-embed"
        src={airtable_url}
        onLoad={() => {
          setLoading(false);
        }}
        frameBorder={0}
        //   onmousewheel=''
        width={"100%"}
        height={"533"}
        style={{ background: "transparent", border: "1px solid #ccc" }}
      ></iframe>
    </Grid>
  );
}

export default Analytics;
