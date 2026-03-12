// Route optimization logic

export interface Location {
  id: string;
  lat: number;
  lng: number;
  address: string;
  type: 'warehouse' | 'customer' | 'hub';
}

export interface Route {
  id: string;
  vehicleId: string;
  stops: Location[];
  distance: number; // in km
  duration: number; // in minutes
  estimatedCost: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface OptimizationConstraints {
  maxDistance?: number;
  maxDuration?: number;
  maxStopsPerRoute?: number;
  vehicleCapacity?: number;
  timeWindows?: Array<{ start: Date; end: Date }>;
}

export interface OptimizationResult {
  originalRoute: Route;
  optimizedRoute: Route;
  improvements: {
    distanceSaved: number;
    timeSaved: number;
    costSaved: number;
  };
  suggestions: string[];
}

export class RouteOptimizer {
  private routes: Map<string, Route>;

  constructor() {
    this.routes = new Map();
  }

  addRoute(route: Route): void {
    this.routes.set(route.id, route);
  }

  getRoute(routeId: string): Route | undefined {
    return this.routes.get(routeId);
  }

  optimizeRoute(
    routeId: string,
    constraints?: OptimizationConstraints
  ): OptimizationResult {
    const route = this.routes.get(routeId);
    if (!route) {
      throw new Error(`Route not found: ${routeId}`);
    }

    const optimizedStops = this.optimizeStopOrder(route.stops, constraints);
    const optimizedMetrics = this.calculateRouteMetrics(optimizedStops);

    const optimizedRoute: Route = {
      ...route,
      stops: optimizedStops,
      distance: optimizedMetrics.distance,
      duration: optimizedMetrics.duration,
      estimatedCost: optimizedMetrics.cost,
    };

    const improvements = {
      distanceSaved: route.distance - optimizedRoute.distance,
      timeSaved: route.duration - optimizedRoute.duration,
      costSaved: route.estimatedCost - optimizedRoute.estimatedCost,
    };

    const suggestions = this.generateSuggestions(route, optimizedRoute, constraints);

    return {
      originalRoute: route,
      optimizedRoute,
      improvements,
      suggestions,
    };
  }

  optimizeMultipleRoutes(
    routeIds: string[],
    constraints?: OptimizationConstraints
  ): OptimizationResult[] {
    return routeIds.map((id) => this.optimizeRoute(id, constraints));
  }

  private optimizeStopOrder(
    stops: Location[],
    constraints?: OptimizationConstraints
  ): Location[] {
    if (stops.length <= 2) {
      return stops;
    }

    // Keep first stop (usually warehouse/depot) fixed
    const start = stops[0];
    const remainingStops = stops.slice(1);

    // Simple nearest neighbor algorithm
    const optimized: Location[] = [start];
    const unvisited = [...remainingStops];

    let current = start;
    while (unvisited.length > 0) {
      let nearestIndex = 0;
      let minDistance = this.calculateDistance(current, unvisited[0]);

      for (let i = 1; i < unvisited.length; i++) {
        const distance = this.calculateDistance(current, unvisited[i]);
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = i;
        }
      }

      const nearest = unvisited[nearestIndex];
      optimized.push(nearest);
      unvisited.splice(nearestIndex, 1);
      current = nearest;

      // Check constraints
      if (constraints?.maxStopsPerRoute && optimized.length >= constraints.maxStopsPerRoute) {
        break;
      }
    }

    return optimized;
  }

  private calculateDistance(loc1: Location, loc2: Location): number {
    // Haversine formula for calculating distance between two coordinates
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(loc2.lat - loc1.lat);
    const dLng = this.toRadians(loc2.lng - loc1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(loc1.lat)) *
        Math.cos(this.toRadians(loc2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private calculateRouteMetrics(stops: Location[]): {
    distance: number;
    duration: number;
    cost: number;
  } {
    let totalDistance = 0;

    for (let i = 0; i < stops.length - 1; i++) {
      totalDistance += this.calculateDistance(stops[i], stops[i + 1]);
    }

    // Estimate duration: average speed of 50 km/h + 10 minutes per stop
    const duration = (totalDistance / 50) * 60 + stops.length * 10;

    // Estimate cost: $0.50 per km + $20 per hour
    const cost = totalDistance * 0.5 + (duration / 60) * 20;

    return {
      distance: Math.round(totalDistance * 100) / 100,
      duration: Math.round(duration),
      cost: Math.round(cost * 100) / 100,
    };
  }

  private generateSuggestions(
    original: Route,
    optimized: Route,
    constraints?: OptimizationConstraints
  ): string[] {
    const suggestions: string[] = [];

    if (optimized.distance < original.distance) {
      const saved = ((original.distance - optimized.distance) / original.distance) * 100;
      suggestions.push(
        `Reordering stops can save ${saved.toFixed(1)}% in distance (${(original.distance - optimized.distance).toFixed(1)} km)`
      );
    }

    if (optimized.duration < original.duration) {
      suggestions.push(
        `Estimated time savings: ${(original.duration - optimized.duration).toFixed(0)} minutes`
      );
    }

    if (constraints?.maxDistance && optimized.distance > constraints.maxDistance) {
      suggestions.push(
        `Warning: Route exceeds maximum distance constraint (${optimized.distance.toFixed(1)} km > ${constraints.maxDistance} km)`
      );
    }

    if (constraints?.maxDuration && optimized.duration > constraints.maxDuration) {
      suggestions.push(
        `Warning: Route exceeds maximum duration constraint (${optimized.duration.toFixed(0)} min > ${constraints.maxDuration} min)`
      );
    }

    if (optimized.stops.length > 10) {
      suggestions.push('Consider splitting this route into multiple smaller routes for better efficiency');
    }

    return suggestions;
  }

  getAllRoutes(): Route[] {
    return Array.from(this.routes.values());
  }

  clearRoutes(): void {
    this.routes.clear();
  }
}
