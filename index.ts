export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  eps: number;
  high52Week: number;
  low52Week: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relatedSymbols: string[];
  imageUrl?: string;
}

export interface PortfolioStock {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  changePercent: number;
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  addedAt: string;
  alerts?: WatchlistAlert[];
}

export interface WatchlistAlert {
  id: string;
  type: 'price-above' | 'price-below' | 'percent-change' | 'volume-spike';
  value: number;
  triggered: boolean;
  createdAt: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  volume?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface TechnicalIndicator {
  name: string;
  value: number;
  signal?: 'buy' | 'sell' | 'neutral';
  description: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface StockPrediction {
  symbol: string;
  timeframe: '1d' | '1w' | '1m' | '3m';
  prediction: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  targetPrice?: number;
  factors: string[];
}

export interface TradeOrder {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  status: 'pending' | 'filled' | 'cancelled';
  quantity: number;
  price: number;
  total: number;
  createdAt: string;
  filledAt?: string;
}

export type TimeFrame = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y';