import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirportsService } from 'src/app/Services/airports.service';

@Component({
  selector: 'app-searchflights',
  templateUrl: './searchflights.component.html',
  styleUrls: ['./searchflights.component.scss']
})
export class SearchflightsComponent implements OnInit {

  flightSearchForm!: FormGroup;
  isLoading = false;
  flights: any[] = [];
  searchPerformed = false;

  constructor(private fb: FormBuilder, private airportservice: AirportsService) {}

  ngOnInit(): void {
    this.flightSearchForm = this.fb.group({
      departureAirport: ['', Validators.required],
      arrivalAirport: ['', Validators.required],
      travelDate: ['', Validators.required]
    });
  }

  // onSearchFlights(): void {
  //   if (this.flightSearchForm.invalid) return;

  //   this.isLoading = true;
  //   this.flights = [];
  //   this.searchPerformed = true;

  //   const { departureAirport, arrivalAirport, travelDate } = this.flightSearchForm.value;
  //   const yearMonth = this.formatDateForApi(new Date(travelDate));  // Ensure travelDate is treated as a Date

  //   this.airportservice.searchFlightPrices(departureAirport, arrivalAirport, yearMonth).subscribe(
  //     response => {
  //       this.isLoading = false;
  //       if (response && response.data) {
  //         this.flights = this.transformFlightData(response.data);
  //       } else {
  //         // Handle no data or unexpected response format
  //         console.warn('No flights found or unexpected response format', response);
  //       }
  //     },
  //     error => {
  //       this.isLoading = false;
  //       console.error('Error fetching flights', error);
  //       // Optionally show error message to the user
  //     }
  //   );
  // }

  private formatDateForApi(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  private transformFlightData(flightData: any[]): any[] {
    // Transform and map the flight data to the required format
    return flightData.map(flight => ({
      airline: flight.airline,
      price: flight.price,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      duration: flight.duration
    }));
  }
}
