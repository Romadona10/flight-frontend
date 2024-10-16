import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';


import { SearchComponent } from './components/search/search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import { DialogModule } from '@angular/cdk/dialog';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { TermModalComponent } from './dialogs-folder/term-modal/term-modal.component'
import { AuthGuard } from './Guards/auth.guard';
import { SearchflightsComponent } from './flight-booking-folder/searchflights/searchflights.component';
import { SeatSelectionComponent } from './flight-booking-folder/seat-selection/seat-selection.component';
import { NoflightsfoundComponent } from './dialogs-folder/noflightsfound/noflightsfound.component';
import { LoadingmodalComponent } from './dialogs-folder/loadingmodal/loadingmodal.component';
import { OtpmodalComponent } from './dialogs-folder/otpmodal/otpmodal.component';
import { FlightbookingstoreService } from './Services/flightbookingstore.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    HomeComponent,
    SearchComponent,
    UserProfileComponent,
    BookingConfirmationComponent,
    AboutUsComponent,
    // NoAirportsFoundComponent,
    TermModalComponent,
    SearchflightsComponent,
    NoflightsfoundComponent,
    LoadingmodalComponent,
    OtpmodalComponent,
    
   
   
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    HttpClientModule
    
  ],
  providers: [FlightbookingstoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
