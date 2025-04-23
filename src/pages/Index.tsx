
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptInput from '@/components/PromptInput';
import FeedbackPanel from '@/components/FeedbackPanel';
import ImprovedPrompt from '@/components/ImprovedPrompt';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { CriterionScore } from '@/components/EvaluationCriteria';

// Mock evaluation function - in a real app, this would call an API
const mockEvaluatePrompt = (prompt: string) => {
  return new Promise<{
    score: number;
    criteriaScores: CriterionScore[];
    feedback: Array<{ type: 'strength' | 'improvement' | 'suggestion'; text: string }>;
    improvedPrompt: string;
  }>((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Base score between 50-85 to make the demo interesting
      const baseScore = Math.floor(Math.random() * 35) + 50;
      
      // Create some mock criteria scores
      const clarity = Math.min(100, Math.max(0, baseScore + (Math.random() * 20 - 10)));
      const specificity = Math.min(100, Math.max(0, baseScore + (Math.random() * 20 - 10)));
      const completeness = Math.min(100, Math.max(0, baseScore + (Math.random() * 20 - 5)));
      const balance = Math.min(100, Math.max(0, baseScore + (Math.random() * 20 - 5)));
      
      // Calculate overall score
      const overallScore = Math.round((clarity + specificity + completeness + balance) / 4);

      // Generate some mock feedback based on the scores
      const feedback = [];
      
      // Strengths
      if (clarity > 70) feedback.push({ type: 'strength', text: 'Your prompt is clear and understandable.' });
      if (specificity > 70) feedback.push({ type: 'strength', text: 'You provided good specific details for the AI to work with.' });
      if (completeness > 70) feedback.push({ type: 'strength', text: 'Your prompt covers the essential aspects of the request.' });
      if (balance > 70) feedback.push({ type: 'strength', text: 'Your prompt has a good balance of direction without excessive constraints.' });
      if (prompt.length > 50) feedback.push({ type: 'strength', text: 'The length of your prompt provides enough context.' });

      // Improvements
      if (clarity < 70) feedback.push({ type: 'improvement', text: 'The prompt could be clearer about what you want to achieve.' });
      if (specificity < 70) feedback.push({ type: 'improvement', text: 'Consider adding more specific details to guide the AI.' });
      if (completeness < 70) feedback.push({ type: 'improvement', text: 'Your prompt may be missing some important context or requirements.' });
      if (balance < 70) feedback.push({ type: 'improvement', text: 'The prompt might be too constrained or too open-ended.' });
      if (prompt.length < 30) feedback.push({ type: 'improvement', text: 'Your prompt is quite short, which may limit the AI\'s understanding.' });
      
      // Suggestions (always add some suggestions)
      feedback.push({ type: 'suggestion', text: 'Consider specifying your target audience for more tailored responses.' });
      feedback.push({ type: 'suggestion', text: 'Including format preferences can help structure the AI\'s response.' });
      feedback.push({ type: 'suggestion', text: 'Adding context about why you need this information can improve relevance.' });

      // Generate improved prompt (simple mock enhancement)
      let improvedPrompt = prompt;
      if (prompt.trim().length > 0) {
        // Add some specificity
        if (specificity < 70) {
          improvedPrompt = `I need specific and detailed information about ${prompt}. Please include recent data and cite your sources.`;
        } else {
          improvedPrompt = `Please provide a comprehensive analysis of ${prompt}. Structure your response with clear headings and include relevant examples to illustrate key points. Target audience is professionals in the field who need actionable insights.`;
        }
      }

      resolve({
        score: overallScore,
        criteriaScores: [
          { name: 'Clarity', score: Math.round(clarity) },
          { name: 'Specificity', score: Math.round(specificity) },
          { name: 'Completeness', score: Math.round(completeness) },
          { name: 'Balance', score: Math.round(balance) }
        ],
        feedback,
        improvedPrompt
      });
    }, 1500); // 1.5 second delay to simulate API call
  });
};

const Index = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState<{
    score: number;
    criteriaScores: CriterionScore[];
    feedback: Array<{ type: 'strength' | 'improvement' | 'suggestion'; text: string }>;
    improvedPrompt: string;
  } | null>(null);

  const handleEvaluate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to evaluate.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const results = await mockEvaluatePrompt(prompt);
      setEvaluationResults(results);
      
      toast({
        title: "Evaluation complete",
        description: "Your prompt has been evaluated successfully.",
      });
    } catch (error) {
      console.error("Evaluation error:", error);
      toast({
        title: "Evaluation failed",
        description: "Something went wrong while evaluating your prompt.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 p-6 bg-gradient-to-r from-brand-50 to-blue-50 dark:from-brand-900/20 dark:to-blue-900/20 border-brand-200 dark:border-brand-700">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Intelligent Prompt Evaluator
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Analyze and optimize your prompts for better results with large language models. 
              Get a quality score, detailed feedback, and suggestions for improvement.
            </p>
          </Card>
          
          <div className="space-y-6">
            <PromptInput 
              prompt={prompt} 
              setPrompt={setPrompt} 
              onEvaluate={handleEvaluate}
              isLoading={isLoading}
            />
            
            {evaluationResults && (
              <div className="space-y-6 animate-fade-in">
                <FeedbackPanel 
                  score={evaluationResults.score}
                  feedback={evaluationResults.feedback}
                  criteriaScores={evaluationResults.criteriaScores}
                />
                
                <ImprovedPrompt 
                  originalPrompt={prompt}
                  improvedPrompt={evaluationResults.improvedPrompt}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
