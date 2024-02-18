import axios from "axios";

const BASE_URL = "http://localhost:3000";

// const BASE_URL = "http://localhost:5001";

export const getBotStatus = async () => {
  console.log(BASE_URL);
  var config = {
    method: "get",
    url: `${BASE_URL}/status`,
    headers: {},
  };

  console.log(config.url);

  let result = axios(config)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
      return error.message;
    });

  return result;
};

export const getLogs = async () => {
  var config = {
    method: "get",
    url: `${BASE_URL}/logs`,
    headers: {},
  };

  let result = axios(config)
    .then(function (response) {
      return response.data.message;
    })
    .catch(function (error) {
      console.log(error);
      return error.message;
    });

  return result;
};

export const getStats = async () => {
  var config = {
    method: "get",
    url: `${BASE_URL}/stats`,
    headers: {},
  };

  let result = axios(config)
    .then(function (response) {
      return { type: "success", data: response.data.data };
    })
    .catch(function (error) {
      console.log(error);
      return { type: "error", data: error.message };
    });

  return result;
};

export const getProgress = async () => {
  var config = {
    method: "get",
    url: `${BASE_URL}/progress`,
    headers: {},
  };

  let result = axios(config)
    .then(function (response) {
      return { type: "success", data: response.data.data };
    })
    .catch(function (error) {
      console.log(error);
      return { type: "error", data: error.message };
    });

  return result;
};

export const startBot = async (
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
  botStatus,
  startTime,
  endTime,
) => {
  var data = {
    botMode: botMode,
    asset: asset,
    autoSwitch: autoSwitch,
    trendTf: trendTf,
    botSide: botSide,
    indicator: indicator,
    slTf: slTf,
    entryTf: entryTf,
    exitTf: exitTf,
    exitMode: exitMode,
    alloc: alloc,
    numOfTrades: numOfTrades,
    emaLength: emaLength,
    targetPrice: targetPrice,
    maxLeverage: maxLeverage,
    botStatus: botStatus,
    startTime: Number(startTime),
    endTime: Number(endTime),
  };
  var config = {
    method: "post",
    url: `${BASE_URL}/start`,
    headers: {},
    data: data,
  };

  let result = await axios(config)
    .then(function (response) {
      return response.data.message;
    })
    .catch(function (error) {
      return error.message;
    });

  return result;
};

export const stopBot = async () => {
  var config = {
    method: "post",
    url: `${BASE_URL}/stop`,
    headers: {},
  };

  let result = await axios(config)
    .then(function (response) {
      return response.data.message;
    })
    .catch(function (error) {
      return error.message;
    });

  return result;
};
