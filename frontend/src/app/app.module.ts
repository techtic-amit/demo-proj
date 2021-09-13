import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { DemoMaterialModule } from './customer-listing/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditFormComponent } from './customer-listing/editFromComponent/edit-form-component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    ServiceDetailsComponent,
    VehicleDetailsComponent,
    CustomerListingComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    MatTableModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatExpansionModule,
    MatSliderModule,
    MatPaginatorModule,
    MatCardModule,
    MatDatepickerModule,
    DemoMaterialModule
  ],
  providers: [],


  bootstrap: [AppComponent]
})
export class AppModule { }
