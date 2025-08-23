import React from 'react';
import MarketOverview from '../components/dashboard/MarketOverview';
import PortfolioCard from '../components/dashboard/PortfolioCard';
import WatchlistCard from '../components/dashboard/WatchlistCard';
import PopularStocks from '../components/dashboard/PopularStocks';
import ChatInterface from '../components/chatbot/ChatInterface';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import NewsCard from '../components/news/NewsCard';
import { usePortfolio } from '../hooks/usePortfolio';
import { useWatchlist } from '../hooks/useWatchlist';
import { mockStocks, mockNews } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const { portfolio } = usePortfolio();
  const { watchlist } = useWatchlist();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-full">
          <MarketOverview />
        </div>
        
        <div className="col-span-1">
          <PortfolioCard portfolio={portfolio} />
        </div>
        
        <div className="col-span-1">
          <WatchlistCard watchlist={watchlist} />
        </div>
        
        <div className="col-span-1">
          <PopularStocks stocks={mockStocks} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Latest Market News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockNews.slice(0, 4).map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;