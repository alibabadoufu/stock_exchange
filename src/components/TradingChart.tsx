'use client';

import { createChart } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { IoTimeOutline } from 'react-icons/io5';

interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface TradingChartProps {
  data: CandlestickData[];
}

const timeframes = ['1s', '1m', '5m', '15m', '1h', '4h', '1D'];

export default function TradingChart({ data }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('15m');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    try {
      const chartOptions = {
        layout: {
          background: { type: 'solid', color: '#1B1B1B' },
          textColor: '#DDD',
        },
        grid: {
          vertLines: { color: '#2B2B2B' },
          horzLines: { color: '#2B2B2B' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
          borderColor: '#2B2B2B',
        },
        rightPriceScale: {
          borderColor: '#2B2B2B',
        },
        crosshair: {
          mode: 1,
          vertLine: {
            color: '#555',
            width: 1,
            style: 3,
          },
          horzLine: {
            color: '#555',
            width: 1,
            style: 3,
          },
        },
      };

      const chart = createChart(chartContainerRef.current, chartOptions);

      const candlestickSeriesOptions = {
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
        priceFormat: {
          type: 'price',
          precision: 2,
          minMove: 0.01,
        },
      };

      const series = chart.addCandlestickSeries(candlestickSeriesOptions);
      series.setData(data);

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2 mb-4 text-sm">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-3 py-1 rounded ${
              selectedTimeframe === tf
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tf}
          </button>
        ))}
        <div className="flex-1" />
        <button className="p-2 text-gray-400 hover:text-white">
          <IoTimeOutline size={20} />
        </button>
        <button className="px-3 py-1 text-gray-400 hover:text-white">Original</button>
        <button className="px-3 py-1 bg-gray-700 text-white rounded">TradingView</button>
        <button className="px-3 py-1 text-gray-400 hover:text-white">Depth</button>
      </div>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
} 