// Task scheduler

export interface ScheduledTask {
  id: string;
  name: string;
  schedule: {
    type: 'once' | 'recurring' | 'cron';
    datetime?: Date; // For 'once' type
    interval?: number; // For 'recurring' type (in milliseconds)
    cronExpression?: string; // For 'cron' type
  };
  action: () => Promise<void> | void;
  status: 'scheduled' | 'running' | 'completed' | 'failed' | 'cancelled';
  lastRun?: Date;
  nextRun?: Date;
  runCount: number;
  failureCount: number;
  retryPolicy?: {
    maxRetries: number;
    retryDelay: number; // in milliseconds
  };
}

export interface TaskExecution {
  taskId: string;
  startTime: Date;
  endTime?: Date;
  status: 'success' | 'failure';
  error?: string;
  result?: any;
}

export class Scheduler {
  private tasks: Map<string, ScheduledTask>;
  private executions: Map<string, TaskExecution[]>;
  private timers: Map<string, NodeJS.Timeout>;
  private isRunning: boolean;

  constructor() {
    this.tasks = new Map();
    this.executions = new Map();
    this.timers = new Map();
    this.isRunning = false;
  }

  scheduleTask(task: Omit<ScheduledTask, 'status' | 'runCount' | 'failureCount'>): string {
    const scheduledTask: ScheduledTask = {
      ...task,
      status: 'scheduled',
      runCount: 0,
      failureCount: 0,
    };

    // Calculate next run time
    scheduledTask.nextRun = this.calculateNextRun(scheduledTask);

    this.tasks.set(task.id, scheduledTask);
    this.executions.set(task.id, []);

    // Start scheduling if scheduler is running
    if (this.isRunning) {
      this.scheduleNextRun(task.id);
    }

    return task.id;
  }

  start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    // Schedule all tasks
    for (const taskId of Array.from(this.tasks.keys())) {
      this.scheduleNextRun(taskId);
    }
  }

  stop(): void {
    this.isRunning = false;

    // Clear all timers
    for (const timer of Array.from(this.timers.values())) {
      clearTimeout(timer);
    }
    this.timers.clear();
  }

  private scheduleNextRun(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (!task || task.status === 'cancelled') {
      return;
    }

    const now = new Date();
    const nextRun = task.nextRun;

    if (!nextRun) {
      return;
    }

    const delay = nextRun.getTime() - now.getTime();

    if (delay <= 0) {
      // Run immediately
      this.executeTask(taskId);
    } else {
      // Schedule for later
      const timer = setTimeout(() => {
        this.executeTask(taskId);
      }, delay);

      this.timers.set(taskId, timer);
    }
  }

  private async executeTask(taskId: string): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task || task.status === 'cancelled') {
      return;
    }

    const execution: TaskExecution = {
      taskId,
      startTime: new Date(),
      status: 'success',
    };

    task.status = 'running';
    task.lastRun = new Date();

    try {
      const result = await task.action();
      execution.result = result;
      execution.status = 'success';
      task.runCount++;
    } catch (error) {
      execution.status = 'failure';
      execution.error = error instanceof Error ? error.message : 'Unknown error';
      task.failureCount++;

      // Handle retry policy
      if (task.retryPolicy && task.failureCount < task.retryPolicy.maxRetries) {
        setTimeout(() => {
          this.executeTask(taskId);
        }, task.retryPolicy.retryDelay);
        return;
      } else {
        task.status = 'failed';
      }
    }

    execution.endTime = new Date();

    // Store execution
    const taskExecutions = this.executions.get(taskId) || [];
    taskExecutions.push(execution);
    this.executions.set(taskId, taskExecutions);

    // Update task status and schedule next run
    if (execution.status === 'success') {
      if (task.schedule.type === 'once') {
        task.status = 'completed';
      } else {
        task.status = 'scheduled';
        task.nextRun = this.calculateNextRun(task);
        if (this.isRunning) {
          this.scheduleNextRun(taskId);
        }
      }
    }
  }

  private calculateNextRun(task: ScheduledTask): Date | undefined {
    const now = new Date();

    switch (task.schedule.type) {
      case 'once':
        return task.schedule.datetime && task.schedule.datetime > now
          ? task.schedule.datetime
          : undefined;

      case 'recurring':
        if (!task.schedule.interval) {
          return undefined;
        }
        const nextRun = task.lastRun
          ? new Date(task.lastRun.getTime() + task.schedule.interval)
          : now;
        return nextRun;

      case 'cron':
        // Simple cron implementation (simplified)
        // In a real implementation, use a proper cron parser
        return new Date(now.getTime() + 60000); // Default to 1 minute

      default:
        return undefined;
    }
  }

  getTask(taskId: string): ScheduledTask | undefined {
    return this.tasks.get(taskId);
  }

  cancelTask(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    task.status = 'cancelled';

    // Clear timer if exists
    const timer = this.timers.get(taskId);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(taskId);
    }
  }

  removeTask(taskId: string): void {
    this.cancelTask(taskId);
    this.tasks.delete(taskId);
    this.executions.delete(taskId);
  }

  getTaskExecutions(taskId: string): TaskExecution[] {
    return this.executions.get(taskId) || [];
  }

  getAllTasks(): ScheduledTask[] {
    return Array.from(this.tasks.values());
  }

  getTasksByStatus(status: ScheduledTask['status']): ScheduledTask[] {
    return Array.from(this.tasks.values()).filter((t) => t.status === status);
  }

  getUpcomingTasks(limit: number = 10): ScheduledTask[] {
    const tasks = Array.from(this.tasks.values())
      .filter((t) => t.nextRun && t.status === 'scheduled')
      .sort((a, b) => {
        if (!a.nextRun || !b.nextRun) return 0;
        return a.nextRun.getTime() - b.nextRun.getTime();
      });

    return tasks.slice(0, limit);
  }

  getTaskStatistics(taskId: string): {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    successRate: number;
    averageDuration: number;
  } {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    const executions = this.executions.get(taskId) || [];
    const successfulRuns = executions.filter((e) => e.status === 'success').length;
    const failedRuns = executions.filter((e) => e.status === 'failure').length;
    const totalRuns = executions.length;

    const successRate = totalRuns > 0 ? (successfulRuns / totalRuns) * 100 : 0;

    const durations = executions
      .filter((e) => e.endTime)
      .map((e) => e.endTime!.getTime() - e.startTime.getTime());

    const averageDuration =
      durations.length > 0
        ? durations.reduce((sum, d) => sum + d, 0) / durations.length
        : 0;

    return {
      totalRuns,
      successfulRuns,
      failedRuns,
      successRate: Math.round(successRate * 100) / 100,
      averageDuration: Math.round(averageDuration),
    };
  }

  clearTasks(): void {
    this.stop();
    this.tasks.clear();
    this.executions.clear();
  }
}
