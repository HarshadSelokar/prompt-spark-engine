
import React, { createContext, useContext, useState } from 'react';

export interface PromptTemplate {
  id: string;
  title: string;
  template: string;
  category: string;
  description: string;
}

export interface PromptHistory {
  id: string;
  prompt: string;
  score: number;
  timestamp: Date;
  tags: string[];
  category: string;
}

interface PromptContextType {
  history: PromptHistory[];
  addToHistory: (entry: Omit<PromptHistory, 'id' | 'timestamp'>) => void;
  templates: PromptTemplate[];
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const defaultTemplates: PromptTemplate[] = [
  {
    id: '1',
    title: 'Research Analysis',
    template: 'Analyze the following research topic in detail: [TOPIC]. Include methodology, key findings, and implications.',
    category: 'Academic',
    description: 'Best for academic research analysis'
  },
  {
    id: '2',
    title: 'Creative Writing',
    template: 'Write a creative story about [SUBJECT] that incorporates themes of [THEME] and [THEME].',
    category: 'Creative',
    description: 'Ideal for story generation'
  },
  {
    id: '3',
    title: 'Technical Documentation',
    template: 'Create detailed technical documentation for [FEATURE], including setup instructions, usage examples, and common issues.',
    category: 'Technical',
    description: 'Perfect for technical writing'
  }
];

export function PromptProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<PromptHistory[]>([]);
  const [templates] = useState<PromptTemplate[]>(defaultTemplates);

  const addToHistory = (entry: Omit<PromptHistory, 'id' | 'timestamp'>) => {
    const newEntry: PromptHistory = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  return (
    <PromptContext.Provider value={{ history, addToHistory, templates }}>
      {children}
    </PromptContext.Provider>
  );
}

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error('usePrompt must be used within a PromptProvider');
  }
  return context;
};
