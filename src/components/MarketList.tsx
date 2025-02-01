'use client';

import { MarketData } from '@/types/trading';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useState } from 'react';

interface MarketListProps {
  markets: MarketData[];
  selectedMarket: string;
  onSelectMarket: (symbol: string) => void;
}

export default function MarketList({ markets, selectedMarket, onSelectMarket }: MarketListProps) {
  const [filter, setFilter] = useState('All');

  return (
    <div className="bg-[#1B1B1F] h-full border-r border-gray-800">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search crypto"
          className="w-full bg-[#0B0B0F] text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
      </div>
      
      <div className="flex gap-2 px-4 text-sm border-b border-gray-800 pb-2">
        <button 
          className={`${filter === 'Favorites' ? 'text-white' : 'text-gray-400'} hover:text-white`}
          onClick={() => setFilter('Favorites')}
        >
          Favorites
        </button>
        <button 
          className={`${filter === 'All' ? 'text-white' : 'text-gray-400'} hover:text-white`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button 
          className={`${filter === 'Top' ? 'text-white' : 'text-gray-400'} hover:text-white`}
          onClick={() => setFilter('Top')}
        >
          Top
        </button>
      </div>

      <div className="mt-2">
        <div className="grid grid-cols-2 px-4 py-2 text-xs text-gray-400 border-b border-gray-800">
          <span>Name</span>
          <span className="text-right">Last price/24h change</span>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {markets.map((market) => (
            <div
              key={market.symbol}
              onClick={() => onSelectMarket(market.symbol)}
              className={`grid grid-cols-2 px-4 py-2 hover:bg-[#0B0B0F] cursor-pointer ${
                selectedMarket === market.symbol ? 'bg-[#0B0B0F]' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <button 
                  className="text-gray-400 hover:text-yellow-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add favorite logic here
                  }}
                >
                  {market.isFavorite ? (
                    <AiFillStar className="text-yellow-500" />
                  ) : (
                    <AiOutlineStar />
                  )}
                </button>
                <div className="flex flex-col">
                  <span className="text-white text-sm">{market.symbol}</span>
                  <span className="text-xs text-gray-400">{market.name}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-sm">${market.price.toLocaleString()}</div>
                <div className={`text-xs ${market.change24h >= 0 ? 'text-[#26a69a]' : 'text-[#ef5350]'}`}>
                  {market.change24h > 0 ? '+' : ''}{market.change24h.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 