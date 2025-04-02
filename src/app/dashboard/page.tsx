"use client";
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { LineChart, BarChart } from '@/components/Charts';
import InnovationScoreCard from '@/components/ScoreCard';
import ProjectsList from '@/components/ProjectList';
import TeamPerformance from '@/components/TeamPerformance';
import MetricsFilter from '@/components/MetricFilter';
import { fetchDashboardData } from '@/utils/api';

interface DashboardData {
  overallScore: number;
  historicalScores: { period: string; score: number }[];
  keyMetrics: {
    ideaSubmissionRate: number;
    implementationRate: number;
    timeToImplementation: number;
    innovationROI: number;
  };
  topProjects: Array<{
    id: string;
    name: string;
    score: number;
    status: string;
    lead: string;
  }>;
  teamPerformance: Array<{
    team: string;
    score: number;
    projectsCount: number;
    ideasGenerated: number;
  }>;
}

const Dashboard: NextPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeframe, setTimeframe] = useState<string>('quarterly');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const dashboardData = await fetchDashboardData(timeframe) as DashboardData;
        setData(dashboardData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [timeframe]);

  if (loading) return <div className="flex justify-center p-12">Loading dashboard data...</div>;
  if (error) return <div className="text-red-600 p-6">{error}</div>;
  if (!data) return null;

  return (
    <>
      <Head>
        <title>Innovation Index Dashboard</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Innovation Index Dashboard</h1>
          <MetricsFilter currentTimeframe={timeframe} onTimeframeChange={setTimeframe} />
        </div>

        {/* Main Score Card */}
        <div className="mb-8">
          <InnovationScoreCard 
            score={data.overallScore} 
            change={data.historicalScores[data.historicalScores.length - 1].score - 
                   data.historicalScores[data.historicalScores.length - 2].score} 
          />
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Idea Submission Rate</h3>
            <p className="text-2xl font-bold">{data.keyMetrics.ideaSubmissionRate}/month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Implementation Rate</h3>
            <p className="text-2xl font-bold">{data.keyMetrics.implementationRate}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Time to Implementation</h3>
            <p className="text-2xl font-bold">{data.keyMetrics.timeToImplementation} days</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Innovation ROI</h3>
            <p className="text-2xl font-bold">{data.keyMetrics.innovationROI}x</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Historical Innovation Score</h2>
            <LineChart 
              data={data.historicalScores} 
              xKey="period" 
              yKey="score" 
              color="#4f46e5" 
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
            <TeamPerformance data={data.teamPerformance} />
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Top Innovation Projects</h2>
          <ProjectsList projects={data.topProjects} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;