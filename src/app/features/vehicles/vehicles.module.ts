import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleNamePipe } from 'src/app/features/vehicles/pipes/vehicle-name.pipe';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { ComponentsModule } from 'src/app/core/components/components.module';

@NgModule({
  declarations: [VehiclesComponent, VehicleNamePipe],
  imports: [CommonModule, FormsModule, VehiclesRoutingModule, ComponentsModule],
  providers: [],
})
export class VehiclesModule {}
