import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for database operations
export const db = {
  // Profile operations
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Portfolio operations
  async getPortfolio(userId: string) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async addToPortfolio(userId: string, stock: any) {
    const { data, error } = await supabase
      .from('portfolios')
      .upsert({
        user_id: userId,
        symbol: stock.symbol,
        name: stock.name,
        shares: stock.shares,
        avg_price: stock.avgPrice
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePortfolioPosition(userId: string, symbol: string, updates: any) {
    const { data, error } = await supabase
      .from('portfolios')
      .update(updates)
      .eq('user_id', userId)
      .eq('symbol', symbol)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removeFromPortfolio(userId: string, symbol: string) {
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('user_id', userId)
      .eq('symbol', symbol);
    
    if (error) throw error;
  },

  // Watchlist operations
  async getWatchlist(userId: string) {
    const { data, error } = await supabase
      .from('watchlists')
      .select('*')
      .eq('user_id', userId)
      .order('added_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async addToWatchlist(userId: string, symbol: string, name: string) {
    const { data, error } = await supabase
      .from('watchlists')
      .insert({
        user_id: userId,
        symbol,
        name
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removeFromWatchlist(userId: string, symbol: string) {
    const { error } = await supabase
      .from('watchlists')
      .delete()
      .eq('user_id', userId)
      .eq('symbol', symbol);
    
    if (error) throw error;
  },

  // Transaction operations
  async getTransactions(userId: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async addTransaction(userId: string, transaction: any) {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        symbol: transaction.symbol,
        type: transaction.type,
        quantity: transaction.quantity,
        price: transaction.price,
        total: transaction.total
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Alert operations
  async getAlerts(userId: string) {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async addAlert(userId: string, alert: any) {
    const { data, error } = await supabase
      .from('alerts')
      .insert({
        user_id: userId,
        symbol: alert.symbol,
        type: alert.type,
        target_value: alert.targetValue
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateAlert(alertId: string, updates: any) {
    const { data, error } = await supabase
      .from('alerts')
      .update(updates)
      .eq('id', alertId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // User preferences
  async getUserPreferences(userId: string) {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUserPreferences(userId: string, preferences: any) {
    const { data, error } = await supabase
      .from('user_preferences')
      .update(preferences)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};