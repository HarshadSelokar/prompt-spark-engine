
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-brand-600" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Prompt Spark</h1>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Intelligent Prompt Evaluator
        </div>
      </div>
    </header>
  );
};

export default Header;
