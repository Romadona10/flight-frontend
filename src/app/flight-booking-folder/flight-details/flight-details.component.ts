import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FareService } from 'src/app/Services/fare.service';
import { AuthService } from 'src/app/Services/auth.service';

interface AirportDetails {
  name: string;
  country: string;
}

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  departureAirportDetails: AirportDetails | null = null;
  arrivalAirportDetails: AirportDetails | null = null;
  flightOptions: any[] = [];
  selectedFlightIndex: number | null = null;
  userId: string | null = null; // Initialize as null and assign in ngOnInit

  airlineLogos: { [key: string]: string } = {
    'AirPeace': 'assets/airpeace.png',
    'DanaAir': 'assets/arik-logo.png',
    'Arik-Air': 'assets/dana.png'
  };

  constructor(
    private route: ActivatedRoute,
    private fareService: FareService,
    private router: Router,
    private authservice: AuthService,
  ) {}

  ngOnInit(): void {
    this.userId = this.authservice.getUserId(); // Fetch userId in ngOnInit

    this.route.queryParams.subscribe(params => {
      const departureAirportName = params['departureAirportName'];
      const departureAirportCountry = params['departureAirportcountry'];
      const arrivalAirportName = params['arrivalAirportName'];
      const arrivalAirportCountry = params['arrivalAirportcountry'];
      const totalPassengers = parseInt(params['totalPassengers']) || 1;

      // Assign the full details to departure and arrival airports
      this.departureAirportDetails = { name: departureAirportName, country: departureAirportCountry };
      this.arrivalAirportDetails = { name: arrivalAirportName, country: arrivalAirportCountry };

      this.loadFlightDetails(totalPassengers);
    });
  }

  private loadFlightDetails(totalPassengers: number): void {
    const airlines = ['AirPeace', 'DanaAir', 'Arik-Air'];

    this.flightOptions = airlines.map(airline => {
      const fare = this.fareService.calculateFare(this.departureAirportDetails!.name, this.arrivalAirportDetails!.name, airline);
      const estimatedTime = this.fareService.calculateEstimatedTime(this.departureAirportDetails!.name, this.arrivalAirportDetails!.name, airline); // Pass the airline as the third argument
      const departureTime = this.fareService.getDepartureTime(this.departureAirportDetails!.name);
      const arrivalTime = this.fareService.getArrivalTime(this.arrivalAirportDetails!.name);

      return {
        airlineName: airline,
        logoUrl: this.airlineLogos[airline],
        totalFare: fare * totalPassengers, // Multiply fare by passengers
        departureTime,
        arrivalTime,
        estimatedTime
      };
    });
  }

  selectFlight(index: number): void {
    this.selectedFlightIndex = index;
  }

  // Method to confirm selection and navigate to passenger-info
  confirmSelection(): void {
    if (this.selectedFlightIndex !== null && this.userId) { // Ensure userId is available
      const selectedFlight = this.flightOptions[this.selectedFlightIndex]; // Get the selected flight details
      this.router.navigate(['flight-booking/passenger-info'], {
        queryParams: {
          departureAirportName: this.departureAirportDetails?.name,
          arrivalAirportName: this.arrivalAirportDetails?.name,
          totalPassengers: this.route.snapshot.queryParams['totalPassengers'], // Keep passengers count
          flightCompany: selectedFlight.airlineName,
          price: selectedFlight.totalFare,
          departureTime: selectedFlight.departureTime,
          arrivalTime: selectedFlight.arrivalTime,
          userId: this.userId // Use the already fetched userId
        }
      });
    } else {
      console.error('No flight selected or user not logged in.');
    }
  }
}
