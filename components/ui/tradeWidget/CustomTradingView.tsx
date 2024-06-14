import React, { useEffect, useRef } from "react"
import { useGetKlineDataMock } from "@/chainio/useKlineData"
import {
  CrosshairMode,
  DeepPartial,
  IChartApi,
  LineData,
  createChart,
} from "lightweight-charts"

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

  const { klineData, loading } = useGetKlineDataMock(symbol, type)

  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: 1100,
        height: 480,
        layout: {
          background: {
            color: "#FFFFFF09",
          },
          textColor: "#efefef",
        },
        grid: {
          vertLines: {
            color: "#2F2F2F",
          },
          horzLines: {
            color: "#2F2F2F",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: "#FFFFFF08",
        },
        timeScale: {
          borderColor: "#FFFFFF08",
          tickMarkFormatter: (time: any, tickMarkType: any, locale: any) => {
            const date = new Date(time * 1000)
            const hours = date.getHours().toString().padStart(2, "0")
            const minutes = date.getMinutes().toString().padStart(2, "0")
            return `${hours}:${minutes}`
          },
        },
      })
      const candleSeries = chart.addCandlestickSeries({
        upColor: "#83DED5",
        downColor: "rgb(255, 76, 76)",
        borderDownColor: "rgb(255, 76, 76)",
        borderUpColor: "#83DED5",
        wickDownColor: "rgb(255, 76, 76)",
        wickUpColor: "#83DED5",
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

  return <div ref={chartContainerRef} className="rounded-xl" />
}

export default CustomTradingView

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
