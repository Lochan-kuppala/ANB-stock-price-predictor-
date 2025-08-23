import { 
  StockData, 
  NewsItem, 
  PortfolioStock, 
  WatchlistItem, 
  ChartDataPoint, 
  TechnicalIndicator,
  StockPrediction,
  TradeOrder
} from '../types';
import { addDays, subDays, format, subMonths, subMinutes } from 'date-fns';

// Mock popular stocks
export const mockStocks: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 187.68,
    change: 1.78,
    changePercent: 0.96,
    volume: 52643800,
    marketCap: 2910000000000,
    pe: 31.28,
    eps: 6.00,
    high52Week: 198.23,
    low52Week: 124.17
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 418.32,
    change: 5.32,
    changePercent: 1.29,
    volume: 32145600,
    marketCap: 3110000000000,
    pe: 36.94,
    eps: 11.32,
    high52Week: 430.82,
    low52Week: 271.12
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 177.00,
    change: -2.65,
    changePercent: -1.47,
    volume: 91234700,
    marketCap: 563100000000,
    pe: 51.14,
    eps: 3.46,
    high52Week: 299.29,
    low52Week: 138.80
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 178.32,
    change: 2.31,
    changePercent: 1.31,
    volume: 43215600,
    marketCap: 1840000000000,
    pe: 61.63,
    eps: 2.89,
    high52Week: 189.14,
    low52Week: 118.35
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 887.89,
    change: 12.43,
    changePercent: 1.42,
    volume: 37689200,
    marketCap: 2190000000000,
    pe: 74.32,
    eps: 11.94,
    high52Week: 974.00,
    low52Week: 204.21
  },
  {
    symbol: 'GOOG',
    name: 'Alphabet Inc.',
    price: 155.72,
    change: -0.28,
    changePercent: -0.18,
    volume: 21345600,
    marketCap: 1930000000000,
    pe: 23.89,
    eps: 6.52,
    high52Week: 163.31,
    low52Week: 102.63
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 473.28,
    change: 6.43,
    changePercent: 1.38,
    volume: 19876500,
    marketCap: 1210000000000,
    pe: 27.16,
    eps: 17.43,
    high52Week: 531.49,
    low52Week: 244.61
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    price: 628.98,
    change: -3.24,
    changePercent: -0.51,
    volume: 8765400,
    marketCap: 274000000000,
    pe: 43.72,
    eps: 14.39,
    high52Week: 639.00,
    low52Week: 344.14
  }
];

// Mock news data
export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Apple Announces New MacBook Pro with M3 Chip',
    source: 'Bloomberg',
    url: '#',
    publishedAt: '2023-05-15T09:30:00Z',
    summary: 'Apple Inc. has unveiled its latest MacBook Pro lineup featuring the new M3 chip, promising significant performance improvements and enhanced battery life.',
    sentiment: 'positive',
    relatedSymbols: ['AAPL'],
    imageUrl: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    title: 'Tesla Faces Production Challenges in Berlin Factory',
    source: 'Reuters',
    url: '#',
    publishedAt: '2023-05-14T18:45:00Z',
    summary: 'Tesla is experiencing production delays at its Berlin Gigafactory due to supply chain issues and regulatory hurdles, potentially impacting its European delivery targets.',
    sentiment: 'negative',
    relatedSymbols: ['TSLA'],
    imageUrl: 'https://images.pexels.com/photos/11591876/pexels-photo-11591876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    title: 'Microsoft Expands Azure AI Services Amid Strong Cloud Growth',
    source: 'TechCrunch',
    url: '#',
    publishedAt: '2023-05-14T12:15:00Z',
    summary: 'Microsoft has announced an expansion of its Azure AI services as cloud revenue continues to grow, positioning the company to capitalize on the increasing demand for AI infrastructure.',
    sentiment: 'positive',
    relatedSymbols: ['MSFT'],
    imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    title: 'NVIDIA Stock Surges on AI Chip Demand',
    source: 'Wall Street Journal',
    url: '#',
    publishedAt: '2023-05-13T21:30:00Z',
    summary: 'NVIDIA shares reached an all-time high today as demand for AI chips continues to outpace supply, with the company maintaining its dominant position in the GPU market.',
    sentiment: 'positive',
    relatedSymbols: ['NVDA'],
    imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    title: 'Amazon Announces Layoffs in AWS Division',
    source: 'CNBC',
    url: '#',
    publishedAt: '2023-05-13T15:20:00Z',
    summary: 'Amazon has announced a round of layoffs affecting its AWS division as part of ongoing cost-cutting measures, despite the cloud service provider continuing to generate significant revenue.',
    sentiment: 'negative',
    relatedSymbols: ['AMZN'],
    imageUrl: 'https://images.pexels.com/photos/3731619/pexels-photo-3731619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    title: 'Meta\'s Reality Labs Division Reports Increased Losses',
    source: 'The Verge',
    url: '#',
    publishedAt: '2023-05-12T22:45:00Z',
    summary: 'Meta\'s Reality Labs division, responsible for metaverse and AR/VR development, reported increased quarterly losses, raising questions about the timeline for profitability of the company\'s significant investments.',
    sentiment: 'negative',
    relatedSymbols: ['META'],
    imageUrl: 'https://images.pexels.com/photos/7775636/pexels-photo-7775636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock portfolio data
export const mockPortfolio: PortfolioStock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 15,
    avgPrice: 175.32,
    currentPrice: 187.68,
    changePercent: 0.96,
    totalValue: 2815.20,
    totalGain: 185.40,
    totalGainPercent: 7.05
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 8,
    avgPrice: 380.45,
    currentPrice: 418.32,
    changePercent: 1.29,
    totalValue: 3346.56,
    totalGain: 302.96,
    totalGainPercent: 9.95
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    shares: 5,
    avgPrice: 700.21,
    currentPrice: 887.89,
    changePercent: 1.42,
    totalValue: 4439.45,
    totalGain: 938.40,
    totalGainPercent: 26.81
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    shares: 12,
    avgPrice: 160.76,
    currentPrice: 178.32,
    changePercent: 1.31,
    totalValue: 2139.84,
    totalGain: 210.72,
    totalGainPercent: 10.92
  }
];

// Mock watchlist data
export const mockWatchlist: WatchlistItem[] = [
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 177.00,
    change: -2.65,
    changePercent: -1.47,
    addedAt: '2023-04-10T12:00:00Z'
  },
  {
    symbol: 'GOOG',
    name: 'Alphabet Inc.',
    price: 155.72,
    change: -0.28,
    changePercent: -0.18,
    addedAt: '2023-04-12T09:15:00Z'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 473.28,
    change: 6.43,
    changePercent: 1.38,
    addedAt: '2023-04-15T14:30:00Z'
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    price: 628.98,
    change: -3.24,
    changePercent: -0.51,
    addedAt: '2023-04-18T16:45:00Z'
  }
];

// Generate historical price data for charts
function generateHistoricalData(basePrice: number, volatility: number, days: number): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  let currentPrice = basePrice;
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i);
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = Math.max(currentPrice + change, 1); // Ensure price doesn't go below 1
    
    const volume = Math.floor(Math.random() * 10000000) + 5000000;
    const open = currentPrice - (Math.random() * 2);
    const close = currentPrice;
    const high = Math.max(open, close) + (Math.random() * 2);
    const low = Math.min(open, close) - (Math.random() * 2);
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      value: parseFloat(currentPrice.toFixed(2)),
      volume,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2))
    });
  }
  
  return data;
}

export const mockHistoricalData: Record<string, ChartDataPoint[]> = {
  'AAPL': generateHistoricalData(185, 3, 180),
  'MSFT': generateHistoricalData(415, 5, 180),
  'TSLA': generateHistoricalData(180, 8, 180),
  'AMZN': generateHistoricalData(175, 4, 180),
  'NVDA': generateHistoricalData(850, 15, 180),
  'GOOG': generateHistoricalData(156, 3, 180),
  'META': generateHistoricalData(470, 6, 180),
  'NFLX': generateHistoricalData(630, 7, 180)
};

// Mock technical indicators
export const mockTechnicalIndicators: Record<string, TechnicalIndicator[]> = {
  'AAPL': [
    { name: 'RSI', value: 62.5, signal: 'neutral', description: 'Relative Strength Index measures momentum on a scale of 0 to 100.' },
    { name: 'MACD', value: 1.82, signal: 'buy', description: 'Moving Average Convergence Divergence is a trend-following momentum indicator.' },
    { name: 'SMA 50', value: 182.34, signal: 'buy', description: '50-day Simple Moving Average.' },
    { name: 'SMA 200', value: 174.21, signal: 'buy', description: '200-day Simple Moving Average.' },
    { name: 'Bollinger Bands', value: 0.72, signal: 'neutral', description: 'Bollinger Bands indicate volatility with upper and lower bands.' }
  ],
  'MSFT': [
    { name: 'RSI', value: 58.3, signal: 'neutral', description: 'Relative Strength Index measures momentum on a scale of 0 to 100.' },
    { name: 'MACD', value: 2.15, signal: 'buy', description: 'Moving Average Convergence Divergence is a trend-following momentum indicator.' },
    { name: 'SMA 50', value: 410.76, signal: 'buy', description: '50-day Simple Moving Average.' },
    { name: 'SMA 200', value: 385.93, signal: 'buy', description: '200-day Simple Moving Average.' },
    { name: 'Bollinger Bands', value: 0.65, signal: 'neutral', description: 'Bollinger Bands indicate volatility with upper and lower bands.' }
  ],
  'TSLA': [
    { name: 'RSI', value: 42.1, signal: 'neutral', description: 'Relative Strength Index measures momentum on a scale of 0 to 100.' },
    { name: 'MACD', value: -1.35, signal: 'sell', description: 'Moving Average Convergence Divergence is a trend-following momentum indicator.' },
    { name: 'SMA 50', value: 182.45, signal: 'sell', description: '50-day Simple Moving Average.' },
    { name: 'SMA 200', value: 195.72, signal: 'sell', description: '200-day Simple Moving Average.' },
    { name: 'Bollinger Bands', value: 0.28, signal: 'sell', description: 'Bollinger Bands indicate volatility with upper and lower bands.' }
  ]
};

// Mock predictions
export const mockPredictions: Record<string, StockPrediction> = {
  'AAPL': {
    symbol: 'AAPL',
    timeframe: '1w',
    prediction: 'bullish',
    confidence: 0.85,
    targetPrice: 195.50,
    factors: [
      'Strong product launch cycle',
      'Positive earnings momentum',
      'Increasing services revenue',
      'Technical indicators showing upward momentum'
    ]
  },
  'MSFT': {
    symbol: 'MSFT',
    timeframe: '1m',
    prediction: 'bullish',
    confidence: 0.92,
    targetPrice: 435.00,
    factors: [
      'Cloud revenue growth exceeding expectations',
      'AI integration driving Azure adoption',
      'Strong institutional buying',
      'Positive analyst upgrades'
    ]
  },
  'TSLA': {
    symbol: 'TSLA',
    timeframe: '1w',
    prediction: 'bearish',
    confidence: 0.68,
    targetPrice: 165.00,
    factors: [
      'Production challenges in key markets',
      'Increasing competition in EV space',
      'Margin pressure from price cuts',
      'Technical breakdown below support levels'
    ]
  }
};

// Mock trade orders
export const mockTradeOrders: TradeOrder[] = [
  {
    id: '1',
    symbol: 'AAPL',
    type: 'buy',
    status: 'filled',
    quantity: 5,
    price: 185.43,
    total: 927.15,
    createdAt: format(subDays(new Date(), 5), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    filledAt: format(subDays(new Date(), 5), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: '2',
    symbol: 'NVDA',
    type: 'buy',
    status: 'filled',
    quantity: 2,
    price: 845.67,
    total: 1691.34,
    createdAt: format(subDays(new Date(), 3), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    filledAt: format(subDays(new Date(), 3), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: '3',
    symbol: 'TSLA',
    type: 'sell',
    status: 'filled',
    quantity: 10,
    price: 195.32,
    total: 1953.20,
    createdAt: format(subDays(new Date(), 2), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    filledAt: format(subDays(new Date(), 2), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: '4',
    symbol: 'MSFT',
    type: 'buy',
    status: 'pending',
    quantity: 3,
    price: 415.00,
    total: 1245.00,
    createdAt: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  }
];

// Mock chat messages
export const mockChatMessages = [
  {
    id: '1',
    content: 'What is the outlook for AAPL stock?',
    role: 'user',
    timestamp: format(subMinutes(new Date(), 30), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: '2',
    content: 'Based on recent analysis, Apple (AAPL) shows a bullish outlook for the next week with 85% confidence. Technical indicators like MACD are signaling buy, and the price is above both 50-day and 200-day moving averages. The company\'s strong product cycle and increasing services revenue are positive factors. A potential target price of $195.50 represents approximately 4.2% upside from the current price.',
    role: 'assistant',
    timestamp: format(subMinutes(new Date(), 29), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: '3',
    content: 'Should I sell my Tesla shares?',
    role: 'user',
    timestamp: format(subMinutes(new Date(), 15), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: '4',
    content: 'Tesla (TSLA) currently shows bearish signals with a 68% confidence level for the coming week. The stock is trading below both its 50-day and 200-day moving averages, with MACD indicating a sell signal. The company faces production challenges and increasing competition in the EV market. Additionally, margin pressure from recent price cuts is concerning. Consider your investment timeframe and risk tolerance - if you\'re a long-term investor, short-term volatility might be less important, but for shorter timeframes, the technical signals suggest caution.',
    role: 'assistant',
    timestamp: format(subMinutes(new Date(), 14), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  }
];