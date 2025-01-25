import { Component, inject, OnInit } from '@angular/core';
import { VehicleService } from './services/vehicle.service';
import { VehicleModel } from './models/vehicle.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  vehicles$!: Observable<VehicleModel[]>;
  filteredVehicles: VehicleModel[] = [];
  searchQuery: string = '';

  private vehicleService = inject(VehicleService);

  ngOnInit(): void {
    this.vehicles$ = this.vehicleService
      .getVehicles()
      .pipe(map((vehicles) => this.filterVehicles(vehicles)));
  }

  filterVehicles(vehicles: VehicleModel[]): VehicleModel[] {
    if (!this.searchQuery) {
      return vehicles;
    }

    const lowerCaseQuery = this.searchQuery.toLowerCase();
    const searchFields: (keyof VehicleModel)[] = [
      'name',
      'manufacturer',
      'model',
      'year',
      'type',
      'fuelType',
      'licensePlate',
    ];

    return vehicles.filter((vehicle) =>
      searchFields.some((field) =>
        vehicle[field]?.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.vehicles$ = this.vehicleService
      .getVehicles()
      .pipe(map((vehicles) => this.filterVehicles(vehicles)));
  }
}
