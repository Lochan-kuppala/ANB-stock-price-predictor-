import React from 'react';
import { useParams } from 'react-router-dom';
import StockChart from '../components/stocks/StockChart';
import StockStats from '../components/stocks/StockStats';
import TechnicalIndicators from '../components/stocks/TechnicalIndicators';
import StockPrediction from '../components/stocks/StockPrediction';
import NewsCard from '../components/news/NewsCard';
import BuySellForm from '../components/trading/BuySellForm';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { mockStocks, mockHistoricalData, mockTechnicalIndicators, mockPredictions, mockNews } from '../utils/mockData';

const StockDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  
  // Find stock data based on URL parameter
  const stock = mockStocks.find(s => s.symbol === symbol) || mockStocks[0];
  const historicalData = mockHistoricalData[stock.symbol] || mockHistoricalData['AAPL'];
  const technicalIndicators = mockTechnicalIndicators[stock.symbol] || mockTechnicalIndicators['AAPL'];
  const prediction = mockPredictions[stock.symbol] || mockPredictions['AAPL'];
  
  // Filter news related to this stock
  const stockNews = mockNews.filter(news => 
    news.relatedSymbols.includes(stock.symbol)
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline space-x-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{stock.symbol}</h1>
            <span className="text-lg text-gray-600 dark:text-gray-400">{stock.name}</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Exchange: NASDAQ • Currency: USD
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <StockChart data={historicalData} symbol={stock.symbol} />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <BuySellForm stock={stock} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StockStats stock={stock} />
        <StockPrediction prediction={prediction} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <TechnicalIndicators indicators={technicalIndicators} />
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Related News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stockNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;