'use client';

import { useState } from 'react';
import TradingChart from '@/components/TradingChart';
import OrderBook from '@/components/OrderBook';
import MarketList from '@/components/MarketList';
import MarketHeader from '@/components/MarketHeader';

const mockMarkets = [
  {
    symbol: 'BTC/USDT',
    name: 'Bitcoin',
    price: 102404.1,
    change24h: -1.67,
    volume24h: 9.17,
    high24h: 106000.0,
    low24h: 101542.4,
    isFavorite: true
  },
  {
    symbol: 'ETH/USDT',
    name: 'Ethereum',
    price: 3300.72,
    change24h: 1.93,
    volume24h: 150.45,
    high24h: 3400.00,
    low24h: 3200.00,
  },
  // Add more mock data as needed
];

const mockChartData = [
  { time: '2024-02-01', open: 102000, high: 103000, low: 101000, close: 102500 },
  { time: '2024-02-02', open: 102500, high: 104000, low: 102000, close: 103500 },
  // Add more mock data
];

const mockOrderBook = {
  bids: [
    { price: 102400, amount: 1.5, total: 153600 },
    { price: 102300, amount: 2.1, total: 214830 },
  ],
  asks: [
    { price: 102500, amount: 1.2, total: 123000 },
    { price: 102600, amount: 0.8, total: 82080 },
  ]
};

export default function TradingPage() {
  const [selectedMarket, setSelectedMarket] = useState('BTC/USDT');
  const currentMarket = mockMarkets.find(m => m.symbol === selectedMarket) || mockMarkets[0];

  const handleMarketSelect = (symbol: string) => {
    setSelectedMarket(symbol);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <MarketHeader market={currentMarket} />
      <div className="grid grid-cols-[320px,1fr,320px] h-[calc(100vh-56px)]">
        <MarketList 
          markets={mockMarkets}
          selectedMarket={selectedMarket}
          onSelectMarket={handleMarketSelect}
        />
        <div className="p-4 border-l border-r border-gray-800">
          <div className="bg-[#1B1B1F] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl text-white">{selectedMarket}</h1>
              <div className="text-sm">
                <span className={`${currentMarket.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {currentMarket.change24h > 0 ? '+' : ''}{currentMarket.change24h.toFixed(2)}%
                </span>
              </div>
            </div>
            <TradingChart data={mockChartData} />
          </div>
        </div>
        <OrderBook orderBook={mockOrderBook} />
      </div>
    </main>
  );
}
