
import React from 'react';
import { usePrompt } from '@/contexts/PromptContext';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsDashboard = () => {
  const { history } = usePrompt();

  const getAverageScore = () => {
    if (history.length === 0) return 0;
    return Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / history.length);
  };

  const getChartData = () => {
    return history.slice(-10).map(entry => ({
      date: new Date(entry.timestamp).toLocaleDateString(),
      score: entry.score
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Prompts</h3>
          <p className="text-2xl font-bold">{history.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
          <p className="text-2xl font-bold">{getAverageScore()}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Recent Prompts</h3>
          <p className="text-2xl font-bold">{history.slice(0, 10).length}</p>
        </Card>
      </div>
      
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Score Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getChartData()}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
