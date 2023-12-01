// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react"

let tvScriptLoadingPromise

export default function TradingViewWidget() {
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
        document.getElementById("tradingview_8a9f1") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "BITSTAMP:ETHUSD",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_8a9f1",
        })
      }
    }
  }, [])

  return (
    <div
      className="tradingview-widget-container"
      style={{ height: "80%", width: "100%" }}
    >
      <div
        id="tradingview_8a9f1"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      />
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow noreferrer"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  )
}