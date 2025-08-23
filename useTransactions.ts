import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';

export interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async () => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const transactionData = await db.getTransactions(user.id);
      
      const formattedTransactions = transactionData.map(transaction => ({
        id: transaction.id,
        symbol: transaction.symbol,
        type: transaction.type,
        quantity: transaction.quantity,
        price: transaction.price,
        total: transaction.total,
        status: transaction.status,
        createdAt: transaction.created_at
      }));

      setTransactions(formattedTransactions);
      setError(null);
    } catch (err) {
      setError('Failed to load transactions');
      console.error('Transactions loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [user]);

  return {
    transactions,
    loading,
    error,
    refreshTransactions: loadTransactions
  };
}