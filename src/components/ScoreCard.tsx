import React from 'react';

interface InnovationScoreCardProps {
  score: number;
  change: number;
}

const InnovationScoreCard: React.FC<InnovationScoreCardProps> = ({ score, change }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-2">Overall Innovation Index</h2>
      <div className="flex items-end">
        <div className="text-5xl font-bold">{score.toFixed(1)}</div>
        <div className={`ml-4 flex items-center ${change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
          <span className="text-xl font-medium">
            {change >= 0 ? '+' : ''}{change.toFixed(1)}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            {change >= 0 ? (
              <path 
                fillRule="evenodd" 
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            ) : (
              <path 
                fillRule="evenodd" 
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            )}
          </svg>
        </div>
      </div>
      <p className="text-sm mt-2 text-indigo-100">From previous {change >= 0 ? 'period' : 'period'}</p>
    </div>
  );
};

export default InnovationScoreCard;