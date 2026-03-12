// Workflow automation system

export type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'paused';

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'action' | 'condition' | 'loop' | 'delay';
  config: Record<string, any>;
  onSuccess?: string; // Next step ID
  onFailure?: string; // Error handler step ID
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStep[];
  status: WorkflowStatus;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  currentStep?: string;
  variables: Record<string, any>;
}

export interface WorkflowExecution {
  workflowId: string;
  stepResults: Array<{
    stepId: string;
    status: 'success' | 'failure' | 'skipped';
    result?: any;
    error?: string;
    timestamp: Date;
  }>;
}

export class WorkflowEngine {
  private workflows: Map<string, Workflow>;
  private executions: Map<string, WorkflowExecution>;

  constructor() {
    this.workflows = new Map();
    this.executions = new Map();
  }

  createWorkflow(
    id: string,
    name: string,
    steps: WorkflowStep[],
    description?: string
  ): Workflow {
    const workflow: Workflow = {
      id,
      name,
      description,
      steps,
      status: 'pending',
      createdAt: new Date(),
      variables: {},
    };

    this.workflows.set(id, workflow);
    return workflow;
  }

  getWorkflow(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  async executeWorkflow(workflowId: string, initialVariables?: Record<string, any>): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    if (workflow.status === 'running') {
      throw new Error(`Workflow is already running: ${workflowId}`);
    }

    // Initialize execution
    workflow.status = 'running';
    workflow.startedAt = new Date();
    workflow.variables = { ...workflow.variables, ...initialVariables };

    const execution: WorkflowExecution = {
      workflowId,
      stepResults: [],
    };
    this.executions.set(workflowId, execution);

    try {
      // Execute steps sequentially
      for (let i = 0; i < workflow.steps.length; i++) {
        const step = workflow.steps[i];
        workflow.currentStep = step.id;

        try {
          const result = await this.executeStep(step, workflow.variables);
          execution.stepResults.push({
            stepId: step.id,
            status: 'success',
            result,
            timestamp: new Date(),
          });

          // Handle conditional branching
          if (step.onSuccess) {
            const nextStepIndex = workflow.steps.findIndex((s) => s.id === step.onSuccess);
            if (nextStepIndex !== -1) {
              i = nextStepIndex - 1; // -1 because loop will increment
              continue;
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          execution.stepResults.push({
            stepId: step.id,
            status: 'failure',
            error: errorMessage,
            timestamp: new Date(),
          });

          // Handle error branching
          if (step.onFailure) {
            const errorStepIndex = workflow.steps.findIndex((s) => s.id === step.onFailure);
            if (errorStepIndex !== -1) {
              i = errorStepIndex - 1;
              continue;
            }
          }

          // If no error handler, fail the workflow
          throw error;
        }
      }

      workflow.status = 'completed';
      workflow.completedAt = new Date();
    } catch (error) {
      workflow.status = 'failed';
      workflow.completedAt = new Date();
      throw new Error(
        `Workflow execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async executeStep(step: WorkflowStep, variables: Record<string, any>): Promise<any> {
    switch (step.type) {
      case 'action':
        return this.executeAction(step, variables);
      case 'condition':
        return this.evaluateCondition(step, variables);
      case 'delay':
        return this.executeDelay(step);
      case 'loop':
        return this.executeLoop(step, variables);
      default:
        throw new Error(`Unknown step type: ${step.type}`);
    }
  }

  private async executeAction(
    step: WorkflowStep,
    variables: Record<string, any>
  ): Promise<any> {
    // Simulate action execution
    // In a real implementation, this would call external services or APIs
    const action = step.config.action;
    const params = this.resolveVariables(step.config.params, variables);

    // Example actions
    if (action === 'log') {
      console.log('Workflow log:', params);
      return { logged: true };
    }

    if (action === 'setVariable') {
      variables[params.name] = params.value;
      return { set: true };
    }

    if (action === 'calculate') {
      const result = this.evaluateExpression(params.expression, variables);
      return { result };
    }

    return { executed: true, action, params };
  }

  private evaluateCondition(step: WorkflowStep, variables: Record<string, any>): boolean {
    const condition = step.config.condition;
    return this.evaluateExpression(condition, variables);
  }

  private async executeDelay(step: WorkflowStep): Promise<void> {
    const delayMs = step.config.duration || 1000;
    return new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  private async executeLoop(step: WorkflowStep, variables: Record<string, any>): Promise<any> {
    const iterations = step.config.iterations || 1;
    const results = [];

    for (let i = 0; i < iterations; i++) {
      variables.loopIndex = i;
      results.push({ iteration: i });
    }

    return results;
  }

  private resolveVariables(obj: any, variables: Record<string, any>): any {
    if (typeof obj === 'string') {
      // Replace {{variable}} with actual value
      return obj.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] || '');
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.resolveVariables(item, variables));
    }

    if (typeof obj === 'object' && obj !== null) {
      const resolved: Record<string, any> = {};
      for (const [key, value] of Object.entries(obj)) {
        resolved[key] = this.resolveVariables(value, variables);
      }
      return resolved;
    }

    return obj;
  }

  private evaluateExpression(expression: string, variables: Record<string, any>): any {
    // Simple expression evaluation
    // In a real implementation, use a proper expression parser
    try {
      const resolved = this.resolveVariables(expression, variables);
      // For safety, only allow simple comparisons
      if (resolved.includes('>') || resolved.includes('<') || resolved.includes('==')) {
        return eval(resolved);
      }
      return resolved;
    } catch (error) {
      return false;
    }
  }

  pauseWorkflow(workflowId: string): void {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    if (workflow.status === 'running') {
      workflow.status = 'paused';
    }
  }

  resumeWorkflow(workflowId: string): void {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    if (workflow.status === 'paused') {
      workflow.status = 'running';
      // In a real implementation, resume execution from current step
    }
  }

  getExecution(workflowId: string): WorkflowExecution | undefined {
    return this.executions.get(workflowId);
  }

  getAllWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }

  getWorkflowsByStatus(status: WorkflowStatus): Workflow[] {
    return Array.from(this.workflows.values()).filter((w) => w.status === status);
  }

  deleteWorkflow(workflowId: string): void {
    this.workflows.delete(workflowId);
    this.executions.delete(workflowId);
  }

  clearWorkflows(): void {
    this.workflows.clear();
    this.executions.clear();
  }
}
