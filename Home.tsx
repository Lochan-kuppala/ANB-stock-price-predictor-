import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart2, LineChart, Shield } from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          Smart Trading Decisions<br />Start Here
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          StockSense combines advanced analytics with real-time market data to help you make informed trading decisions.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register">
            <Button size="lg" variant="primary">Get Started Free</Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">Contact Sales</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-dark-100 rounded-lg shadow-card">
          <TrendingUp className="h-12 w-12 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get instant insights with our real-time market analysis and predictive algorithms.
          </p>
        </div>
        
        <div className="p-6 bg-white dark:bg-dark-100 rounded-lg shadow-card">
          <BarChart2 className="h-12 w-12 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Advanced Charting</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize market trends with our professional-grade charting tools.
          </p>
        </div>
        
        <div className="p-6 bg-white dark:bg-dark-100 rounded-lg shadow-card">
          <Shield className="h-12 w-12 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure Trading</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Trade with confidence using our secure and reliable platform.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-50 dark:bg-dark-100 rounded-lg p-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-600">1M+</div>
            <div className="text-gray-600 dark:text-gray-400">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600">$2B+</div>
            <div className="text-gray-600 dark:text-gray-400">Trading Volume</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600">99.9%</div>
            <div className="text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary-600 text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
        <p className="text-lg mb-6">Join thousands of successful traders on our platform.</p>
        <Link to="/register">
          <Button size="lg" variant="secondary">Create Free Account</Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;