import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Github, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-dark-100 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">StockSense</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Intelligent stock trading platform with AI-powered insights, technical analysis, and real-time data.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">Documentation</Link></li>
              <li><Link to="/api" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">API</Link></li>
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">Blog</Link></li>
              <li><Link to="/learn" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">Learn Trading</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">Careers</Link></li>
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">Contact Us</Link></li>
              <li><Link to="/status" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">System Status</Link></li>
              <li><Link to="/feedback" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 text-sm">Feedback</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} StockSense. All rights reserved. Market data provided for educational purposes only.
          </p>
          <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-2">
            This platform is for demonstration purposes. Not financial advice. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;