// Fleet management system

export interface Vehicle {
  id: string;
  type: 'truck' | 'van' | 'car' | 'motorcycle';
  capacity: number; // in kg
  status: 'available' | 'in-transit' | 'maintenance' | 'offline';
  currentLocation?: {
    lat: number;
    lng: number;
  };
  assignedRoute?: string;
  driver?: {
    id: string;
    name: string;
    license: string;
  };
  specs: {
    fuelType: 'diesel' | 'gasoline' | 'electric' | 'hybrid';
    avgSpeed: number; // km/h
    fuelEfficiency: number; // km per liter or kWh
  };
  maintenance: {
    lastService: Date;
    nextService: Date;
    mileage: number;
  };
}

export interface FleetMetrics {
  totalVehicles: number;
  availableVehicles: number;
  inTransitVehicles: number;
  maintenanceVehicles: number;
  utilizationRate: number; // percentage
  avgFuelEfficiency: number;
  totalCapacity: number;
  availableCapacity: number;
}

export class FleetManager {
  private vehicles: Map<string, Vehicle>;

  constructor() {
    this.vehicles = new Map();
  }

  addVehicle(vehicle: Vehicle): void {
    this.vehicles.set(vehicle.id, vehicle);
  }

  getVehicle(vehicleId: string): Vehicle | undefined {
    return this.vehicles.get(vehicleId);
  }

  updateVehicle(vehicleId: string, updates: Partial<Vehicle>): void {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) {
      throw new Error(`Vehicle not found: ${vehicleId}`);
    }

    this.vehicles.set(vehicleId, { ...vehicle, ...updates });
  }

  removeVehicle(vehicleId: string): void {
    this.vehicles.delete(vehicleId);
  }

  assignRoute(vehicleId: string, routeId: string): void {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) {
      throw new Error(`Vehicle not found: ${vehicleId}`);
    }

    if (vehicle.status !== 'available') {
      throw new Error(`Vehicle ${vehicleId} is not available for assignment`);
    }

    this.vehicles.set(vehicleId, {
      ...vehicle,
      assignedRoute: routeId,
      status: 'in-transit',
    });
  }

  unassignRoute(vehicleId: string): void {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) {
      throw new Error(`Vehicle not found: ${vehicleId}`);
    }

    this.vehicles.set(vehicleId, {
      ...vehicle,
      assignedRoute: undefined,
      status: 'available',
    });
  }

  updateLocation(vehicleId: string, lat: number, lng: number): void {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) {
      throw new Error(`Vehicle not found: ${vehicleId}`);
    }

    this.vehicles.set(vehicleId, {
      ...vehicle,
      currentLocation: { lat, lng },
    });
  }

  getAvailableVehicles(minCapacity?: number): Vehicle[] {
    const available = Array.from(this.vehicles.values()).filter(
      (v) => v.status === 'available'
    );

    if (minCapacity) {
      return available.filter((v) => v.capacity >= minCapacity);
    }

    return available;
  }

  getVehiclesByType(type: Vehicle['type']): Vehicle[] {
    return Array.from(this.vehicles.values()).filter((v) => v.type === type);
  }

  getVehiclesByStatus(status: Vehicle['status']): Vehicle[] {
    return Array.from(this.vehicles.values()).filter((v) => v.status === status);
  }

  scheduleMaintenanceVehicle(vehicleId: string, nextServiceDate: Date): void {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) {
      throw new Error(`Vehicle not found: ${vehicleId}`);
    }

    this.vehicles.set(vehicleId, {
      ...vehicle,
      status: 'maintenance',
      maintenance: {
        ...vehicle.maintenance,
        nextService: nextServiceDate,
      },
    });
  }

  completeMaintenanceVehicle(vehicleId: string, mileage: number): void {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) {
      throw new Error(`Vehicle not found: ${vehicleId}`);
    }

    const today = new Date();
    const nextService = new Date();
    nextService.setMonth(nextService.getMonth() + 6); // 6 months from now

    this.vehicles.set(vehicleId, {
      ...vehicle,
      status: 'available',
      maintenance: {
        lastService: today,
        nextService,
        mileage,
      },
    });
  }

  getFleetMetrics(): FleetMetrics {
    const allVehicles = Array.from(this.vehicles.values());
    const availableVehicles = allVehicles.filter((v) => v.status === 'available');
    const inTransitVehicles = allVehicles.filter((v) => v.status === 'in-transit');
    const maintenanceVehicles = allVehicles.filter((v) => v.status === 'maintenance');

    const totalCapacity = allVehicles.reduce((sum, v) => sum + v.capacity, 0);
    const availableCapacity = availableVehicles.reduce((sum, v) => sum + v.capacity, 0);

    const utilizationRate =
      allVehicles.length > 0
        ? (inTransitVehicles.length / allVehicles.length) * 100
        : 0;

    const avgFuelEfficiency =
      allVehicles.length > 0
        ? allVehicles.reduce((sum, v) => sum + v.specs.fuelEfficiency, 0) /
          allVehicles.length
        : 0;

    return {
      totalVehicles: allVehicles.length,
      availableVehicles: availableVehicles.length,
      inTransitVehicles: inTransitVehicles.length,
      maintenanceVehicles: maintenanceVehicles.length,
      utilizationRate: Math.round(utilizationRate * 100) / 100,
      avgFuelEfficiency: Math.round(avgFuelEfficiency * 100) / 100,
      totalCapacity,
      availableCapacity,
    };
  }

  getMaintenanceSchedule(): Array<{ vehicle: Vehicle; daysUntilService: number }> {
    const today = new Date();
    return Array.from(this.vehicles.values())
      .map((vehicle) => ({
        vehicle,
        daysUntilService: Math.ceil(
          (vehicle.maintenance.nextService.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      }))
      .sort((a, b) => a.daysUntilService - b.daysUntilService);
  }

  findNearestVehicle(lat: number, lng: number): Vehicle | undefined {
    const availableVehicles = this.getAvailableVehicles();
    if (availableVehicles.length === 0) {
      return undefined;
    }

    let nearest = availableVehicles[0];
    let minDistance = this.calculateDistance(
      lat,
      lng,
      nearest.currentLocation?.lat || 0,
      nearest.currentLocation?.lng || 0
    );

    for (const vehicle of availableVehicles) {
      if (!vehicle.currentLocation) continue;

      const distance = this.calculateDistance(
        lat,
        lng,
        vehicle.currentLocation.lat,
        vehicle.currentLocation.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = vehicle;
      }
    }

    return nearest;
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

  getAllVehicles(): Vehicle[] {
    return Array.from(this.vehicles.values());
  }

  clearFleet(): void {
    this.vehicles.clear();
  }
}
