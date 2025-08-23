import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../hooks/usePortfolio';
import { StockData } from '../../types';
import { formatCurrency } from '../../utils/helpers';

interface BuySellFormProps {
  stock: StockData;
}

const BuySellForm: React.FC<BuySellFormProps> = ({ stock }) => {
  const { user } = useAuth();
  const { addToPortfolio, sellFromPortfolio, portfolio } = usePortfolio();
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const total = quantity * stock.price;
  const existingPosition = portfolio.find(p => p.symbol === stock.symbol);
  const maxSellQuantity = existingPosition?.shares || 0;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please log in to place orders');
      return;
    }

    if (orderType === 'sell' && quantity > maxSellQuantity) {
      setError(`Cannot sell more than ${maxSellQuantity} shares`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (orderType === 'buy') {
        await addToPortfolio(stock.symbol, quantity, stock.price);
      } else {
        await sellFromPortfolio(stock.symbol, quantity, stock.price);
      }

      setOrderSuccess(true);
      setQuantity(1);
      setTimeout(() => setOrderSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex rounded-md overflow-hidden">
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  orderType === 'buy'
                    ? 'bg-success-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setOrderType('buy')}
              >
                Buy
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  orderType === 'sell'
                    ? 'bg-error-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setOrderType('sell')}
                disabled={maxSellQuantity === 0}
              >
                Sell
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={orderType === 'sell' ? maxSellQuantity : undefined}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            {orderType === 'sell' && (
              <p className="text-xs text-gray-500 mt-1">
                Available: {maxSellQuantity} shares
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price Per Share
            </label>
            <input
              type="text"
              id="price"
              value={formatCurrency(stock.price)}
              disabled
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div className="mb-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Estimated Total:</span>
              <span className="text-lg font-bold">{formatCurrency(total)}</span>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200 rounded-md text-center">
              {error}
            </div>
          )}
          
          {orderSuccess && (
            <div className="mb-4 p-2 bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200 rounded-md text-center">
              Order placed successfully!
            </div>
          )}
          
          <Button
            type="submit"
            variant={orderType === 'buy' ? 'success' : 'danger'}
            fullWidth
            size="lg"
            isLoading={loading}
            disabled={loading || (orderType === 'sell' && maxSellQuantity === 0)}
          >
            {orderType === 'buy' ? 'Buy' : 'Sell'} {stock.symbol} Stock
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BuySellForm;