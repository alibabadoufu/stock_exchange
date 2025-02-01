'use client';

import { MarketData } from '@/types/trading';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsArrowUpRight } from 'react-icons/bs';

interface MarketHeaderProps {
  market: MarketData;
  leverage?: string;
}

export default function MarketHeader({ market, leverage = '10x' }: MarketHeaderProps) {
  return (
    <div className="bg-[#0B0B0F] border-b border-gray-800 text-white">
      <div className="flex items-center px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <img src="/bitcoin.svg" alt="BTC" className="w-6 h-6" />
            <span className="font-medium">{market.symbol}</span>
            <span className="text-gray-400">{leverage}</span>
            <button className="text-gray-400 hover:text-yellow-500">
              {market.isFavorite ? (
                <AiFillStar className="text-yellow-500" />
              ) : (
                <AiOutlineStar />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-8 ml-8">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Bitcoin price</span>
            <div className="flex items-center gap-1">
              <BsArrowUpRight className="text-xs" />
              <span>${market.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400">24h low</span>
            <span>${market.low24h.toLocaleString()}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400">24h high</span>
            <span>${market.high24h.toLocaleString()}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400">24h volume (BTC)</span>
            <span>{market.volume24h}K</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400">24h turnover (USDT)</span>
            <span>{(market.volume24h * market.price / 1000000).toFixed(2)}M</span>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white">Trading data</button>
          <button className="text-gray-400 hover:text-white">Information</button>
          <button className="text-gray-400 hover:text-white p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 