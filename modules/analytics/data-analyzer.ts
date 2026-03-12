// Data analysis engine

export interface DataPoint {
  timestamp: Date;
  value: number;
  category?: string;
  metadata?: Record<string, any>;
}

export interface Dataset {
  id: string;
  name: string;
  data: DataPoint[];
  description?: string;
}

export interface AnalysisResult {
  datasetId: string;
  metrics: {
    count: number;
    sum: number;
    mean: number;
    median: number;
    mode: number;
    min: number;
    max: number;
    range: number;
    variance: number;
    standardDeviation: number;
  };
  trends: {
    direction: 'increasing' | 'decreasing' | 'stable';
    slope: number;
    confidence: number;
  };
  anomalies: Array<{
    timestamp: Date;
    value: number;
    deviation: number;
    severity: 'low' | 'medium' | 'high';
  }>;
  insights: string[];
}

export class DataAnalyzer {
  private datasets: Map<string, Dataset>;

  constructor() {
    this.datasets = new Map();
  }

  addDataset(dataset: Dataset): void {
    this.datasets.set(dataset.id, dataset);
  }

  getDataset(datasetId: string): Dataset | undefined {
    return this.datasets.get(datasetId);
  }

  analyze(datasetId: string): AnalysisResult {
    const dataset = this.datasets.get(datasetId);
    if (!dataset) {
      throw new Error(`Dataset not found: ${datasetId}`);
    }

    if (dataset.data.length === 0) {
      throw new Error(`Dataset is empty: ${datasetId}`);
    }

    const values = dataset.data.map((d) => d.value);
    const metrics = this.calculateMetrics(values);
    const trends = this.analyzeTrends(dataset.data);
    const anomalies = this.detectAnomalies(dataset.data, metrics);
    const insights = this.generateInsights(metrics, trends, anomalies);

    return {
      datasetId,
      metrics,
      trends,
      anomalies,
      insights,
    };
  }

  private calculateMetrics(values: number[]): AnalysisResult['metrics'] {
    const sorted = [...values].sort((a, b) => a - b);
    const count = values.length;
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / count;

    const median =
      count % 2 === 0
        ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
        : sorted[Math.floor(count / 2)];

    const mode = this.calculateMode(values);
    const min = sorted[0];
    const max = sorted[count - 1];
    const range = max - min;

    const variance =
      values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
    const standardDeviation = Math.sqrt(variance);

    return {
      count,
      sum: Math.round(sum * 100) / 100,
      mean: Math.round(mean * 100) / 100,
      median: Math.round(median * 100) / 100,
      mode: Math.round(mode * 100) / 100,
      min: Math.round(min * 100) / 100,
      max: Math.round(max * 100) / 100,
      range: Math.round(range * 100) / 100,
      variance: Math.round(variance * 100) / 100,
      standardDeviation: Math.round(standardDeviation * 100) / 100,
    };
  }

  private calculateMode(values: number[]): number {
    const frequency = new Map<number, number>();
    values.forEach((val) => {
      frequency.set(val, (frequency.get(val) || 0) + 1);
    });

    let maxFreq = 0;
    let mode = values[0];

    frequency.forEach((freq, val) => {
      if (freq > maxFreq) {
        maxFreq = freq;
        mode = val;
      }
    });

    return mode;
  }

  private analyzeTrends(data: DataPoint[]): AnalysisResult['trends'] {
    if (data.length < 2) {
      return {
        direction: 'stable',
        slope: 0,
        confidence: 0,
      };
    }

    // Linear regression
    const n = data.length;
    const x = data.map((_, i) => i);
    const y = data.map((d) => d.value);

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
    const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);

    // Determine direction
    let direction: 'increasing' | 'decreasing' | 'stable';
    if (Math.abs(slope) < 0.01) {
      direction = 'stable';
    } else if (slope > 0) {
      direction = 'increasing';
    } else {
      direction = 'decreasing';
    }

    // Calculate R-squared for confidence
    const meanY = sumY / n;
    const ssTotal = y.reduce((acc, yi) => acc + Math.pow(yi - meanY, 2), 0);
    const ssResidual = y.reduce(
      (acc, yi, i) => acc + Math.pow(yi - (slope * x[i] + (sumY - slope * sumX) / n), 2),
      0
    );
    const rSquared = 1 - ssResidual / ssTotal;
    const confidence = Math.max(0, Math.min(1, rSquared));

    return {
      direction,
      slope: Math.round(slope * 1000) / 1000,
      confidence: Math.round(confidence * 100) / 100,
    };
  }

  private detectAnomalies(
    data: DataPoint[],
    metrics: AnalysisResult['metrics']
  ): AnalysisResult['anomalies'] {
    const anomalies: AnalysisResult['anomalies'] = [];

    // Use standard deviation method
    const threshold = 2; // 2 standard deviations

    data.forEach((point) => {
      const deviation = Math.abs(point.value - metrics.mean) / metrics.standardDeviation;

      if (deviation > threshold) {
        let severity: 'low' | 'medium' | 'high';
        if (deviation > 3) {
          severity = 'high';
        } else if (deviation > 2.5) {
          severity = 'medium';
        } else {
          severity = 'low';
        }

        anomalies.push({
          timestamp: point.timestamp,
          value: point.value,
          deviation: Math.round(deviation * 100) / 100,
          severity,
        });
      }
    });

    return anomalies.sort((a, b) => b.deviation - a.deviation);
  }

  private generateInsights(
    metrics: AnalysisResult['metrics'],
    trends: AnalysisResult['trends'],
    anomalies: AnalysisResult['anomalies']
  ): string[] {
    const insights: string[] = [];

    // Trend insights
    if (trends.direction === 'increasing' && trends.confidence > 0.7) {
      insights.push(
        `Strong upward trend detected with ${(trends.confidence * 100).toFixed(0)}% confidence`
      );
    } else if (trends.direction === 'decreasing' && trends.confidence > 0.7) {
      insights.push(
        `Strong downward trend detected with ${(trends.confidence * 100).toFixed(0)}% confidence`
      );
    } else if (trends.direction === 'stable') {
      insights.push('Data shows stable pattern with minimal variation');
    }

    // Variability insights
    const coefficientOfVariation = (metrics.standardDeviation / metrics.mean) * 100;
    if (coefficientOfVariation > 30) {
      insights.push(`High variability detected (CV: ${coefficientOfVariation.toFixed(1)}%)`);
    } else if (coefficientOfVariation < 10) {
      insights.push(`Low variability detected (CV: ${coefficientOfVariation.toFixed(1)}%)`);
    }

    // Anomaly insights
    if (anomalies.length > 0) {
      const highSeverity = anomalies.filter((a) => a.severity === 'high').length;
      if (highSeverity > 0) {
        insights.push(`${highSeverity} high-severity anomalies detected`);
      }
      insights.push(`Total anomalies detected: ${anomalies.length}`);
    } else {
      insights.push('No anomalies detected in the dataset');
    }

    // Range insights
    if (metrics.range > metrics.mean * 2) {
      insights.push('Wide range of values detected, consider investigating outliers');
    }

    return insights;
  }

  compareDatasets(datasetId1: string, datasetId2: string): {
    dataset1: string;
    dataset2: string;
    comparison: {
      meanDifference: number;
      medianDifference: number;
      correlation?: number;
    };
    insights: string[];
  } {
    const dataset1 = this.datasets.get(datasetId1);
    const dataset2 = this.datasets.get(datasetId2);

    if (!dataset1 || !dataset2) {
      throw new Error('One or both datasets not found');
    }

    const metrics1 = this.calculateMetrics(dataset1.data.map((d) => d.value));
    const metrics2 = this.calculateMetrics(dataset2.data.map((d) => d.value));

    const meanDifference = metrics1.mean - metrics2.mean;
    const medianDifference = metrics1.median - metrics2.median;

    const insights: string[] = [];

    if (Math.abs(meanDifference) > 0) {
      const percentDiff = (meanDifference / metrics2.mean) * 100;
      insights.push(
        `Dataset 1 has ${percentDiff > 0 ? 'higher' : 'lower'} mean by ${Math.abs(percentDiff).toFixed(1)}%`
      );
    }

    return {
      dataset1: dataset1.name,
      dataset2: dataset2.name,
      comparison: {
        meanDifference: Math.round(meanDifference * 100) / 100,
        medianDifference: Math.round(medianDifference * 100) / 100,
      },
      insights,
    };
  }

  getAllDatasets(): Dataset[] {
    return Array.from(this.datasets.values());
  }

  clearDatasets(): void {
    this.datasets.clear();
  }
}
