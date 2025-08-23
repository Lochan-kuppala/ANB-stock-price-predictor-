import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { StockPrediction } from '../../types';
import { getPredictionClass, formatCurrency } from '../../utils/helpers';

interface StockPredictionProps {
  prediction: StockPrediction;
}

const StockPredictionComponent: React.FC<StockPredictionProps> = ({ prediction }) => {
  const predictionIcon = () => {
    switch (prediction.prediction) {
      case 'bullish':
        return <TrendingUp className="h-6 w-6 text-success-500" />;
      case 'bearish':
        return <TrendingDown className="h-6 w-6 text-error-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />;
    }
  };

  const timeframeText = () => {
    switch (prediction.timeframe) {
      case '1d':
        return 'Next 24 Hours';
      case '1w':
        return 'Next 7 Days';
      case '1m':
        return 'Next 30 Days';
      case '3m':
        return 'Next 3 Months';
      default:
        return 'Upcoming Period';
    }
  };

  const confidenceBar = () => {
    const percentage = prediction.confidence * 100;
    const colorClass = 
      percentage >= 80 ? 'bg-success-500' :
      percentage >= 60 ? 'bg-success-400' :
      percentage >= 40 ? 'bg-warning-500' :
      'bg-error-500';
    
    return (
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
        <div 
          className={`h-2 rounded-full ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Prediction</span>
          <span className={`text-sm ${getPredictionClass(prediction.prediction)}`}>
            {timeframeText()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            {predictionIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className={`text-lg font-semibold ${getPredictionClass(prediction.prediction)}`}>
                {prediction.prediction.charAt(0).toUpperCase() + prediction.prediction.slice(1)}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Confidence: {(prediction.confidence * 100).toFixed(0)}%
              </div>
            </div>
            
            {confidenceBar()}
            
            {prediction.targetPrice && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Target Price</p>
                <p className="text-xl font-semibold">{formatCurrency(prediction.targetPrice)}</p>
              </div>
            )}
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Key Factors:</p>
              <ul className="mt-2 space-y-2">
                {prediction.factors.map((factor, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockPredictionComponent;