import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { StockData } from '../../types';
import { formatCurrency, formatPercent, getValueColor } from '../../utils/helpers';

interface StockCardProps {
  stock: StockData;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const priceChangeColor = getValueColor(stock.changePercent);
  const priceChangeIcon = stock.changePercent >= 0 ? 
    <TrendingUp className="h-4 w-4" /> : 
    <TrendingDown className="h-4 w-4" />;

  return (
    <Link to={`/stocks/${stock.symbol}`}>
      <Card className="h-full transition-transform hover:translate-y-[-4px]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{stock.symbol}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart2 className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">{formatCurrency(stock.price)}</div>
              <div className={`flex items-center space-x-1 ${priceChangeColor}`}>
                {priceChangeIcon}
                <span className="font-medium">{formatPercent(stock.changePercent)}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2 text-sm border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-gray-500 dark:text-gray-400">P/E</p>
                <p className="font-medium">{stock.pe.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">EPS</p>
                <p className="font-medium">${stock.eps.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StockCard;