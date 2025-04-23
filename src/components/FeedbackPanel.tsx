
import React from 'react';
import { AlertTriangle, Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScoreDisplay from './ScoreDisplay';
import EvaluationCriteria, { CriterionScore } from './EvaluationCriteria';

interface FeedbackItem {
  type: 'strength' | 'improvement' | 'suggestion';
  text: string;
}

interface FeedbackPanelProps {
  score: number;
  feedback: FeedbackItem[];
  criteriaScores: CriterionScore[];
}

const FeedbackPanel = ({ score, feedback, criteriaScores }: FeedbackPanelProps) => {
  // Group feedback by type
  const strengths = feedback.filter(item => item.type === 'strength');
  const improvements = feedback.filter(item => item.type === 'improvement');
  const suggestions = feedback.filter(item => item.type === 'suggestion');

  // Get qualitative rating
  const getRating = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Above Average';
    if (score >= 50) return 'Average';
    if (score >= 40) return 'Below Average';
    if (score >= 30) return 'Poor';
    return 'Very Poor';
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Prompt Evaluation</h2>
        
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
          <div className="flex-shrink-0 flex flex-col items-center">
            <ScoreDisplay score={score} />
            <span className="mt-2 font-medium text-lg">{getRating(score)}</span>
          </div>
          
          <div className="flex-grow">
            <EvaluationCriteria criteriaScores={criteriaScores} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <FeedbackSection 
            title="Strengths" 
            items={strengths} 
            icon={<Check className="h-5 w-5 text-green-500" />}
            bgColor="bg-green-50 dark:bg-green-900/20"
            borderColor="border-green-200 dark:border-green-800"
          />
          
          <FeedbackSection 
            title="Areas for Improvement" 
            items={improvements} 
            icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
            bgColor="bg-orange-50 dark:bg-orange-900/20"
            borderColor="border-orange-200 dark:border-orange-800"
          />
          
          <FeedbackSection 
            title="Suggestions" 
            items={suggestions} 
            icon={<Info className="h-5 w-5 text-blue-500" />}
            bgColor="bg-blue-50 dark:bg-blue-900/20"
            borderColor="border-blue-200 dark:border-blue-800"
          />
        </div>
      </div>
    </div>
  );
};

interface FeedbackSectionProps {
  title: string;
  items: FeedbackItem[];
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
}

const FeedbackSection = ({ title, items, icon, bgColor, borderColor }: FeedbackSectionProps) => {
  return (
    <div className={cn("rounded-lg border p-4", borderColor, bgColor)}>
      <h3 className="font-semibold flex items-center gap-2 mb-3">
        {icon} {title}
      </h3>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm">
              • {item.text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No {title.toLowerCase()} identified.
        </p>
      )}
    </div>
  );
};

export default FeedbackPanel;
