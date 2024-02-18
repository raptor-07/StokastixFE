// TradingViewWidget.js

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget({ page, chartView, asset }) {
  console.log(chartView);
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current(),
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_5c0f6") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: "100%",
          height: "100%",
          symbol: `${asset.slice(0, 3)}USDT`,
          interval: chartView.interval,
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "in",
          toolbar_bg: "#f1f3f6",
          details: true,
          hotlist: true,
          calendar: true,
          enable_publishing: false,
          // hide_top_toolbar: true,
          studies: chartView.studies,
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",

          allow_symbol_change: true,
          container_id: "tradingview_5c0f6",
        });
      }
    }
  }, [chartView]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_5c0f6" />
      <div className="tradingview-widget-copyright" style={{ display: "none" }}>
        <a
          href={`https://in.tradingview.com/symbols/${asset.slice(0, 3)}USDT/`}
          rel="noopener"
          target="_blank"
        >
          <span className="blue-text">{asset.slice(0, 3)}USDT chart</span>
        </a>{" "}
        by TradingView
      </div>
    </div>
  );
}
