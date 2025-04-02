import React from 'react';

interface MetricsFilterProps {
  currentTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const MetricsFilter: React.FC<MetricsFilterProps> = ({ currentTimeframe, onTimeframeChange }) => {
  const timeframes = ['monthly', 'quarterly', 'yearly'];
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Timeframe:</span>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            type="button"
            className={`px-4 py-2 text-sm font-medium border ${
              currentTimeframe === timeframe
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } ${
              timeframe === 'monthly' ? 'rounded-l-md' : ''
            } ${
              timeframe === 'yearly' ? 'rounded-r-md' : ''
            }`}
            onClick={() => onTimeframeChange(timeframe)}
          >
            {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MetricsFilter;