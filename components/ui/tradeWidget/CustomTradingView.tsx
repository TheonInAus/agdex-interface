import React, { useEffect, useRef } from "react"
import {
  CrosshairMode,
  DeepPartial,
  IChartApi,
  LineData,
  createChart,
} from "lightweight-charts"

import { useGetKlineData } from "@/hooks/useKlineData"

interface CandleData {
  time: string
  open: number
  high: number
  low: number
  close: number
}

interface TradingViewChartProps {
  data: CandleData[]
}

interface VolumeData {
  time: string
  value: number
}

interface CustomTradingViewProps {
  symbol: string
  type: number
}

const CustomTradingView: React.FC<CustomTradingViewProps> = ({
  symbol,
  type,
}: CustomTradingViewProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleSeriesRef = useRef<any>(null)

  const { klineData } = useGetKlineData(symbol, type)
  console.log("🚀 ~ check kline kline :", klineData)

  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: 1050,
        height: 480,
        layout: {
          background: {
            color: "#111",
          },
          textColor: "#d1d4dc",
        },
        grid: {
          vertLines: {
            color: "#222",
          },
          horzLines: {
            color: "#222",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: "#444",
        },
        timeScale: {
          borderColor: "#444",
          tickMarkFormatter: (time: any, tickMarkType: any, locale: any) => {
            const date = new Date(time * 1000)
            const hours = date.getHours().toString().padStart(2, "0")
            const minutes = date.getMinutes().toString().padStart(2, "0")
            return `${hours}:${minutes}`
          },
        },
      })
      const candleSeries = chart.addCandlestickSeries({
        upColor: "rgb(76, 255, 181)",
        downColor: "rgb(255, 76, 76)",
        borderDownColor: "rgb(255, 76, 76)",
        borderUpColor: "rgb(76, 255, 181)",
        wickDownColor: "rgb(255, 76, 76)",
        wickUpColor: "rgb(76, 255, 181)",
      })

      chart.timeScale().scrollToRealTime()
      chartRef.current = chart
      candleSeriesRef.current = candleSeries
      //   const smaSeries = chart.addLineSeries()
      //   smaSeries.setData(smaData)

      // const volumeSeries = chart.addHistogramSeries({
      //   color: "#26a69a",
      //   priceFormat: {
      //     type: "volume",
      //   },
      //   priceScaleId: "",
      // })

      // chart.priceScale("").applyOptions({
      //   scaleMargins: {
      //     top: 0.8,
      //     bottom: 0,
      //   },
      // })
      // volumeSeries.setData(volumeData)
    }

    return () => {
      chartRef.current?.remove()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    if (candleSeriesRef.current && klineData && klineData.length > 0) {
      candleSeriesRef.current.setData(klineData)
    }
  }, [klineData])

  return <div ref={chartContainerRef} />
}

export default CustomTradingView

const volumeData = [
  { time: "2018-10-19", value: 500, color: "rgba(0, 150, 136, 0.8)" },
  { time: "2018-10-23", value: 220, color: "rgba(255,82,82, 0.8)" },
  { time: "2018-10-24", value: 700, color: "rgba(255,82,82, 0.8)" },
  { time: "2018-10-25", value: 300, color: "rgba(0, 150, 136, 0.8)" },
  { time: "2018-10-26", value: 100, color: "rgba(0, 150, 136, 0.8)" },
  { time: "2018-10-29", value: 200, color: "rgba(0, 150, 136, 0.8)" },
  { time: "2018-10-30", value: 300, color: "rgba(255,82,82, 0.8)" },
  { time: "2018-11-01", value: 100, color: "rgba(0, 150, 136, 0.8)" },
  { time: "2018-11-02", value: 800, color: "rgba(0, 150, 136, 0.8)" },
  { time: "2018-11-03", value: 300, color: "rgba(255,82,82, 0.8)" },
  { time: "2018-11-04", value: 500, color: "rgba(255,82,82, 0.8)" },
  { time: "2018-11-05", value: 200, color: "rgba(255,82,82, 0.8)" },
  { time: "2018-11-06", value: 700, color: "rgba(0, 150, 136, 0.8)" },
  { time: "2018-11-07", value: 200, color: "rgba(0, 150, 136, 0.8)" },
  { time: "2018-11-08", value: 300, color: "rgba(0, 150, 136, 0.8)" },
]
export const intervals = ["1D", "1W", "1M", "1Y"]
// {
//   time: "2018-10-19",
//   open: 180.34,
//   high: 180.99,
//   low: 178.57,
//   close: 179.85,
// },

function calculateSMA(data: CandleData[], period: number): LineData[] {
  let sma: LineData[] = []

  for (let i = period - 1; i < data.length; i++) {
    let sum = 0
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close
    }
    sma.push({ time: data[i].time, value: sum / period })
  }

  return sma
}

// const smaData = calculateSMA(data, 10)
