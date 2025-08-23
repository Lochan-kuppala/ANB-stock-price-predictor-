import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { TechnicalIndicator } from '../../types';
import { getSignalClass } from '../../utils/helpers';
import { Info } from 'lucide-react';

interface TechnicalIndicatorsProps {
  indicators: TechnicalIndicator[];
}

const TechnicalIndicators: React.FC<TechnicalIndicatorsProps> = ({ indicators }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {indicators.map((indicator, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-dark-200"
            >
              <div className="flex items-center">
                <div className="group relative">
                  <h3 className="text-sm font-medium flex items-center">
                    {indicator.name}
                    <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                  </h3>
                  <div className="absolute left-0 bottom-full mb-2 w-60 rounded-md bg-white dark:bg-dark-100 p-3 shadow-lg text-xs invisible group-hover:visible z-10">
                    {indicator.description}
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {typeof indicator.value === 'number' ? indicator.value.toFixed(2) : indicator.value}
                </p>
              </div>
              
              {indicator.signal && (
                <div className={`text-sm font-medium ${getSignalClass(indicator.signal)}`}>
                  {indicator.signal.toUpperCase()}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalIndicators;