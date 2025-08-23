import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Search, Bell, Menu, X, TrendingUp } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-dark-100/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 mr-8">
            <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-500" />
            <span className="hidden sm:inline-block text-xl font-bold text-gray-900 dark:text-white">StockSense</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500">
              Dashboard
            </Link>
            <Link to="/stocks" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500">
              Stocks
            </Link>
            <Link to="/trading" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500">
              Trading
            </Link>
            <Link to="/news" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500">
              News
            </Link>
            <Link to="/screener" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500">
              Screener
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {isSearchActive ? (
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search stocks..." 
                className="w-64 h-9 pl-9 pr-3 rounded-md bg-gray-100 border-transparent focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 dark:bg-dark-200 dark:text-gray-100 dark:focus:bg-dark-300 dark:placeholder-gray-400"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <button 
                className="absolute right-2.5 top-2.5"
                onClick={() => setIsSearchActive(false)}
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          ) : (
            <button 
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
              onClick={() => setIsSearchActive(true)}
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          
          <button className="relative h-9 w-9 flex items-center justify-center rounded-md text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-error-500"></span>
          </button>
          
          <ThemeToggle />
          
          <Link to="/account">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
              JS
            </div>
          </Link>
          
          <button 
            className="md:hidden h-9 w-9 flex items-center justify-center text-gray-500 dark:text-gray-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-gray-800 shadow-lg z-50">
          <div className="p-4 space-y-4">
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search stocks..." 
                className="w-full h-10 pl-9 pr-3 rounded-md bg-gray-100 border-transparent focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 dark:bg-dark-200 dark:text-gray-100 dark:focus:bg-dark-300"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/stocks" 
                className="text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Stocks
              </Link>
              <Link 
                to="/trading" 
                className="text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trading
              </Link>
              <Link 
                to="/news" 
                className="text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                to="/screener" 
                className="text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Screener
              </Link>
            </nav>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button fullWidth variant="primary">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;