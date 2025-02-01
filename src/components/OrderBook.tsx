'use client';

import { OrderBook as OrderBookType, OrderBookEntry } from '@/types/trading';

interface OrderBookProps {
  orderBook: OrderBookType;
}

export default function OrderBook({ orderBook }: OrderBookProps) {
  const renderOrderRow = (order: OrderBookEntry, type: 'bid' | 'ask', index: number) => (
    <div 
      key={`${type}-${index}-${order.price}`}
      className={`grid grid-cols-3 text-sm py-0.5 ${type === 'bid' ? 'text-[#26a69a]' : 'text-[#ef5350]'}`}
    >
      <span>{order.price.toFixed(2)}</span>
      <span>{order.amount.toFixed(6)}</span>
      <span>{order.total.toFixed(6)}</span>
    </div>
  );

  return (
    <div className="bg-[#0B0B0F] p-4">
      <h2 className="text-white mb-2">Order Book</h2>
      <div className="grid grid-cols-3 text-gray-400 text-sm mb-2">
        <span>Price (USDT)</span>
        <span>Amount (BTC)</span>
        <span>Total</span>
      </div>
      <div className="space-y-1">
        {orderBook.asks.slice().reverse().map((ask, i) => renderOrderRow(ask, 'ask', i))}
        <div key="divider" className="border-t border-gray-800 my-2" />
        {orderBook.bids.map((bid, i) => renderOrderRow(bid, 'bid', i))}
      </div>
    </div>
  );
} 