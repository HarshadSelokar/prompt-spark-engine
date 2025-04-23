
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImprovedPromptProps {
  originalPrompt: string;
  improvedPrompt: string;
  className?: string;
}

const ImprovedPrompt = ({ originalPrompt, improvedPrompt, className }: ImprovedPromptProps) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'improved'>('improved');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(improvedPrompt);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'side-by-side' ? 'improved' : 'side-by-side');
  };

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Improved Prompt</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleViewMode}
            className="text-xs"
          >
            <ArrowRightLeft className="h-3.5 w-3.5 mr-1" />
            {viewMode === 'side-by-side' ? 'Single View' : 'Compare View'}
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {viewMode === 'side-by-side' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
            <h3 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Original</h3>
            <div className="text-sm whitespace-pre-wrap">{originalPrompt}</div>
          </div>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-md p-4">
            <h3 className="text-sm font-medium mb-2 text-brand-600 dark:text-brand-400">Improved</h3>
            <div className="text-sm whitespace-pre-wrap">{improvedPrompt}</div>
          </div>
        </div>
      ) : (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-md p-4">
          <div className="text-sm whitespace-pre-wrap">{improvedPrompt}</div>
        </div>
      )}
    </div>
  );
};

export default ImprovedPrompt;
