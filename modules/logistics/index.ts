// Module exports for logistics

export { RouteOptimizer } from './route-optimizer';
export { FleetManager } from './fleet-manager';
export { DeliveryPredictor } from './delivery-predictor';

export type {
  Location,
  Route,
  OptimizationConstraints,
  OptimizationResult,
} from './route-optimizer';

export type {
  Vehicle,
  FleetMetrics,
} from './fleet-manager';

export type {
  DeliveryRequest,
  DeliveryPrediction,
  HistoricalData,
} from './delivery-predictor';
