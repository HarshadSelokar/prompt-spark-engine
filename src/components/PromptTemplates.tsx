
import React from 'react';
import { usePrompt } from '@/contexts/PromptContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface PromptTemplatesProps {
  onSelectTemplate: (template: string) => void;
}

const PromptTemplates = ({ onSelectTemplate }: PromptTemplatesProps) => {
  const { templates } = usePrompt();
  const { toast } = useToast();

  const handleSelectTemplate = (template: string) => {
    onSelectTemplate(template);
    toast({
      title: 'Template Selected',
      description: 'The template has been loaded into the editor.',
    });
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Prompt Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="p-4">
            <h3 className="font-medium mb-2">{template.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{template.description}</p>
            <p className="text-xs text-gray-500 mb-3">Category: {template.category}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectTemplate(template.template)}
              className="w-full"
            >
              Use Template
            </Button>
          </Card>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default PromptTemplates;
