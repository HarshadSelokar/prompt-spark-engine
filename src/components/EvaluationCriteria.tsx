
import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CriterionScore {
  name: string;
  score: number;
}

interface EvaluationCriteriaProps {
  criteriaScores: CriterionScore[];
}

const EvaluationCriteria = ({ criteriaScores }: EvaluationCriteriaProps) => {
  const getIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (score >= 60) return <Info className="w-5 h-5 text-yellow-500" />;
    if (score >= 40) return <HelpCircle className="w-5 h-5 text-orange-500" />;
    return <AlertCircle className="w-5 h-5 text-red-500" />;
  };

  const getScoreClass = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Evaluation Criteria</h3>
      <div className="space-y-3">
        {criteriaScores.map((criterion) => (
          <div key={criterion.name} className="flex items-center">
            <div className="mr-3">
              {getIcon(criterion.score)}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {criterion.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {criterion.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={cn("h-2 rounded-full", getScoreClass(criterion.score))}
                  style={{ width: `${criterion.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluationCriteria;
