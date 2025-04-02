import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';
import { AssessmentResults, CategoryScore } from '@/types/generatedTypes';
import { CATEGORIES } from '../utils/questions';

interface ResultsChartProps {
  results: AssessmentResults;
}

export const RadarChartView: React.FC<ResultsChartProps> = ({ results }) => {
  const data = Object.entries(results.categoryScores).map(([key, value]) => ({
    category: CATEGORIES[key as keyof typeof CATEGORIES],
    score: value.percentage
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="#2563EB"
            fill="#3B82F6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BarChartView: React.FC<ResultsChartProps> = ({ results }) => {
  const data = Object.entries(results.categoryScores).map(([key, value]) => ({
    category: CATEGORIES[key as keyof typeof CATEGORIES],
    score: value.score,
    maxScore: value.maxScore
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#3B82F6" name="Your Score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
