import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Eye, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { WatchlistItem } from '../../hooks/useWatchlist';
import { formatCurrency, formatPercent, getValueColor } from '../../utils/helpers';

interface WatchlistCardProps {
  watchlist: WatchlistItem[];
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ watchlist }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Watchlist</CardTitle>
          <Eye className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        {watchlist.length > 0 ? (
          <div className="space-y-3">
            {watchlist.slice(0, 4).map((item) => {
              const priceChangeColor = getValueColor(item.changePercent);
              const priceChangeIcon = item.changePercent >= 0 ? 
                <TrendingUp className="h-4 w-4" /> : 
                <TrendingDown className="h-4 w-4" />;
              
              return (
                <Link to={`/stocks/${item.symbol}`} key={item.symbol}>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 -mx-2 rounded">
                    <div>
                      <div className="font-medium">{item.symbol}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px]">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div>{formatCurrency(item.price)}</div>
                      <div className={`flex items-center justify-end ${priceChangeColor}`}>
                        {priceChangeIcon}
                        <span className="ml-1">
                          {formatPercent(item.changePercent)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Eye className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No watchlist items</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Add stocks to track their performance
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Link 
          to="/stocks" 
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 flex items-center"
        >
          Browse stocks
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WatchlistCard;