import { Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getStats } from "../functions/api";

function TradeCard({ asset }) {
  const [calculatedStats, setCalculatedStats] = useState(null);

  useEffect(() => {
    fetchStats();
    const intervalId = setInterval(
      () => {
        fetchStats();
      },
      3 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, []);

  const fetchStats = async () => {
    let result = await getStats();

    if (result.type !== "success") {
      return;
    }
    let stats = result.data;
    let dir_order = stats.botSide === "short" ? -1 : 1;
    let date = new Date(stats.currentTicker.time);
    let _calculatedStats = {
      botSide: stats.botSide,
      leverage: stats.leverage,
      balance: stats.balance,
      pnl:
        stats.positionQty *
        dir_order *
        (Number(stats.currentTicker.price) - Number(stats.entryPrice)),
      size: stats.positionQty,
      margin: (stats.positionQty * Number(stats.entryPrice)) / stats.leverage,
      risk: 10,
      roe:
        (stats.positionQty *
          dir_order *
          (Number(stats.currentTicker.price) - Number(stats.entryPrice))) /
        ((stats.positionQty * Number(stats.entryPrice)) / stats.leverage),
      entryPrice: Number(stats.entryPrice),
      markPrice: Number(stats.currentTicker.price),
      liqPrice: 23423,
      slPrice: stats.stopLossPrice,
      target: "Daily Close",
      updated: date.toString().slice(0, 33),
    };

    setCalculatedStats({ ..._calculatedStats });
  };

  return (
    <>
      {calculatedStats !== null && calculatedStats.size !== 0 ? (
        <Card
          sx={{
            width: { xs: "100%", md: "100%" },
            p: 2,
            background: "none",
            border: "1px solid #2a2e39",
          }}
        >
          <Stack spacing={1}>
            <Typography sx={{ fontSize: "18px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  background:
                    calculatedStats.botSide === "short" ? "red" : "green",
                  borderRadius: "5px",
                  padding: "4px 4px 4px 4px",
                  marginRight: "5px",
                }}
              >
                {calculatedStats.botSide === "short" ? "SELL" : "BUY"}
              </span>
              {asset.slice(0, 3)}USDT Perpetual{" "}
              <span style={{ fontSize: "12px", color: "gray" }}>
                {calculatedStats.leverage}X
              </span>
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: "12px", color: "gray" }}>
                PNL (USDT) <br />
                <span
                  style={{
                    fontSize: "18px",
                    color: calculatedStats.pnl > 0 ? "green" : "red",
                    fontWeight: 600,
                  }}
                >
                  {calculatedStats.pnl.toFixed(3)} USDT
                </span>
              </Typography>
              <Typography
                align="right"
                sx={{ fontSize: "12px", color: "gray" }}
              >
                ROE <br />
                <span
                  style={{
                    fontSize: "18px",
                    color: calculatedStats.roe > 0 ? "green" : "red",
                    fontWeight: 600,
                  }}
                >
                  {(calculatedStats.roe * 100).toFixed(3)} %
                </span>
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: "12px", color: "gray" }}>
                Size (BTC) <br />
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {calculatedStats.size}
                </span>
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: "gray" }}
                align="right"
              >
                Margin (USDT) <br />
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {calculatedStats.margin}
                </span>
              </Typography>
              {/* <Typography
                align='right'
                sx={{ fontSize: "12px", color: "gray" }}
              >
                Risk <br />
                <span
                  style={{ fontSize: "14px", color: "green", fontWeight: 600 }}
                >
                  {calculatedStats.risk} %
                </span>
              </Typography> */}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: "12px", color: "gray" }}>
                Entry Price <br />
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {calculatedStats.entryPrice.toLocaleString()}
                </span>
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: "gray" }}
                align="right"
              >
                Mark Price (USDT) <br />
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {calculatedStats.markPrice.toLocaleString()}
                </span>
              </Typography>
              {/* <Typography
                align='right'
                sx={{ fontSize: "12px", color: "gray" }}
              >
                Liq Price <br />
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {calculatedStats.liqPrice}
                </span>
              </Typography> */}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: "12px", color: "gray" }}>
                SL Price <br />
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {calculatedStats.slPrice.toLocaleString()}
                </span>
              </Typography>

              {/* <Typography
                        align='right'
                        sx={{ fontSize: "12px", color: "gray" }}
                    >
                        Target <br />
                        <span style={{ fontSize: "14px", fontWeight: 600 }}>
                        {calculatedStats.target}
                        </span>
                    </Typography> */}
              <Typography
                align="right"
                sx={{ fontSize: "12px", color: "gray" }}
              >
                Updated On <br />
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {calculatedStats.updated}
                </span>
              </Typography>
            </Stack>
          </Stack>
        </Card>
      ) : (
        <Card
          sx={{
            width: { xs: "100%", md: "50%" },
            p: 2,
            background: "none",
            border: "1px solid #2a2e39",
          }}
        >
          <Typography
            sx={{ fontSize: "18px", color: "gray", textAlign: "center" }}
          >
            No open position
          </Typography>
        </Card>
      )}
    </>
  );
}

export default TradeCard;
