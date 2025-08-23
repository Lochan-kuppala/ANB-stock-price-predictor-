import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ExternalLink } from 'lucide-react';
import { NewsItem } from '../../types';
import Badge from '../ui/Badge';
import { formatRelativeTime, getSentimentClass } from '../../utils/helpers';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <a 
      href={news.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
        {news.imageUrl && (
          <div className="h-40 overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105" 
            />
          </div>
        )}
        <CardContent className={`p-4 flex flex-col flex-grow ${news.imageUrl ? '' : 'pt-4'}`}>
          <div className="flex items-center justify-between mb-2">
            <Badge size="sm" variant="outline" className="flex items-center space-x-1">
              <span>{news.source}</span>
            </Badge>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatRelativeTime(news.publishedAt)}
            </span>
          </div>
          
          <h3 className="font-medium text-base mb-2 line-clamp-2">{news.title}</h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
            {news.summary}
          </p>
          
          <div className="mt-auto pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              {news.relatedSymbols.map((symbol) => (
                <Badge key={symbol} size="sm">{symbol}</Badge>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-medium ${getSentimentClass(news.sentiment)}`}>
                {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default NewsCard;