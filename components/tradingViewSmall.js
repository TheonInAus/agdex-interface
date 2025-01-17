// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react"

let tvScriptLoadingPromise

export default function TradingViewWidgetSmall({ tokenName }) {
  const onLoadScriptRef = useRef()

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script")
        script.id = "tradingview-widget-loading-script"
        script.src = "https://s3.tradingview.com/tv.js"
        script.type = "text/javascript"
        script.onload = resolve

        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    )

    return () => (onLoadScriptRef.current = null)

    function createWidget() {
      if (
        document.getElementById("tradingview_65e52") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${tokenName ?? "ETH"}USD`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "3",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_65e52",
        })
      }
    }
  }, [tokenName])

  return (
    <div
      className="tradingview-widget-container"
      style={{ height: "100%", width: "100%" }}
    >
      <div id="tradingview_65e52" style={{ height: "400px", width: "100%" }} />
      <div className="tradingview-widget-copyright">
        {/* <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow noreferrer"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a> */}
      </div>
    </div>
  )
}
