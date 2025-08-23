import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';
import { mockStocks } from '../utils/mockData';

export interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  changePercent: number;
}

export function usePortfolio() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPortfolio = async () => {
    if (!user) {
      setPortfolio([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const portfolioData = await db.getPortfolio(user.id);
      
      // Enhance portfolio data with current prices from mock data
      const enhancedPortfolio = portfolioData.map(holding => {
        const stockData = mockStocks.find(stock => stock.symbol === holding.symbol);
        const currentPrice = stockData?.price || holding.avg_price;
        const totalValue = holding.shares * currentPrice;
        const totalCost = holding.shares * holding.avg_price;
        const totalGain = totalValue - totalCost;
        const totalGainPercent = (totalGain / totalCost) * 100;
        
        return {
          id: holding.id,
          symbol: holding.symbol,
          name: holding.name,
          shares: holding.shares,
          avgPrice: holding.avg_price,
          currentPrice,
          totalValue,
          totalGain,
          totalGainPercent,
          changePercent: stockData?.changePercent || 0
        };
      });

      setPortfolio(enhancedPortfolio);
      setError(null);
    } catch (err) {
      setError('Failed to load portfolio');
      console.error('Portfolio loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToPortfolio = async (symbol: string, shares: number, price: number) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const stockData = mockStocks.find(stock => stock.symbol === symbol);
      if (!stockData) throw new Error('Stock not found');

      // Check if position already exists
      const existingPosition = portfolio.find(p => p.symbol === symbol);
      
      if (existingPosition) {
        // Update existing position
        const newShares = existingPosition.shares + shares;
        const newAvgPrice = ((existingPosition.shares * existingPosition.avgPrice) + (shares * price)) / newShares;
        
        await db.updatePortfolioPosition(user.id, symbol, {
          shares: newShares,
          avg_price: newAvgPrice,
          updated_at: new Date().toISOString()
        });
      } else {
        // Add new position
        await db.addToPortfolio(user.id, {
          symbol,
          name: stockData.name,
          shares,
          avgPrice: price
        });
      }

      // Record transaction
      await db.addTransaction(user.id, {
        symbol,
        type: 'buy',
        quantity: shares,
        price,
        total: shares * price
      });

      await loadPortfolio();
    } catch (err) {
      throw new Error('Failed to add to portfolio');
    }
  };

  const sellFromPortfolio = async (symbol: string, shares: number, price: number) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const existingPosition = portfolio.find(p => p.symbol === symbol);
      if (!existingPosition) throw new Error('Position not found');
      
      if (shares > existingPosition.shares) {
        throw new Error('Cannot sell more shares than owned');
      }

      const newShares = existingPosition.shares - shares;
      
      if (newShares === 0) {
        // Remove position entirely
        await db.removeFromPortfolio(user.id, symbol);
      } else {
        // Update position
        await db.updatePortfolioPosition(user.id, symbol, {
          shares: newShares,
          updated_at: new Date().toISOString()
        });
      }

      // Record transaction
      await db.addTransaction(user.id, {
        symbol,
        type: 'sell',
        quantity: shares,
        price,
        total: shares * price
      });

      await loadPortfolio();
    } catch (err) {
      throw new Error('Failed to sell from portfolio');
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, [user]);

  const totalValue = portfolio.reduce((sum, holding) => sum + holding.totalValue, 0);
  const totalGain = portfolio.reduce((sum, holding) => sum + holding.totalGain, 0);
  const totalGainPercent = totalValue > 0 ? (totalGain / (totalValue - totalGain)) * 100 : 0;

  return {
    portfolio,
    loading,
    error,
    totalValue,
    totalGain,
    totalGainPercent,
    addToPortfolio,
    sellFromPortfolio,
    refreshPortfolio: loadPortfolio
  };
}