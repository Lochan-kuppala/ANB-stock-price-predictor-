import React, { useState } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import StockCard from '../components/stocks/StockCard';
import { mockStocks } from '../utils/mockData';
import Button from '../components/ui/Button';

const StockList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter stocks based on search query
  const filteredStocks = mockStocks.filter((stock) => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stocks</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 pb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stocks by name or symbol..."
            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark-100 text-gray-900 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <Button 
          variant="outline" 
          size="md"
          leftIcon={<Filter className="h-4 w-4" />}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Filter
        </Button>
      </div>
      
      {filterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-dark-200 p-4 rounded-md mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Market Cap
            </label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark-100 text-gray-900 dark:text-white">
              <option value="">Any</option>
              <option value="large">Large ($10B+)</option>
              <option value="mid">Mid ($2B-$10B)</option>
              <option value="small">Small (Under $2B)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sector
            </label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark-100 text-gray-900 dark:text-white">
              <option value="">All Sectors</option>
              <option value="tech">Technology</option>
              <option value="finance">Financial</option>
              <option value="health">Healthcare</option>
              <option value="consumer">Consumer Goods</option>
              <option value="energy">Energy</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price Change
            </label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark-100 text-gray-900 dark:text-white">
              <option value="">Any</option>
              <option value="up">Up Today</option>
              <option value="down">Down Today</option>
              <option value="up5">Up 5%+</option>
              <option value="down5">Down 5%+</option>
            </select>
          </div>
          
          <div className="md:col-span-3 flex justify-end mt-2">
            <Button size="sm" variant="outline" className="mr-2">
              Reset
            </Button>
            <Button size="sm" variant="primary">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      
      {filteredStocks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No stocks found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default StockList;