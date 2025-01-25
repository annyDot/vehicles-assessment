import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./features/vehicles/vehicles.module').then(
        (m) => m.VehiclesModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  { path: '**', redirectTo: '/vehicles' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
