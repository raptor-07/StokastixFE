import { IconButton, Paper, Typography, Stack, Grid } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { getLogs } from "../functions/api";
import LogSelector from "./LogSelector";
import UpdateIcon from "@mui/icons-material/Update";
import { dummyLog } from "./dummyLogs";
function Logger() {
  const [logData, setLogData] = useState([]);
  const [logDataFull, setLogDataFull] = useState([]);
  const [logView, setLogView] = useState({
    showTicker: false,
    showSl: false,
    showIndTrig: false,
    showIndTick: false,
    showStats: false,
    showParams: false,
  });

  useEffect(() => {
    fetchLogs();
    const intervalId = setInterval(
      () => {
        fetchLogs();
      },
      3 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //     if(!botStatus){
  //         clearInterval(intervalId)
  //     }
  // }, [botStatus])

  useEffect(() => {
    let tempArray = logDataFull;
    tempArray = tempArray.filter((log) => {
      // console.log(log.logType)
      let result = false;
      if (log.logType === "ticker" && logView.showTicker) {
        result = true;
      } else if (log.logType === "stoploss" && logView.showSl) {
        result = true;
      } else if (log.logType === "ind_trig" && logView.showIndTrig) {
        result = true;
      } else if (log.logType === "ind_tick" && logView.showIndTick) {
        result = true;
      } else if (log.logType === "stats" && logView.showStats) {
        result = true;
      } else if (log.logType === "start" && logView.showParams) {
        result = true;
      } else if (log.logType === "system" || log.logType === "trigger") {
        result = true;
      }

      return result;
    });

    //    let config
    //    logDataFull.forEach((log)=>{
    //     if(log.logType==='start'){
    //         config =log
    //     }
    //      })
    //    if(logDataFull.length)
    //    console.log(JSON.parse(config.log))

    setLogData(tempArray);
  }, [logView, logDataFull]);

  const fetchLogs = async () => {
    let result = await getLogs();
    // console.log(result);
    if (Array.isArray(result)) {
      setLogDataFull(result);
    }
    // setLogDataFull(dummyLog.message);
  };

  const startParam = (_log) => {
    let log = JSON.parse(_log);

    return (
      <>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Bot Mode : {log.botMode}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Asset : {log.asset}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Run Mode : {log.autoSwitch ? "Auto" : "Manual"}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Trend Timeframe : {log.trendTf}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Bot Side : {log.botSide}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Indicator : {log.indicator}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          SL Timeframe : {log.slTf}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Entry Wave Timeframe : {log.entryTf}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Exit Wave Timeframe : {log.exitTf}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Exit Mode : {log.exitMode}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Risk% : {log.alloc}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Num of Trades : {log.numOfTrades === 0 ? "No Limit" : log.numOfTrades}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          EMA Length : {log.emaLength}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Target Price% : {log.targetPrice}
        </Typography>
        <Typography sx={{ color: "rgba(88, 241, 50, 0.7)" }}>
          Max Leverage : {log.maxLeverage}
        </Typography>
      </>
    );
  };
  return (
    <Grid
      container
      py={{ xs: 12, md: 12 }}
      px={{ xs: 2, md: 10 }}
      maxWidth={"xl"}
      mx={"auto"}
      justifyContent="space-between"
      // spacing={2}
    >
      <Paper
        sx={{
          p: 2,
          width: "100%",
          height: "100%",
          overflow: "auto",
          background: "none",
          border: "1px solid #2a2e39",
        }}
        elevation={0}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Typography fontSize={20} align="center">
            Logs
          </Typography>
          <IconButton onClick={fetchLogs}>
            <UpdateIcon />
          </IconButton>
        </Stack>

        <LogSelector logView={logView} setLogView={setLogView} />
        {logData.length ? (
          logData.map((log) => {
            return (
              <Stack
                key={log.logId}
                direction="row"
                sx={{ border: "1px solid gray" }}
                justifyContent="flex-start"
              >
                {log.logType !== "start" ? (
                  <Typography
                    sx={{
                      minWidth: { xs: "100px", md: "150px" },
                      maxWidth: { xs: "100px", md: "150px" },
                      color: "gray",
                    }}
                  >
                    {dateFormatter(log.log.timestamp)}
                  </Typography>
                ) : null}

                <Typography
                  sx={{
                    // minWidth: "70%",
                    wordBreak: "break-all",
                    borderLeft: "1px solid gray",
                    color:
                      log.logType === "system"
                        ? "#6a6b65"
                        : log.logType === "trigger"
                          ? "#07870b"
                          : log.logType === "ind_trig"
                            ? "#635538"
                            : log.logType === "ind_tick"
                              ? "#3d3661"
                              : log.logType === "stoploss"
                                ? "#69396b"
                                : log.logType === "ticker"
                                  ? "#6a6b65"
                                  : log.logType === "stats"
                                    ? "#55d647"
                                    : "white",
                  }}
                >
                  {log.logType === "start"
                    ? startParam(log.log.data)
                    : logDataFormatter(log)}
                </Typography>
              </Stack>
            );
          })
        ) : (
          <Typography sx={{ color: "gray" }}>No Logs</Typography>
        )}
      </Paper>
    </Grid>
  );
}

export default Logger;

const logDataFormatter = (log) => {
  if (log.logType === "system") {
    return ` ${log.log.data ? log.log.data.message : ""}`;
  } else if (log.logType === "trigger") {
    let message = "";
    switch (log.log.data.type) {
      case "stop_loss":
        message = `${log.log.data.message} @ ${log.log.data.price}`;
        break;
      case "entry":
        message = `Entry - ${log.log.data.side} @ ${
          log.log.data.entry_price
        }, QTY:  ${log.log.data.position_qty}, Leverage : ${
          log.log.data.leverage
        } , Time of Entry : ${dateFormatter(log.log.data.time_of_entry)} `;
        break;
      case "prep":
        message = `${log.log.data.message}`;
        break;
      case "fail":
        message = `${log.log.data.message}`;
        break;
      case "exit":
        message = `Exited ${log.log.data.side} ${log.log.data.reason} @ ${log.log.data.exit_price}, QTY:  ${log.log.data.position_qty}`;
        console.log(log.log.data);
        break;
      default:
        break;
    }
    return ` ${message}`;
  } else if (log.logType === "ind_trig" || log.logType === "ind_tick") {
    let message = "";
    log.log.data.forEach((obj) => {
      message = message.concat(` ${obj.indicator_name} : ${obj.value} `);
    });
    return ` ${message}`;
  } else if (log.logType === "stoploss") {
    let message = "";

    if (log.log.data.type) {
      message = `${log.log.data.type} @${log.log.data.sl_price}`;
    } else {
      message = `SL Placed @${log.log.data.sl_price}`;
    }
    return ` ${message}`;
  } else if (log.logType === "ticker") {
    return ` Current Price $${log.log.data.current_price}`;
  } else if (log.logType === "stats") {
    return ` Current Balance   : $${log.log.data.current_balance}, Current Profit : $${log.log.data.current_profit}, PNL : ${log.log.data.pnl}, Total Sales : ${log.log.data.total_sales} Nos`;
  }
};

const dateFormatter = (timestamp) => {
  let a = new Date(timestamp);
  return a.toString().slice(0, 33);
};
