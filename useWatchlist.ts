import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';
import { mockStocks } from '../utils/mockData';

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  addedAt: string;
}

export function useWatchlist() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWatchlist = async () => {
    if (!user) {
      setWatchlist([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const watchlistData = await db.getWatchlist(user.id);
      
      // Enhance watchlist data with current prices from mock data
      const enhancedWatchlist = watchlistData.map(item => {
        const stockData = mockStocks.find(stock => stock.symbol === item.symbol);
        
        return {
          id: item.id,
          symbol: item.symbol,
          name: item.name,
          price: stockData?.price || 0,
          change: stockData?.change || 0,
          changePercent: stockData?.changePercent || 0,
          addedAt: item.added_at
        };
      });

      setWatchlist(enhancedWatchlist);
      setError(null);
    } catch (err) {
      setError('Failed to load watchlist');
      console.error('Watchlist loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async (symbol: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const stockData = mockStocks.find(stock => stock.symbol === symbol);
      if (!stockData) throw new Error('Stock not found');

      // Check if already in watchlist
      const exists = watchlist.find(item => item.symbol === symbol);
      if (exists) throw new Error('Stock already in watchlist');

      await db.addToWatchlist(user.id, symbol, stockData.name);
      await loadWatchlist();
    } catch (err) {
      throw err;
    }
  };

  const removeFromWatchlist = async (symbol: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      await db.removeFromWatchlist(user.id, symbol);
      await loadWatchlist();
    } catch (err) {
      throw new Error('Failed to remove from watchlist');
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, [user]);

  return {
    watchlist,
    loading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    refreshWatchlist: loadWatchlist
  };
}