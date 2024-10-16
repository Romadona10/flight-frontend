import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightDetailsComponent } from '../flight-booking-folder/flight-details/flight-details.component';
import { FlightbookingstoreService } from '../Services/flightbookingstore.service';
import { PaymentComponent } from '../flight-booking-folder/payment/payment.component';
import { PassengerInfoComponent } from '../flight-booking-folder/passenger-info/passenger-info.component';
import { PassengerInfoIterateComponent } from '../flight-booking-folder/passenger-info-iterate/passenger-info-iterate.component';
import { BookingDetailsComponent } from '../flight-booking-folder/booking-details/booking-details.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { NoAirportsFoundComponent } from '../dialogs-folder/no-airports-found/no-airports-found.component';
import { BookingData } from '../flight-booking-folder/bookingdata.model';
import { SeatSelectionComponent } from '../flight-booking-folder/seat-selection/seat-selection.component';
import { SeatwarningComponent } from '../dialogs-folder/seatwarning/seatwarning.component';
import { PaymentsuccessComponent } from '../dialogs-folder/paymentsuccess/paymentsuccess.component';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { OtpmodalComponent } from '../dialogs-folder/otpmodal/otpmodal.component';
const routes:Routes = [

  {path:'',component:FlightBookingComponent,
    children:[
      { path: '', redirectTo: 'booking-details', pathMatch: 'full' },
      { path: 'booking-details', component: BookingDetailsComponent },
      {path: 'seats',component:SeatSelectionComponent},
      {path: 'flight-details', component: FlightDetailsComponent},
      { path: 'passenger-info', component: PassengerInfoComponent },
      {path: 'passenger-iterate',component:PassengerInfoIterateComponent},
      { path: 'payment', component: PaymentComponent }
    
    ]
  }
]

@NgModule({
  declarations: [
    
    FlightBookingComponent,
    BookingDetailsComponent,
    PaymentComponent,
    PassengerInfoComponent,
    PassengerInfoIterateComponent,
    SeatSelectionComponent,
    FlightDetailsComponent,
    NoAirportsFoundComponent,
    SeatwarningComponent,
    PaymentsuccessComponent
    
    
    
  ],
  imports: [
    CommonModule,
    FlightBookingRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    


    
    RouterModule.forChild(routes)
    
  ],
  exports: [RouterModule]
})
export class FlightBookingModule { }
