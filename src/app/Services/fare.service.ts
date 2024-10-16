import { Injectable } from '@angular/core';

interface FlightDetails {
  company: string;
  airlineName: string;
  logoUrl: string;
  fare: number;
  departureTime: string;
  arrivalTime: string;
  estimatedTime: number; // Added to include estimated flight time
}

@Injectable({
  providedIn: 'root'
})
export class FareService {

  private airlines = [
    { name: 'AirPeace', logo: 'assets/airpeace.png' },
    { name: 'DanaAir', logo: 'assets/arik-logo.png' },
    { name: 'Arik-Air', logo: 'assets/dana.png' },
  ];

  constructor() { }

  calculateFare(departureCity: string, arrivalCity: string, company: string): number {
    let baseFare = 10000; // Example base fare
    if (company === 'AirPeace') {
      baseFare += 2000;
    } else if (company === 'DanaAir') {
      baseFare += 1500;
    } else if (company === 'Arik-Air') {
      baseFare += 1000;
    }
    return baseFare;
  }

  calculateEstimatedTime(departureCity: string, arrivalCity: string, company: string): number {
    const distance = this.getDistance(departureCity, arrivalCity);
    return distance / 500; // Example calculation based on speed (500 km/h)
  }

  getDepartureTime(departureCity: string): string {
    // Mock value for demonstration purposes
    return '10:00 AM';
  }

  getArrivalTime(arrivalCity: string): string {
    // Mock value for demonstration purposes
    return '2:00 PM';
  }

  getAvailableFlights(departureCity: string, arrivalCity: string): FlightDetails[] {
    console.log('Fetching available flights from', departureCity, 'to', arrivalCity);
    return this.airlines.map(airline => {
        const baseFare = this.calculateFare(departureCity, arrivalCity, airline.name);
        const variability = Math.random() * 1000; // Adds random variability to fares
        const finalFare = baseFare + variability;

        return {
            company: airline.name,
            airlineName: airline.name,
            logoUrl: airline.logo,
            fare: finalFare,
            departureTime: this.getDepartureTime(departureCity),
            arrivalTime: this.getArrivalTime(arrivalCity),
            estimatedTime: this.calculateEstimatedTime(departureCity, arrivalCity, airline.name) // Estimated flight time
        };
    });
  }

  private getDistance(departureCity: string, arrivalCity: string): number {
    // Mock function to calculate distance between cities
    return Math.random() * 1000 + 500; // Random distance between 500 and 1500 km
  }
}
