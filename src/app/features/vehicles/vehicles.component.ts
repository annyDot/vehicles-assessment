import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VehicleService } from './services/vehicle.service';
import { VehicleModel } from './models/vehicle.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit, OnDestroy {
  private vehicleService = inject(VehicleService);
  private vehicles: VehicleModel[] = [];
  private destroy$ = new Subject<void>();

  filteredVehicles$ = new BehaviorSubject<VehicleModel[]>([]);

  ngOnInit(): void {
    this.getVehicles();
  }

  private getVehicles() {
    this.vehicleService
      .getVehicles()
      .pipe(takeUntil(this.destroy$))
      .subscribe((vehicles) => {
        this.vehicles = vehicles;
        this.filteredVehicles$.next(vehicles);
      });
  }

  private filterVehicles(query: string): VehicleModel[] {
    if (!query) {
      return this.vehicles;
    }

    const lowerCaseQuery = query.toLowerCase();
    const searchFields: (keyof VehicleModel)[] = [
      'name',
      'manufacturer',
      'model',
      'year',
      'type',
      'fuelType',
      'licensePlate',
    ];

    return this.vehicles.filter((vehicle) =>
      searchFields.some((field) =>
        vehicle[field]?.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    const filteredVehicles = this.filterVehicles(query);

    this.filteredVehicles$.next(filteredVehicles);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
