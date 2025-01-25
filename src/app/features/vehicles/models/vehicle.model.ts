export interface VehicleModel {
  readonly name: string;
  readonly manufacturer: string;
  readonly model: string;
  readonly year: number;
  readonly color: string;
  readonly type: string;
  readonly fuelType: string;
  readonly mileage: number;
  readonly price: number;
  readonly licensePlate: string;
  readonly active: boolean;
}
