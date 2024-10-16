import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AirportsService } from 'src/app/Services/airports.service';
import { NoAirportsFoundComponent } from 'src/app/dialogs-folder/no-airports-found/no-airports-found.component';
import { NoflightsfoundComponent } from 'src/app/dialogs-folder/noflightsfound/noflightsfound.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { LoadingmodalComponent } from 'src/app/dialogs-folder/loadingmodal/loadingmodal.component';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

interface Airport {
  country: string;
  city: string;
  entityId: string;
  name: string;
  iataCode: string;
}

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
  providers: [DatePipe]
})
export class BookingDetailsComponent implements OnInit {
  departureAirports: Airport[] = [];
  arrivalAirports: Airport[] = [];
  noAirportFoundDeparture: boolean = false;
  noAirportFoundArrival: boolean = false;
  passengerLabel: string = '1 Adult';
  showPassengerSelect: boolean = false;
  bookingForm!: FormGroup;
  userId!: string;

  isSearchingDeparture: boolean = false;
  isSearchingArrival: boolean = false;
  isModalOpen: boolean = false;
  departureTime: string = ''; 
  arrivalTime: string = '';
  
  private searchTimeout: any;

  @ViewChild('passengerSelect') passengerSelect: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private airportService: AirportsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authservice: AuthService,
    private route: ActivatedRoute, 
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
    this.userId = this.authservice.getUserId() || '';

    if (!this.userId) {
      console.warn('No userId found. Ensure user is logged in.');
    }
    
     // Get userId from the query params
    //  this.route.queryParams.subscribe(params => {
    //   this.userId = params['userId']; // Access userId from query params
    // });
  }

  private initializeForm(): void {
    this.bookingForm = this.fb.group({
      departureCity: ['', Validators.required],
      arrivalCity: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: [''],
      adults: [1, [Validators.required, Validators.min(1)]],
      children: [0],
      infants: [0],
      passengers: this.fb.array([])
    });

    this.updatePassengerLabel();
   
  }

  

  private subscribeToFormChanges(): void {
    this.bookingForm.valueChanges.subscribe(() => {
      this.updatePassengerLabel();
      
    });

    this.bookingForm.get('departureCity')?.valueChanges.subscribe(value => {
      this.searchAirports(value, 'departure');
    });

    this.bookingForm.get('arrivalCity')?.valueChanges.subscribe(value => {
      this.searchAirports(value, 'arrival');
    });
  }

 

  searchAirports(query: string, type: string): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (query.length > 2) {
      this.searchTimeout = setTimeout(() => {
        this.toggleSpinner(type, true);

        this.airportService.searchAirports(query).subscribe(
          (airports: Airport[]) => {
            this.handleAirportSearchResults(airports, type);
          },
          error => {
            this.handleError(type, 'Error searching airports');
          }
        );
      }, 1000);
    } else {
      this.clearAirportResults(type);
    }
  }

  private handleAirportSearchResults(airports: Airport[], type: string): void {
    if (type === 'departure') {
      this.departureAirports = airports;
      this.noAirportFoundDeparture = airports.length === 0;
    } else {
      this.arrivalAirports = airports;
      this.noAirportFoundArrival = airports.length === 0;
    }

    this.toggleSpinner(type, false);

    if ((type === 'departure' && this.noAirportFoundDeparture) ||
      (type === 'arrival' && this.noAirportFoundArrival)) {
      this.triggerNoAirportsDialog(type);
    }
  }

  private handleError(type: string, message: string): void {
    this.toggleSpinner(type, false);
    console.error(message);
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  private clearAirportResults(type: string): void {
    if (type === 'departure') {
      this.departureAirports = [];
      this.noAirportFoundDeparture = false;
    } else {
      this.arrivalAirports = [];
      this.noAirportFoundArrival = false;
    }
  }

 




searchForFlights(departureAirport: Airport, arrivalAirport: Airport, totalPassengers: number): void {
  console.log('abot to submit');
  // Show the loading modal
  const loadingDialogRef = this.dialog.open(LoadingmodalComponent, {
    disableClose: true
  });

  // Simulate an API call with a delay
  setTimeout(() => {
    loadingDialogRef.close();

    // Simulate flight availability (60% chance)
    const isFlightAvailable = Math.random() <= 0.6;

    if (isFlightAvailable) {
      // Flight is available, navigate to passenger info route with query params
      const navigationExtras: NavigationExtras = {
        queryParams: {
          departureAirportName: departureAirport.name,
          departureAirportCountry: departureAirport.country,
          arrivalAirportName: arrivalAirport.name,
          arrivalAirportCountry: arrivalAirport.country,
          totalPassengers: totalPassengers,
          userId: this.userId
        }
      };
      this.router.navigate(['flight-booking/flight-details'], navigationExtras);
    } else {
      // Flight is not available, open No Flights Found dialog
      this.openNoFlightsDialog();
    }
  }, 3000); // Simulate a 3-second delay for API call
}

 

onSubmit(): void {
 
  
  this.bookingForm.markAllAsTouched();

  if (this.bookingForm.valid) {
    const departureCity = this.bookingForm.get('departureCity')?.value;
    const arrivalCity = this.bookingForm.get('arrivalCity')?.value;

    if (departureCity && arrivalCity) {
      // Calculate total passengers
      const adults = this.bookingForm.get('adults')?.value || 0;
      const children = this.bookingForm.get('children')?.value || 0;
      const infants = this.bookingForm.get('infants')?.value || 0;
      const totalPassengers = adults + children + infants;

      // Proceed to search for flights and navigate
      this.searchForFlights(departureCity, arrivalCity, totalPassengers,);
    } else {
      console.error("Departure and Arrival fields are required");
      this.snackBar.open('Departure and Arrival fields are required.', 'Close', { duration: 3000 });
    }
  } else {
    console.error("Form is invalid", this.bookingForm);
    this.snackBar.open('Please complete all required fields.', 'Close', { duration: 3000 });
  }
}




  toggleSpinner(type: string, isSearching: boolean): void {
    if (type === 'departure') {
      this.isSearchingDeparture = isSearching;
    } else {
      this.isSearchingArrival = isSearching;
    }

    if (isSearching) {
      setTimeout(() => {
        if ((type === 'departure' && this.noAirportFoundDeparture) ||
          (type === 'arrival' && this.noAirportFoundArrival)) {
          this.triggerNoAirportsDialog(type);
        }
      }, 6000);
    }
  }

  increase(type: string): void {
    const control = this.bookingForm.get(type);
    if (control) {
      control.setValue(control.value + 1);
      this.updatePassengerLabel();
    }
  }

  decrease(type: string): void {
    const control = this.bookingForm.get(type);
    if (control && control.value > 0) {
      control.setValue(control.value - 1);
      this.updatePassengerLabel();
    }
  }

  onDepartureCityInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchAirports(input.value, 'departure');
  }

  onArrivalCityInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchAirports(input.value, 'arrival');
  }

  openPassengerSelect(): void {
    this.passengerSelect.open();
  }

  closePassengerSelect(): void {
    this.passengerSelect.close();
  }

  openLoadingModal(): void {
    this.dialog.open(LoadingmodalComponent, {
      disableClose: true,
      panelClass: 'loading-modal'
    });
  }


  openNoAirportsDialog(type: string): void {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const dialogRef = this.dialog.open(NoAirportsFoundComponent, {
        disableClose: true
      });

      dialogRef.componentInstance.clearInput.subscribe(() => {
        this.clearInputField(type);
      });

      dialogRef.afterClosed().subscribe(() => {
        this.isModalOpen = false;
      });
    }
  }

  displayAirport(airport: Airport): string {
    return airport ? `${airport.name}, ${airport.country}` : '';
  }

  openNoFlightsDialog(): void {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const dialogRef = this.dialog.open(NoflightsfoundComponent, {
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.isModalOpen = false;
      });
    }
  }

  updatePassengerLabel(): void {
    const adults = this.bookingForm.get('adults')?.value || 0;
    const children = this.bookingForm.get('children')?.value || 0;
    const infants = this.bookingForm.get('infants')?.value || 0;

    this.passengerLabel = `${adults} Adult${adults > 1 ? 's' : ''}`;
    if (children > 0) {
      this.passengerLabel += ` ${children} Child${children > 1 ? 'ren' : ''}`;
    }
    if (infants > 0) {
      this.passengerLabel += `${infants} Infant${infants > 1 ? 's' : ''}`;
    }
  }

  swapCities(): void {
    const departureCity = this.bookingForm.get('departureCity')?.value;
    const arrivalCity = this.bookingForm.get('arrivalCity')?.value;

    this.bookingForm.patchValue({
      departureCity: arrivalCity,
      arrivalCity: departureCity
    });

    this.searchAirports(arrivalCity, 'departure');
    this.searchAirports(departureCity, 'arrival');
  }

  private triggerNoAirportsDialog(type: string): void {
    this.openNoAirportsDialog(type);
  }

  private clearInputField(type: string): void {
    if (type === 'departure') {
      this.bookingForm.patchValue({ departureCity: '' });
      this.departureAirports = [];
      this.noAirportFoundDeparture = false;
    } else {
      this.bookingForm.patchValue({ arrivalCity: '' });
      this.arrivalAirports = [];
      this.noAirportFoundArrival = false;
    }
  }

  myDateFilter = (d: Date | null): boolean => {
    const today = new Date();
    return d ? d >= today : true;
  };

  
}