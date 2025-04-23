
import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: number;
  category?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ScoreDisplay = ({ 
  score, 
  category = "Overall", 
  size = 'lg',
  showLabel = true
}: ScoreDisplayProps) => {
  // Determine color based on score
  let color = 'text-red-500';
  if (score >= 80) color = 'text-green-500';
  else if (score >= 60) color = 'text-yellow-500';
  else if (score >= 40) color = 'text-orange-500';

  // Determine size
  const sizeClasses = {
    sm: 'h-16 w-16 text-xl',
    md: 'h-24 w-24 text-2xl',
    lg: 'h-32 w-32 text-3xl'
  };

  // Get appropriate text size class
  const textSizeClass = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  // Calculate circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (100 - score) / 100 * circumference;

  return (
    <div className={cn("flex flex-col items-center", showLabel ? "space-y-2" : "space-y-0")}>
      {showLabel && (
        <h3 className={`font-medium ${textSizeClass} text-gray-700 dark:text-gray-300`}>
          {category}
        </h3>
      )}
      <div className={cn("relative flex items-center justify-center rounded-full", sizeClasses[size])}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="stroke-gray-200 dark:stroke-gray-700"
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            className={cn("progress-circle", color)}
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </svg>
        <span className={cn("absolute font-semibold", color)}>{score}</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
