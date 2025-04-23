
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onEvaluate: () => void;
  isLoading: boolean;
}

const PromptInput = ({ prompt, setPrompt, onEvaluate, isLoading }: PromptInputProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Your Prompt</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Enter the prompt you want to evaluate and optimize for large language models.
        </p>
      </div>
      <Textarea
        placeholder="Type your prompt here... (e.g., 'Write a comprehensive essay about climate change and its impact on global ecosystems')"
        className="min-h-[150px] mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex justify-end">
        <Button 
          onClick={onEvaluate} 
          disabled={isLoading || !prompt.trim()} 
          className="bg-brand-600 hover:bg-brand-700"
        >
          {isLoading ? (
            <>
              <span className="animate-pulse-light">Evaluating...</span>
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Evaluate Prompt
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
