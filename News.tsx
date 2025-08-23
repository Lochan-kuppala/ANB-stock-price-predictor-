import React, { useState } from 'react';
import { mockNews } from '../utils/mockData';
import NewsCard from '../components/news/NewsCard';
import { Search, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const News: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  
  // Get unique sources and stocks from news data
  const sources = Array.from(new Set(mockNews.map(news => news.source)));
  const stocks = Array.from(new Set(mockNews.flatMap(news => news.relatedSymbols)));
  
  // Filter news based on search query, source, and sentiment
  const filteredNews = mockNews.filter(news => {
    const matchesSearch = 
      searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.relatedSymbols.some(symbol => symbol.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSource = selectedSource === null || news.source === selectedSource;
    const matchesSentiment = selectedSentiment === null || news.sentiment === selectedSentiment;
    
    return matchesSearch && matchesSource && matchesSentiment;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Market News</h1>
      </div>
      
      <div className="bg-white dark:bg-dark-100 p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark-100 text-gray-900 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="mr-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sources:</span>
          </div>
          <Badge 
            variant={selectedSource === null ? "primary" : "outline"}
            size="md"
            className="cursor-pointer"
            onClick={() => setSelectedSource(null)}
          >
            All
          </Badge>
          {sources.map(source => (
            <Badge 
              key={source}
              variant={selectedSource === source ? "primary" : "outline"}
              size="md"
              className="cursor-pointer"
              onClick={() => setSelectedSource(source)}
            >
              {source}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="mr-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sentiment:</span>
          </div>
          <Badge 
            variant={selectedSentiment === null ? "primary" : "outline"}
            size="md"
            className="cursor-pointer"
            onClick={() => setSelectedSentiment(null)}
          >
            All
          </Badge>
          <Badge 
            variant={selectedSentiment === 'positive' ? "success" : "outline"}
            size="md"
            className="cursor-pointer"
            onClick={() => setSelectedSentiment('positive')}
          >
            Positive
          </Badge>
          <Badge 
            variant={selectedSentiment === 'negative' ? "error" : "outline"}
            size="md"
            className="cursor-pointer"
            onClick={() => setSelectedSentiment('negative')}
          >
            Negative
          </Badge>
          <Badge 
            variant={selectedSentiment === 'neutral' ? "secondary" : "outline"}
            size="md"
            className="cursor-pointer"
            onClick={() => setSelectedSentiment('neutral')}
          >
            Neutral
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="mr-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Stocks:</span>
          </div>
          {stocks.slice(0, 8).map(stock => (
            <Badge 
              key={stock}
              variant="outline"
              size="md"
              className="cursor-pointer"
              onClick={() => setSearchQuery(stock)}
            >
              {stock}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(news => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default News;