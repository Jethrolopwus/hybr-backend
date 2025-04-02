import React from 'react';

interface TeamData {
  team: string;
  score: number;
  projectsCount: number;
  ideasGenerated: number;
}

interface TeamPerformanceProps {
  data: TeamData[];
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({ data }) => {
  // Sort teams by score in descending order
  const sortedData = [...data].sort((a, b) => b.score - a.score);
  
  return (
    <div>
      {sortedData.map((team, index) => (
        <div key={team.team} className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{team.team}</span>
            <span className="text-sm font-medium">{team.score.toFixed(1)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${index === 0 ? 'bg-indigo-600' : 'bg-indigo-400'}`} 
              style={{ width: `${team.score * 10}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{team.projectsCount} projects</span>
            <span>{team.ideasGenerated} ideas generated</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamPerformance;