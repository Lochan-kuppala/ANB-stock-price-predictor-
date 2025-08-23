import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { BarChart2, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { PortfolioHolding } from '../../hooks/usePortfolio';
import { formatCurrency, formatPercent, getValueColor } from '../../utils/helpers';

interface PortfolioCardProps {
  portfolio: PortfolioHolding[];
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
  // Calculate total portfolio value and gain/loss
  const totalValue = portfolio.reduce((sum, stock) => sum + stock.totalValue, 0);
  const totalGain = portfolio.reduce((sum, stock) => sum + stock.totalGain, 0);
  const totalGainPercent = totalValue > 0 ? (totalGain / (totalValue - totalGain)) * 100 : 0;
  
  const gainColor = getValueColor(totalGainPercent);
  const gainIcon = totalGainPercent >= 0 ? 
    <TrendingUp className="h-4 w-4" /> : 
    <TrendingDown className="h-4 w-4" />;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>My Portfolio</CardTitle>
          <BarChart2 className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        {portfolio.length > 0 ? (
          <>
            <div className="mb-4">
              <div className="text-3xl font-bold">{formatCurrency(totalValue)}</div>
              <div className={`flex items-center mt-1 ${gainColor}`}>
                {gainIcon}
                <span className="ml-1 font-medium">
                  {formatCurrency(totalGain)} ({formatPercent(totalGainPercent)})
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              {portfolio.slice(0, 3).map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div>
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stock.shares} shares</div>
                  </div>
                  <div className="text-right">
                    <div>{formatCurrency(stock.totalValue)}</div>
                    <div className={getValueColor(stock.totalGainPercent)}>
                      {formatPercent(stock.totalGainPercent)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <BarChart2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No holdings yet</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Start trading to build your portfolio
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Link 
          to="/portfolio" 
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 flex items-center"
        >
          View full portfolio
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PortfolioCard;