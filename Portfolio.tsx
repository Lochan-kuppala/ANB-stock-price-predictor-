import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { usePortfolio } from '../hooks/usePortfolio';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency, formatPercent, getValueColor } from '../utils/helpers';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, DollarSign, History } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { portfolio, loading, totalValue, totalGain, totalGainPercent } = usePortfolio();
  const { transactions } = useTransactions();

  const pieData = portfolio.map(stock => ({
    name: stock.symbol,
    value: stock.totalValue
  }));

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
              <Wallet className="h-8 w-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${getValueColor(totalGain)}`}>
                  {formatCurrency(totalGain)}
                </p>
              </div>
              {totalGain >= 0 ? (
                <TrendingUp className="h-8 w-8 text-success-500" />
              ) : (
                <TrendingDown className="h-8 w-8 text-error-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Return %</p>
                <p className={`text-2xl font-bold ${getValueColor(totalGainPercent)}`}>
                  {formatPercent(totalGainPercent)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Positions</p>
                <p className="text-2xl font-bold">{portfolio.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            {portfolio.length > 0 ? (
              <div className="space-y-4">
                {portfolio.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {stock.shares} shares @ {formatCurrency(stock.avgPrice)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(stock.totalValue)}</div>
                      <div className={getValueColor(stock.totalGainPercent)}>
                        {formatCurrency(stock.totalGain)} ({formatPercent(stock.totalGainPercent)})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Wallet className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No holdings yet</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Start trading to build your portfolio
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {portfolio.length > 0 ? 'Portfolio Allocation' : 'Recent Transactions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {portfolio.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        transaction.type === 'buy' ? 'bg-success-500' : 'bg-error-500'
                      }`} />
                      <div>
                        <div className="font-medium">{transaction.symbol}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.type.toUpperCase()} {transaction.quantity} shares
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(transaction.total)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
                {transactions.length === 0 && (
                  <div className="text-center py-8">
                    <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;