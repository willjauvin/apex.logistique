// KPI tracking system

export interface Metric {
  id: string;
  name: string;
  value: number;
  target?: number;
  unit: string;
  category: 'performance' | 'quality' | 'efficiency' | 'financial' | 'customer';
  timestamp: Date;
}

export interface MetricHistory {
  metricId: string;
  values: Array<{
    value: number;
    timestamp: Date;
  }>;
}

export interface MetricSummary {
  metric: Metric;
  history: MetricHistory;
  analysis: {
    currentValue: number;
    targetValue?: number;
    progress?: number; // percentage towards target
    trend: 'improving' | 'declining' | 'stable';
    changeRate: number; // rate of change over time
  };
}

export class MetricsTracker {
  private metrics: Map<string, Metric>;
  private history: Map<string, MetricHistory>;

  constructor() {
    this.metrics = new Map();
    this.history = new Map();
  }

  addMetric(metric: Metric): void {
    this.metrics.set(metric.id, metric);

    // Initialize history
    if (!this.history.has(metric.id)) {
      this.history.set(metric.id, {
        metricId: metric.id,
        values: [],
      });
    }

    // Add to history
    this.updateHistory(metric.id, metric.value, metric.timestamp);
  }

  getMetric(metricId: string): Metric | undefined {
    return this.metrics.get(metricId);
  }

  updateMetric(metricId: string, value: number, timestamp?: Date): void {
    const metric = this.metrics.get(metricId);
    if (!metric) {
      throw new Error(`Metric not found: ${metricId}`);
    }

    const updatedTimestamp = timestamp || new Date();
    metric.value = value;
    metric.timestamp = updatedTimestamp;

    this.updateHistory(metricId, value, updatedTimestamp);
  }

  private updateHistory(metricId: string, value: number, timestamp: Date): void {
    let history = this.history.get(metricId);
    if (!history) {
      history = {
        metricId,
        values: [],
      };
      this.history.set(metricId, history);
    }

    history.values.push({ value, timestamp });

    // Keep only last 100 values
    if (history.values.length > 100) {
      history.values.shift();
    }
  }

  getMetricSummary(metricId: string): MetricSummary {
    const metric = this.metrics.get(metricId);
    if (!metric) {
      throw new Error(`Metric not found: ${metricId}`);
    }

    const history = this.history.get(metricId);
    if (!history) {
      throw new Error(`History not found for metric: ${metricId}`);
    }

    const analysis = this.analyzeMetric(metric, history);

    return {
      metric,
      history,
      analysis,
    };
  }

  private analyzeMetric(metric: Metric, history: MetricHistory): MetricSummary['analysis'] {
    const currentValue = metric.value;
    const targetValue = metric.target;

    let progress: number | undefined;
    if (targetValue !== undefined) {
      progress = (currentValue / targetValue) * 100;
    }

    const trend = this.calculateTrend(history);
    const changeRate = this.calculateChangeRate(history);

    return {
      currentValue: Math.round(currentValue * 100) / 100,
      targetValue,
      progress: progress !== undefined ? Math.round(progress * 100) / 100 : undefined,
      trend,
      changeRate: Math.round(changeRate * 100) / 100,
    };
  }

  private calculateTrend(history: MetricHistory): 'improving' | 'declining' | 'stable' {
    if (history.values.length < 2) {
      return 'stable';
    }

    const recentValues = history.values.slice(-10); // Last 10 values
    const firstHalf = recentValues.slice(0, Math.floor(recentValues.length / 2));
    const secondHalf = recentValues.slice(Math.floor(recentValues.length / 2));

    const firstAvg =
      firstHalf.reduce((sum, v) => sum + v.value, 0) / firstHalf.length;
    const secondAvg =
      secondHalf.reduce((sum, v) => sum + v.value, 0) / secondHalf.length;

    const change = secondAvg - firstAvg;
    const changePercent = (change / firstAvg) * 100;

    if (Math.abs(changePercent) < 5) {
      return 'stable';
    }

    return changePercent > 0 ? 'improving' : 'declining';
  }

  private calculateChangeRate(history: MetricHistory): number {
    if (history.values.length < 2) {
      return 0;
    }

    const recent = history.values.slice(-10);
    if (recent.length < 2) {
      return 0;
    }

    const firstValue = recent[0].value;
    const lastValue = recent[recent.length - 1].value;

    return ((lastValue - firstValue) / firstValue) * 100;
  }

  getMetricsByCategory(category: Metric['category']): Metric[] {
    return Array.from(this.metrics.values()).filter((m) => m.category === category);
  }

  getAllMetrics(): Metric[] {
    return Array.from(this.metrics.values());
  }

  getDashboardSummary(): {
    totalMetrics: number;
    byCategory: Record<Metric['category'], number>;
    improving: number;
    declining: number;
    stable: number;
    meetsTarget: number;
    belowTarget: number;
  } {
    const allMetrics = Array.from(this.metrics.values());
    const totalMetrics = allMetrics.length;

    const byCategory: Record<Metric['category'], number> = {
      performance: 0,
      quality: 0,
      efficiency: 0,
      financial: 0,
      customer: 0,
    };

    let improving = 0;
    let declining = 0;
    let stable = 0;
    let meetsTarget = 0;
    let belowTarget = 0;

    allMetrics.forEach((metric) => {
      byCategory[metric.category]++;

      const history = this.history.get(metric.id);
      if (history) {
        const trend = this.calculateTrend(history);
        if (trend === 'improving') improving++;
        else if (trend === 'declining') declining++;
        else stable++;
      }

      if (metric.target !== undefined) {
        if (metric.value >= metric.target) {
          meetsTarget++;
        } else {
          belowTarget++;
        }
      }
    });

    return {
      totalMetrics,
      byCategory,
      improving,
      declining,
      stable,
      meetsTarget,
      belowTarget,
    };
  }

  exportMetrics(): string {
    const data = {
      metrics: Array.from(this.metrics.values()),
      history: Array.from(this.history.values()),
    };
    return JSON.stringify(data, null, 2);
  }

  importMetrics(data: string): void {
    try {
      const parsed = JSON.parse(data);

      // Import metrics
      parsed.metrics.forEach((metric: any) => {
        metric.timestamp = new Date(metric.timestamp);
        this.metrics.set(metric.id, metric);
      });

      // Import history
      parsed.history.forEach((hist: any) => {
        hist.values.forEach((v: any) => {
          v.timestamp = new Date(v.timestamp);
        });
        this.history.set(hist.metricId, hist);
      });
    } catch (error) {
      throw new Error(
        `Failed to import metrics: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  clearMetrics(): void {
    this.metrics.clear();
    this.history.clear();
  }
}
