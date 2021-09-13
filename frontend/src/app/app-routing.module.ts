import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'serviceDetails', component: ServiceDetailsComponent },
  { path: 'vehicleDetails', component: VehicleDetailsComponent },
  { path: 'customerListing', component: CustomerListingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
