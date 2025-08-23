import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { ChartDataPoint, TimeFrame } from '../../types';

interface StockChartProps {
  data: ChartDataPoint[];
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, symbol }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1M');
  
  // Filter data based on selected timeframe
  const filteredData = (() => {
    const now = new Date();
    const dataPoints = [...data];
    
    switch (timeframe) {
      case '1D':
        return dataPoints.slice(-1);
      case '1W':
        return dataPoints.slice(-7);
      case '1M':
        return dataPoints.slice(-30);
      case '3M':
        return dataPoints.slice(-90);
      case '6M':
        return dataPoints.slice(-180);
      case '1Y':
        return dataPoints.slice(-365);
      case '5Y':
        return dataPoints;
      default:
        return dataPoints.slice(-30);
    }
  })();
  
  const timeframeOptions: TimeFrame[] = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'];
  
  // Define color based on price change
  const priceChange = data.length > 1 ? data[data.length - 1].value - data[0].value : 0;
  const chartColor = priceChange >= 0 ? '#10B981' : '#EF4444';
  
  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">{symbol} Chart</h3>
        <div className="flex space-x-1">
          {timeframeOptions.map((option) => (
            <button
              key={option}
              className={`px-2 py-1 text-xs font-medium rounded ${
                timeframe === option
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
              onClick={() => setTimeframe(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (timeframe === '1D') return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                if (timeframe === '1W') return date.toLocaleDateString([], { weekday: 'short' });
                if (timeframe === '1M') return date.toLocaleDateString([], { day: 'numeric' });
                return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis
              domain={['dataMin', 'dataMax']}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              width={60}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString([], { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                });
              }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '6px',
                padding: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: 'none'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Volume Chart */}
      <div className="w-full h-24 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
            <XAxis 
              dataKey="date" 
              hide 
            />
            <Tooltip
              formatter={(value: number) => [`${value.toLocaleString()}`, 'Volume']}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '6px',
                padding: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: 'none'
              }}
            />
            <Bar 
              dataKey="volume" 
              fill="#6366F1" 
              opacity={0.5} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;