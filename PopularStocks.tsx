import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StockData } from '../../types';
import { formatCurrency, formatPercent, getValueColor } from '../../utils/helpers';

interface PopularStocksProps {
  stocks: StockData[];
}

const PopularStocks: React.FC<PopularStocksProps> = ({ stocks }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Popular Stocks</CardTitle>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {stocks.slice(0, 5).map((stock) => (
            <Link 
              to={`/stocks/${stock.symbol}`} 
              key={stock.symbol}
              className="block"
            >
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 -mx-2 rounded">
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                    {stock.name}
                  </div>
                </div>
                <div className="text-right">
                  <div>{formatCurrency(stock.price)}</div>
                  <div className={getValueColor(stock.changePercent)}>
                    {formatPercent(stock.changePercent)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link 
          to="/stocks" 
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 flex items-center"
        >
          View all stocks
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PopularStocks;