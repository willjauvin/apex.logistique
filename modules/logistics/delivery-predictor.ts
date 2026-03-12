// Delivery time predictions

export interface DeliveryRequest {
  id: string;
  origin: {
    lat: number;
    lng: number;
    address: string;
  };
  destination: {
    lat: number;
    lng: number;
    address: string;
  };
  packageWeight: number; // in kg
  priority: 'standard' | 'express' | 'same-day' | 'overnight';
  requestedDate: Date;
}

export interface DeliveryPrediction {
  requestId: string;
  estimatedDelivery: Date;
  confidence: number; // 0-1
  distance: number; // in km
  estimatedDuration: number; // in minutes
  factors: {
    baseTime: number;
    trafficDelay: number;
    weatherDelay: number;
    priorityAdjustment: number;
  };
  alternatives?: Array<{
    method: string;
    estimatedDelivery: Date;
    cost: number;
  }>;
}

export interface HistoricalData {
  routeId: string;
  actualDuration: number;
  predictedDuration: number;
  conditions: {
    weather: 'clear' | 'rain' | 'snow' | 'storm';
    traffic: 'light' | 'moderate' | 'heavy';
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  };
  date: Date;
}

export class DeliveryPredictor {
  private historicalData: HistoricalData[];
  private baseSpeedKmH: number;

  constructor() {
    this.historicalData = [];
    this.baseSpeedKmH = 50; // Average delivery speed
  }

  predictDelivery(request: DeliveryRequest): DeliveryPrediction {
    const distance = this.calculateDistance(
      request.origin.lat,
      request.origin.lng,
      request.destination.lat,
      request.destination.lng
    );

    const baseTime = (distance / this.baseSpeedKmH) * 60; // in minutes
    const trafficDelay = this.estimateTrafficDelay(request.requestedDate, distance);
    const weatherDelay = this.estimateWeatherDelay(request.requestedDate);
    const priorityAdjustment = this.getPriorityAdjustment(request.priority);

    const totalDuration = baseTime + trafficDelay + weatherDelay - priorityAdjustment;
    const estimatedDelivery = new Date(request.requestedDate);
    estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + totalDuration);

    const confidence = this.calculateConfidence(distance, request.priority);

    const alternatives = this.generateAlternatives(request, distance, totalDuration);

    return {
      requestId: request.id,
      estimatedDelivery,
      confidence,
      distance: Math.round(distance * 100) / 100,
      estimatedDuration: Math.round(totalDuration),
      factors: {
        baseTime: Math.round(baseTime),
        trafficDelay: Math.round(trafficDelay),
        weatherDelay: Math.round(weatherDelay),
        priorityAdjustment: Math.round(priorityAdjustment),
      },
      alternatives,
    };
  }

  addHistoricalData(data: HistoricalData): void {
    this.historicalData.push(data);

    // Keep only last 1000 records
    if (this.historicalData.length > 1000) {
      this.historicalData.shift();
    }
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private estimateTrafficDelay(date: Date, distance: number): number {
    const hour = date.getHours();
    const isRushHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
    const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;

    let delayFactor = 0.1; // 10% base delay

    if (isRushHour && isWeekday) {
      delayFactor = 0.4; // 40% delay during rush hour
    } else if (isWeekday) {
      delayFactor = 0.2; // 20% delay during regular weekday hours
    }

    // Check historical data for similar conditions
    const similarConditions = this.historicalData.filter((d) => {
      const sameTimeOfDay = this.getTimeOfDay(d.date) === this.getTimeOfDay(date);
      return sameTimeOfDay;
    });

    if (similarConditions.length > 0) {
      const avgDelay =
        similarConditions.reduce(
          (sum, d) => sum + (d.actualDuration - d.predictedDuration),
          0
        ) / similarConditions.length;
      delayFactor = Math.max(delayFactor, avgDelay / ((distance / this.baseSpeedKmH) * 60));
    }

    return (distance / this.baseSpeedKmH) * 60 * delayFactor;
  }

  private estimateWeatherDelay(date: Date): number {
    // Simple weather delay estimation
    // In a real system, this would integrate with weather APIs
    const season = this.getSeason(date);

    if (season === 'winter') {
      return 15; // 15 minutes delay in winter
    } else if (season === 'spring' || season === 'fall') {
      return 5; // 5 minutes delay in spring/fall
    }

    return 0; // No delay in summer
  }

  private getSeason(date: Date): 'spring' | 'summer' | 'fall' | 'winter' {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  }

  private getTimeOfDay(date: Date): 'morning' | 'afternoon' | 'evening' | 'night' {
    const hour = date.getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }

  private getPriorityAdjustment(priority: DeliveryRequest['priority']): number {
    switch (priority) {
      case 'same-day':
        return 60; // 1 hour faster
      case 'express':
        return 30; // 30 minutes faster
      case 'overnight':
        return 45; // 45 minutes faster
      default:
        return 0;
    }
  }

  private calculateConfidence(distance: number, priority: DeliveryRequest['priority']): number {
    let confidence = 0.9; // Base confidence

    // Decrease confidence for long distances
    if (distance > 100) {
      confidence -= 0.1;
    }
    if (distance > 200) {
      confidence -= 0.1;
    }

    // Increase confidence for express deliveries (more resources allocated)
    if (priority === 'express' || priority === 'same-day') {
      confidence += 0.05;
    }

    // Adjust based on historical accuracy
    if (this.historicalData.length > 0) {
      const accuracy = this.calculateHistoricalAccuracy();
      confidence = (confidence + accuracy) / 2;
    }

    return Math.max(0.5, Math.min(1.0, confidence));
  }

  private calculateHistoricalAccuracy(): number {
    if (this.historicalData.length === 0) return 0.8;

    const accuracies = this.historicalData.map((d) => {
      const error = Math.abs(d.actualDuration - d.predictedDuration);
      const accuracy = 1 - error / d.predictedDuration;
      return Math.max(0, Math.min(1, accuracy));
    });

    return accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
  }

  private generateAlternatives(
    request: DeliveryRequest,
    distance: number,
    baseDuration: number
  ): Array<{ method: string; estimatedDelivery: Date; cost: number }> {
    const alternatives = [];

    // Standard delivery
    if (request.priority !== 'standard') {
      const standardDelivery = new Date(request.requestedDate);
      standardDelivery.setMinutes(standardDelivery.getMinutes() + baseDuration);
      alternatives.push({
        method: 'Standard',
        estimatedDelivery: standardDelivery,
        cost: Math.round(distance * 0.5),
      });
    }

    // Express delivery
    if (request.priority !== 'express') {
      const expressDelivery = new Date(request.requestedDate);
      expressDelivery.setMinutes(expressDelivery.getMinutes() + baseDuration - 30);
      alternatives.push({
        method: 'Express',
        estimatedDelivery: expressDelivery,
        cost: Math.round(distance * 0.8),
      });
    }

    // Same-day delivery (if requested before noon)
    if (request.requestedDate.getHours() < 12 && request.priority !== 'same-day') {
      const sameDayDelivery = new Date(request.requestedDate);
      sameDayDelivery.setHours(18, 0, 0, 0); // Deliver by 6 PM
      alternatives.push({
        method: 'Same-Day',
        estimatedDelivery: sameDayDelivery,
        cost: Math.round(distance * 1.2),
      });
    }

    return alternatives;
  }

  getHistoricalAccuracy(): number {
    return this.calculateHistoricalAccuracy();
  }

  clearHistoricalData(): void {
    this.historicalData = [];
  }
}
