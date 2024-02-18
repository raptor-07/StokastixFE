import {
  Button,
  Grid,
  Stack,
  Typography,
  TextField,
  Badge,
  Box,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Backdrop,
  CircularProgress,
  Skeleton,
  LinearProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Logger from "../components/Logger";
import Selector from "../components/Selector";
import Slider from "../components/Slider";
import timestamp from "unix-timestamp";
import {
  getBotStatus,
  getLogs,
  getProgress,
  startBot,
  stopBot,
} from "../functions/api";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import TradeCard from "../components/TradeCard";
import TradingViewWidget from "../components/TradingView";
import TradingViewWidget2 from "../components/TradingView copy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavBar from "../components/NavBar";
import StatusCard from "../components/StatusCard";
import { useNavigate } from "react-router-dom";

const chartViews = [
  {
    interval: "240",
    studies: ["STD;MACD", "STD;DEMA", "STD;Keltner_Channels"],
  },
  { interval: "D", studies: ["STD;MACD", "STD;DEMA"] },
  { interval: "15", studies: ["STD;Stochastic"] },
  { interval: "30", studies: ["STD;Stochastic"] },
  { interval: "60", studies: ["STD;Stochastic", "STD;Keltner_Channels"] },
];

const strategies = [];

function Dashboard({ setBotStatus, botStatus }) {
  console.log("test 4")
  const navigate = useNavigate();
  var maxDate = new Date("2022-12-30");
  var minDate = new Date("2022-01-25");

  const [strategy, setStrategy] = useState(1);
  const [asset, setAsset] = useState("BTCUSDT");
  const [botMode, setBotMode] = useState("live");
  const [chartView, setChartView] = useState(1);
  const [botSide, setBotSide] = useState("short");
  const [indicator, setIndicator] = useState("ema");
  // const [macdExit, setMacdExit] = useState(true)

  const [exitMode, setExitMode] = useState("waveRev");
  // const [botStrategy, setBotStrategy] = useState("main");
  const [maxLeverage, setMaxLeverage] = useState(100);
  const [targetPrice, setTargetPrice] = useState(100);
  const [alloc, setAlloc] = useState(10);

  const [autoSwitch, setAutoSwitch] = useState(false);

  const [emaLength, setEmaLength] = useState(25);
  const [slTf, setSlTf] = useState("1h");
  const [entryTf, setEntryTf] = useState("15m");
  const [exitTf, setExitTf] = useState("15m");
  const [trendTf, setTrendTf] = useState("4h");
  const [numOfTrades, setNumOfTrades] = useState(0);

  const [startTimevalue, setStartTimeValue] = useState(
    dayjs("2022-12-01 19:18"),
  );
  const [endTimevalue, setEndTimeValue] = useState(dayjs("2022-12-03 19:18"));
  const [expanded, setExpanded] = useState(false);

  const handleAccordChange = () => {
    setExpanded(!expanded);
  };

  const setPresetStrategy = (strategy) => {
    console.log(strategy);
    if (strategy === 1) {
      setBotSide("long");
      setEmaLength(25);
      setAutoSwitch(true);
      setTrendTf("1d");
      setIndicator("macd");
      setEntryTf("30m");
      setSlTf("4h");
      setExitMode("fixed");
      setTargetPrice(100);
      setMaxLeverage(100);
      setNumOfTrades(1);
      setExpanded(false);
    } else if (strategy === 2) {
      setBotSide("short");
      setEmaLength(25);
      setAutoSwitch(true);
      setTrendTf("1d");
      setIndicator("macd");
      setEntryTf("30m");
      setSlTf("4h");
      setExitMode("fixed");
      setTargetPrice(100);
      setMaxLeverage(100);
      setNumOfTrades(1);
      setExpanded(false);
    }
    if (strategy === 3) {
      setBotSide("long");
      setEmaLength(25);
      setAutoSwitch(true);
      setTrendTf("4h");
      setIndicator("macd");
      setEntryTf("3m");
      setSlTf("1h");
      setExitMode("fixed");
      setTargetPrice(100);
      setMaxLeverage(100);
      setNumOfTrades(1);
      setExpanded(false);
    } else if (strategy === 4) {
      setBotSide("short");
      setEmaLength(25);
      setAutoSwitch(true);
      setTrendTf("30m");
      setIndicator("macd");
      setEntryTf("3m");
      setSlTf("1h");
      setExitMode("fixed");
      setTargetPrice(100);
      setMaxLeverage(100);
      setNumOfTrades(1);
      setExpanded(false);
    } else if (strategy === 3) {
      // setExpanded(true);
    }
  };

  const setBotParams = (_config) => {
    console.log("Initial Bot Params");
    console.log(_config);
    setAsset(_config.asset);
    setBotMode(_config.botMode);
    setBotSide(_config.botSide);
    setIndicator(_config.indicator);
    setExitMode(_config.exitMode);
    setMaxLeverage(_config.maxLeverage);
    setTargetPrice(_config.targetPrice);
    setAlloc(_config.alloc);
    setAutoSwitch(_config.autoSwitch);

    setEmaLength(_config.emaLength);
    setSlTf(_config.slTf);
    setEntryTf(_config.entryTf);
    setExitTf(_config.exitTf);
    setTrendTf(_config.trendTf);
    setNumOfTrades(_config.numOfTrades);
    // setStartTimeValue(dayjs(_config.startTime));
    // setEndTimeValue(dayjs(_config.endTime));

    if (
      _config.trendTf === "1d" &&
      _config.indicator === "macd" &&
      _config.entryTf === "30m" &&
      _config.slTf === "4h" &&
      _config.exitMode === "fixed" &&
      _config.targetPrice === 100 &&
      _config.autoSwitch === true &&
      _config.numOfTrades === 1 &&
      _config.maxLeverage === 100 &&
      _config.emaLength === 25 &&
      _config.botSide === "long"
    ) {
      setStrategy(1);
    } else if (
      _config.trendTf === "1d" &&
      _config.indicator === "macd" &&
      _config.entryTf === "30m" &&
      _config.slTf === "4h" &&
      _config.exitMode === "fixed" &&
      _config.targetPrice === 100 &&
      _config.autoSwitch === true &&
      _config.numOfTrades === 1 &&
      _config.maxLeverage === 100 &&
      _config.emaLength === 25 &&
      _config.botSide === "short"
    ) {
      setStrategy(2);
    } else if (
      _config.trendTf === "4h" &&
      _config.indicator === "macd" &&
      _config.entryTf === "3m" &&
      _config.slTf === "1h" &&
      _config.exitMode === "fixed" &&
      _config.targetPrice === 100 &&
      _config.autoSwitch === true &&
      _config.numOfTrades === 1 &&
      _config.maxLeverage === 100 &&
      _config.emaLength === 25 &&
      _config.botSide === "long"
    ) {
      setStrategy(3);
    } else if (
      _config.trendTf === "4h" &&
      _config.indicator === "macd" &&
      _config.entryTf === "3m" &&
      _config.slTf === "1h" &&
      _config.exitMode === "fixed" &&
      _config.targetPrice === 100 &&
      _config.autoSwitch === true &&
      _config.numOfTrades === 1 &&
      _config.maxLeverage === 100 &&
      _config.emaLength === 25 &&
      _config.botSide === "short"
    ) {
      setStrategy(4);
    } else {
      setStrategy(5);
    }
  };

  const handleStartTimeChange = (newValue) => {
    setStartTimeValue(newValue);
    // console.log(Math.trunc(timestamp.fromDate(newValue.$d)*1000))
  };

  const handleEndTimeChange = (newValue) => {
    setEndTimeValue(newValue);
    // console.log(Math.trunc(timestamp.fromDate(newValue.$d)*1000))
  };

  useEffect(() => {
    checkIsBotRunning();
  }, []);
  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    setPresetStrategy(strategy);
  }, [strategy]);

  const fetchLogs = async () => {
    let result = await getLogs();
    // console.log(result);
    let paramsArray = [];
    if (Array.isArray(result)) {
      result.forEach((log) => {
        if (log.logType === "start") {
          paramsArray.push(JSON.parse(log.log.data));
          // setBotParams(JSON.parse(log.log.data));
        }
      });

      if (paramsArray.length) {
        setBotParams(paramsArray[paramsArray.length - 1]);
      }
    }
    // setLogDataFull(dummyLog.message);
  };

  //   const handleInputChange = (e) => {
  //     setInput((prevState) => ({
  //       ...prevState,
  //       [e.target.name]: e.target.value,
  //     }));
  //   };

  const checkIsBotRunning = async () => {
    let isBotRunning = await getBotStatus();
    if (isBotRunning.isbotRunning) {
      setExpanded(false);
    }
    setBotStatus(isBotRunning.isbotRunning);

    console.log(isBotRunning);
  };

  let intervalIdLogs = 0;

  const handleStart = async () => {
    if (botMode === "back_test") {
      setBotStatus(true);
    }
    let result = await startBot(
      botMode,
      asset,
      autoSwitch,
      trendTf,
      botSide,
      indicator,
      slTf,
      entryTf,
      exitTf,
      exitMode,
      alloc,
      numOfTrades,
      emaLength,
      targetPrice,
      maxLeverage,
      "start",
      Math.trunc(timestamp.fromDate(startTimevalue.$d) * 1000),
      Math.trunc(timestamp.fromDate(endTimevalue.$d) * 1000),
    );

    if (result === "success") {
      if (botMode === "live") {
        setBotStatus(true);
        setExpanded(false);
        alert("Bot Started");
      } else {
        let progress = await getProgress();
        console.log(progress.data);
        if (progress.data === 100) {
          setBotStatus(false);
          navigate("/logs");
        }
      }
    } else {
      alert("Error : " + result);
    }
  };

  const handleStop = async () => {
    let result = await stopBot();

    if (result === "success") {
      setBotStatus(false);

      alert("Bot Stopped");
    } else {
      alert("Error : " + result);
    }
  };

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={botMode !== "live" && botStatus}
        // open={true}
        // onClick={handleClose}
      >
        <Skeleton
          sx={{ textAlign: "center", fontSize: "24px", p: 4 }}
          variant="rounded"
          width={210}
          // height={118}
        >
          Back Test in Progress
        </Skeleton>
      </Backdrop>
      <Grid
        container
        py={{ xs: 6, md: 12 }}
        px={{ xs: 2, md: 10 }}
        maxWidth={"xl"}
        mx={"auto"}
        justifyContent="space-between"
        gap={2}
      >
        <Grid
          item
          xs={12}
          md={3.5}
          order={{ xs: 3, md: 1 }}
          sx={{ mt: { xs: 6, md: 0 } }}
        >
          <Paper
            sx={{
              width: { xs: "100%", md: "100%" },
              height: "fit-content",
              p: 2,
              background: "none",
              border: "1px solid #2a2e39",
            }}
          >
            <Stack spacing={2} alignItems="center">
              {/* <Badge
            color={botStatus ? "success" : "error"}
            badgeContent={botStatus ? "ON" : "OFF"}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Typography fontSize={30}>Trading Bot</Typography>
          </Badge> */}

              <Selector
                _title="Trade Mode"
                _value={botMode}
                _botStatus={botStatus}
                _updater={setBotMode}
                _options={[
                  { key: 1345321, value: "live", name: "Live" },
                  { key: 19921321, value: "back_test", name: "Back Test" },
                ]}
              />
              <Selector
                _title="Asset"
                _value={asset}
                _botStatus={botStatus}
                _updater={setAsset}
                _options={[
                  { key: 1321321, value: "BTCUSDT", name: "BTCUSDT" },
                  { key: 1421321, value: "ETHUSDT", name: "ETHUSDT" },
                  { key: 166321, value: "SOLUSDT", name: "SOLUSDT" },
                ]}
              />

              <Slider
                _title="Risk %"
                _value={alloc}
                _botStatus={botStatus}
                _updater={setAlloc}
              />

              <Selector
                _title="Trading Strategy"
                _value={strategy}
                _botStatus={botStatus}
                _updater={setStrategy}
                _options={[
                  { key: 13455323423321, value: 1, name: "Daily Long" },
                  { key: 199212342334521, value: 2, name: "Daily Short" },
                  { key: 133455323431, value: 3, name: "4h Long" },
                  { key: 193292123781, value: 4, name: "4h Short" },
                  { key: 199212342233321, value: 5, name: "Custom" },
                ]}
              />
              <Accordion
                expanded={expanded}
                onChange={handleAccordChange}
                sx={{ width: "100%", background: "none" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{ width: "100%", flexShrink: 0, color: "gray" }}
                  >
                    {expanded ? "Hide" : "View"} Advanced Inputs
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    <Selector
                      _title="Run Mode"
                      _value={autoSwitch}
                      _botStatus={botStatus}
                      _updater={setAutoSwitch}
                      _options={[
                        { key: 1321321, value: true, name: "Auto" },
                        { key: 1421321, value: false, name: "Manual" },
                      ]}
                    />
                    <Selector
                      _title="Bot Mode"
                      _value={botSide}
                      _botStatus={botStatus}
                      _updater={setBotSide}
                      _options={[
                        { key: 1345321, value: "short", name: "Short Bot" },
                        { key: 19921321, value: "long", name: "Long Bot" },
                      ]}
                    />
                    <Selector
                      _title="Trend Time Frame"
                      _value={trendTf}
                      _botStatus={botStatus}
                      _updater={setTrendTf}
                      _options={[
                        { key: 134523321, value: "4h", name: "4h" },
                        { key: 19921312321, value: "8h", name: "8h" },
                        { key: 134500223321, value: "1d", name: "1d" },
                      ]}
                    />

                    <Selector
                      _title="Indicator"
                      _value={indicator}
                      _botStatus={botStatus}
                      _updater={setIndicator}
                      _options={[
                        { key: 13450032431, value: "ema", name: "EMA" },
                        { key: 199213430021, value: "macd", name: "MACD" },
                        {
                          key: 199213432340021,
                          value: "macd_ema",
                          name: "MACD + EMA",
                        },
                      ]}
                    />

                    {indicator === "ema" || indicator === "macd_ema" ? (
                      <Slider
                        _title="EMA Length"
                        _value={emaLength}
                        _botStatus={botStatus}
                        _updater={setEmaLength}
                      />
                    ) : null}

                    <Selector
                      _title="SL Timeframe"
                      _value={slTf}
                      _botStatus={botStatus}
                      _updater={setSlTf}
                      _options={[
                        {
                          key: 16732313421,
                          value: "1h",
                          name: "1h Keltner Channel",
                        },
                        {
                          key: 199789026321,
                          value: "4h",
                          name: "4h Keltner Channel",
                        },
                      ]}
                    />

                    <Selector
                      _title="Entry Wave"
                      _value={entryTf}
                      _botStatus={botStatus}
                      _updater={setEntryTf}
                      _options={[
                        { key: 134523234321, value: "3m", name: "3m" },
                        { key: 199213312321, value: "15m", name: "15m" },
                        { key: 131450022332321, value: "30m", name: "30m" },
                        { key: 1345002232332321, value: "1h", name: "1h" },
                      ]}
                    />
                    <Selector
                      _title="Exit Strategy"
                      _value={exitMode}
                      _botStatus={botStatus}
                      _updater={setExitMode}
                      _options={[
                        {
                          key: 167321,
                          value: "waveRev",
                          name: "Wave Reversal",
                        },
                        {
                          key: 19976321,
                          value: "530Exit",
                          name: "Daily 530 reversal",
                        },
                        {
                          key: 19320597652,
                          value: "fixed",
                          name: "Target ROI %",
                        },
                        {
                          key: 19976001321,
                          value: "trendRev",
                          name: "Trend Reversal",
                        },
                      ]}
                    />
                    {exitMode === "waveRev" ? (
                      <Selector
                        _title="Exit Timeframe"
                        _value={exitTf}
                        _botStatus={botStatus}
                        _updater={setExitTf}
                        _options={[
                          { key: 8797007, value: "3m", name: "3m" },
                          { key: 1978978, value: "15m", name: "15m" },
                          { key: 1378921, value: "30m", name: "30m" },
                          { key: 134589031, value: "1h", name: "1h" },
                        ]}
                      />
                    ) : null}

                    {exitMode === "fixed" ? (
                      <Slider
                        _title="Fixed Target ROI %"
                        _value={targetPrice}
                        _botStatus={botStatus}
                        _updater={setTargetPrice}
                      />
                    ) : null}
                    <Slider
                      _title="Max Leverage"
                      _value={maxLeverage}
                      _botStatus={botStatus}
                      _updater={setMaxLeverage}
                    />

                    <Selector
                      _title="Trading Limit"
                      _value={numOfTrades}
                      _botStatus={botStatus}
                      _updater={setNumOfTrades}
                      _options={[
                        { key: 3289497007, value: 0, name: "Unlimited" },
                        { key: 195798978, value: 1, name: "1 Trade Only" },
                        { key: 13374221, value: 5, name: "5 Trades Only" },
                        { key: 134690731, value: 10, name: "10 Trades Only" },
                      ]}
                    />
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack
                  spacing={3}
                  sx={{ display: botMode === "live" ? "none" : "flex" }}
                >
                  <DateTimePicker
                    label="Sim Start Time"
                    value={startTimevalue}
                    minDate={minDate}
                    maxDate={maxDate}
                    // defaultValue={dayjs("2022-04-17T15:30")}
                    onChange={handleStartTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DateTimePicker
                    label="Sim End Time"
                    minDate={minDate}
                    maxDate={maxDate}
                    // defaultValue={dayjs("2022-04-17T15:30")}
                    value={endTimevalue}
                    onChange={handleEndTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>

            <Stack direction="row" justifyContent="space-around" sx={{ my: 2 }}>
              <Button
                sx={{
                  display: botStatus ? "none" : "flex",
                  color: "white",
                }}
                variant="contained"
                color="success"
                onClick={handleStart}
              >
                Start
              </Button>
              <Button
                sx={{ display: botStatus ? "flex" : "none" }}
                variant="contained"
                color="error"
                onClick={handleStop}
              >
                Stop
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} order={{ xs: 1, md: 3 }}>
          <Stack spacing={2}>
            {botMode === "live" && (
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                justifyContent="space-between"
              >
                <TradeCard asset={asset} />
              </Stack>
            )}

            <Stack alignItems="flex-end" spacing={0}>
              <Box sx={{ width: "100%", height: "400px" }}>
                <TradingViewWidget
                  page={{ id: 1, name: "Bitcoin", symbol: "BTC" }}
                  chartView={chartViews[chartView - 1]}
                  asset={asset}
                />
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", md: "100px" },
                      mt: "5px",
                    }}
                  >
                    <Selector
                      _title="Chart View"
                      _value={chartView}
                      _botStatus={false}
                      _updater={setChartView}
                      _options={[
                        { key: 13412391532321, value: 1, name: "HTF-4h" },
                        { key: 1345325436321, value: 2, name: "HTF-1d" },
                        { key: 19921273321, value: 3, name: "LTF-15m" },
                        { key: 1992112323321, value: 4, name: "LTF-30m" },
                        { key: 191921212233321, value: 5, name: "LTF-1h" },
                      ]}
                    />
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
