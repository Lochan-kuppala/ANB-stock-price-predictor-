import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const marketIndexes = [
  { name: 'S&P 500', value: 4783.45, change: 0.68, color: '#10B981' },
  { name: 'Nasdaq', value: 15003.22, change: 1.02, color: '#10B981' },
  { name: 'Dow Jones', value: 38239.98, change: 0.37, color: '#10B981' },
  { name: 'Russell 2000', value: 2017.92, change: -0.25, color: '#EF4444' }
];

// Generate random data for the chart
const generateChartData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      name: i.toString(),
      sp500: 4700 + Math.random() * 200,
      nasdaq: 14800 + Math.random() * 400,
      dowjones: 38000 + Math.random() * 500
    });
  }
  return data;
};

const chartData = generateChartData();

const MarketOverview: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Market Overview</CardTitle>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {marketIndexes.map((index) => (
            <div key={index.name} className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">{index.name}</span>
              <span className="text-lg font-semibold">{index.value.toLocaleString()}</span>
              <div className={`flex items-center ${index.change >= 0 ? 'text-success-500' : 'text-error-500'}`}>
                {index.change >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {index.change >= 0 ? '+' : ''}{index.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-40 pt-2 border-t border-gray-100 dark:border-gray-800">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}`, '']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '6px',
                  padding: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: 'none'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sp500" 
                stroke="#6366F1" 
                strokeWidth={2}
                dot={false}
                name="S&P 500" 
              />
              <Line 
                type="monotone" 
                dataKey="nasdaq" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={false}
                name="Nasdaq" 
              />
              <Line 
                type="monotone" 
                dataKey="dowjones" 
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={false}
                name="Dow Jones" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;