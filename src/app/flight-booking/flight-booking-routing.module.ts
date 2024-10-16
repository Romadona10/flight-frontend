import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightBookingComponent } from './flight-booking.component';
import { PassengerInfoComponent } from '../flight-booking-folder/passenger-info/passenger-info.component';
import { BookingDetailsComponent } from '../flight-booking-folder/booking-details/booking-details.component';
import { PaymentComponent } from '../flight-booking-folder/payment/payment.component';
import { SearchflightsComponent } from '../flight-booking-folder/searchflights/searchflights.component';
import { SeatSelectionComponent } from '../flight-booking-folder/seat-selection/seat-selection.component';
import { PassengerInfoIterateComponent } from '../flight-booking-folder/passenger-info-iterate/passenger-info-iterate.component';
import { FlightDetailsComponent } from '../flight-booking-folder/flight-details/flight-details.component';

// const routes: Routes = [{ path: '', component: FlightBookingComponent }];
const routes: Routes = [
  { path: '', component: FlightBookingComponent,
    children: [
      { path: '', redirectTo: 'booking-details', pathMatch: 'full' },
      { path: 'booking-details', component: BookingDetailsComponent },
      {path: 'seats',component:SeatSelectionComponent},
      {path: 'flight-details',component:FlightDetailsComponent},
      {path: 'searchflights',component:SearchflightsComponent},
      { path: 'passenger-info', component: PassengerInfoComponent },
      // {path: 'passenger-iterate',component:PassengerInfoIterateComponent},
      { path: 'payment', component: PaymentComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightBookingRoutingModule { }
