import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AssessmentResults, CategoryScore } from '@/types/generatedTypes';
import { RadarChartView, BarChartView } from '@/components/ResultsChart';
import { CATEGORIES } from '@/utils/questions';

const Results = () => {
  const router = useRouter();
  const { id } = router.query;
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'radar' | 'bar'>('radar');

  useEffect(() => {
    if (!id) return;

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/assessments/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        
        const data = await response.json();
        setResults(data.results);
      } catch (err) {
        setError('Unable to load assessment results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-600">{error || 'Assessment not found'}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Assessment Results | Innovation Index Toolkit</title>
        <meta name="description" content="Your innovation assessment results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Your Innovation Results</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your responses, here's how your organization is performing.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Overall Score</h2>
            <div className="text-3xl font-bold text-blue-600">
              {results.overallScore.toFixed(1)}/10
            </div>
          </div>
          
          <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600" 
              style={{ width: `${results.overallScore * 10}%` }}
            ></div>
          </div>
          
          <p className="mt-4 text-gray-700">
            {results.overallScore >= 8 ? (
              'Excellent! Your organization demonstrates strong innovation capabilities across multiple dimensions.'
            ) : results.overallScore >= 6 ? (
              'Good performance. Your organization has solid innovation foundations but has opportunities to strengthen specific areas.'
            ) : results.overallScore >= 4 ? (
              'Your organization shows some innovation capability but has significant room for improvement.'
            ) : (
              'Your organization is at an early stage of innovation maturity with substantial opportunity for development.'
            )}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dimension Scores</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setChartType('radar')}
                className={`px-3 py-1 rounded ${
                  chartType === 'radar' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Radar
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 rounded ${
                  chartType === 'bar' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Bar
              </button>
            </div>
          </div>
          
          {chartType === 'radar' ? (
            <RadarChartView results={results} />
          ) : (
            <BarChartView results={results} />
          )}
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(results.categoryScores).map(([key, score]) => (
              <div key={key} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">
                    {CATEGORIES[key as keyof typeof CATEGORIES]}
                  </h3>
                  <span className="font-medium">
                    {score.score.toFixed(1)}/{score.maxScore}
                  </span>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${score.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
          <div className="space-y-4">
            {results.recommendations.map((recommendation, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 mr-4"
          >
            Print Results
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default Results;
