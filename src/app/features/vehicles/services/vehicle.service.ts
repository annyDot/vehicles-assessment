import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VEHICLES } from '../models/vehicle.constants';
import { VehicleModel } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  public getVehicles(): Observable<VehicleModel[]> {
    return of(VEHICLES);
  }
}
