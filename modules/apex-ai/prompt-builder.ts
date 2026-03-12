// Dynamic prompt generation

import { PromptTemplate } from './types';

export class PromptBuilder {
  private templates: Map<string, PromptTemplate>;

  constructor() {
    this.templates = new Map();
    this.initializeDefaultTemplates();
  }

  private initializeDefaultTemplates(): void {
    // Logistics prompts
    this.addTemplate({
      id: 'route-optimization',
      name: 'Route Optimization',
      template: `Analyze the following delivery routes and suggest optimizations:

Routes: {{routes}}
Current metrics: {{metrics}}
Constraints: {{constraints}}

Provide specific recommendations for route optimization.`,
      variables: ['routes', 'metrics', 'constraints'],
      category: 'logistics',
    });

    this.addTemplate({
      id: 'delivery-prediction',
      name: 'Delivery Time Prediction',
      template: `Predict delivery time for the following shipment:

Origin: {{origin}}
Destination: {{destination}}
Package details: {{packageDetails}}
Historical data: {{historicalData}}
Current conditions: {{conditions}}

Provide estimated delivery time with confidence level.`,
      variables: ['origin', 'destination', 'packageDetails', 'historicalData', 'conditions'],
      category: 'logistics',
    });

    // Analytics prompts
    this.addTemplate({
      id: 'data-analysis',
      name: 'Data Analysis',
      template: `Analyze the following data and provide insights:

Dataset: {{dataset}}
Metrics: {{metrics}}
Time period: {{timePeriod}}

Identify trends, anomalies, and actionable insights.`,
      variables: ['dataset', 'metrics', 'timePeriod'],
      category: 'analytics',
    });

    this.addTemplate({
      id: 'kpi-summary',
      name: 'KPI Summary',
      template: `Generate a summary of the following KPIs:

Metrics: {{metrics}}
Period: {{period}}
Targets: {{targets}}

Provide analysis of performance against targets and trends.`,
      variables: ['metrics', 'period', 'targets'],
      category: 'analytics',
    });

    // Automation prompts
    this.addTemplate({
      id: 'workflow-generation',
      name: 'Workflow Generation',
      template: `Generate a workflow for the following task:

Task description: {{taskDescription}}
Requirements: {{requirements}}
Resources: {{resources}}

Create a step-by-step workflow with conditions and error handling.`,
      variables: ['taskDescription', 'requirements', 'resources'],
      category: 'automation',
    });

    // General prompts
    this.addTemplate({
      id: 'general-query',
      name: 'General Query',
      template: `{{query}}`,
      variables: ['query'],
      category: 'general',
    });
  }

  addTemplate(template: PromptTemplate): void {
    this.templates.set(template.id, template);
  }

  getTemplate(id: string): PromptTemplate | undefined {
    return this.templates.get(id);
  }

  removeTemplate(id: string): void {
    this.templates.delete(id);
  }

  listTemplates(category?: string): PromptTemplate[] {
    const allTemplates = Array.from(this.templates.values());
    if (category) {
      return allTemplates.filter((t) => t.category === category);
    }
    return allTemplates;
  }

  buildPrompt(templateId: string, variables: Record<string, string>): string {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    // Check if all required variables are provided
    const missingVars = template.variables.filter((v) => !(v in variables));
    if (missingVars.length > 0) {
      throw new Error(`Missing variables: ${missingVars.join(', ')}`);
    }

    // Replace variables in template
    let prompt = template.template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      prompt = prompt.replace(regex, value);
    }

    return prompt;
  }

  buildCustomPrompt(template: string, variables: Record<string, string>): string {
    let prompt = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      prompt = prompt.replace(regex, value);
    }
    return prompt;
  }

  validateTemplate(template: string): { valid: boolean; variables: string[] } {
    const variableRegex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;

    while ((match = variableRegex.exec(template)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }

    return {
      valid: true,
      variables,
    };
  }

  createTemplateFromString(
    id: string,
    name: string,
    template: string,
    category?: string
  ): PromptTemplate {
    const validation = this.validateTemplate(template);
    const promptTemplate: PromptTemplate = {
      id,
      name,
      template,
      variables: validation.variables,
      category,
    };

    this.addTemplate(promptTemplate);
    return promptTemplate;
  }
}
