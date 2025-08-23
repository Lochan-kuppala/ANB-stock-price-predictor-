import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { StockData } from '../../types';
import { 
  formatCurrency, 
  formatLargeNumber, 
  formatPercent, 
  getValueColor 
} from '../../utils/helpers';

interface StockStatsProps {
  stock: StockData;
}

const StockStats: React.FC<StockStatsProps> = ({ stock }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Price</p>
            <p className="text-xl font-semibold mt-1">{formatCurrency(stock.price)}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Change</p>
            <p className={`text-xl font-semibold mt-1 ${getValueColor(stock.changePercent)}`}>
              {formatPercent(stock.changePercent)}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Volume</p>
            <p className="text-xl font-semibold mt-1">{stock.volume.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="text-xl font-semibold mt-1">{formatLargeNumber(stock.marketCap)}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">P/E Ratio</p>
            <p className="text-xl font-semibold mt-1">{stock.pe.toFixed(2)}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">EPS</p>
            <p className="text-xl font-semibold mt-1">${stock.eps.toFixed(2)}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">52 Week High</p>
            <p className="text-xl font-semibold mt-1">{formatCurrency(stock.high52Week)}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">52 Week Low</p>
            <p className="text-xl font-semibold mt-1">{formatCurrency(stock.low52Week)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockStats;