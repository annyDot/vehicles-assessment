import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';
import { VEHICLES } from '../models/vehicle.constants';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return vehicles data when getVehicles is called', (done) => {
    service.getVehicles().subscribe((vehicles) => {
      expect(vehicles).toEqual(VEHICLES);
      done();
    });
  });
});
