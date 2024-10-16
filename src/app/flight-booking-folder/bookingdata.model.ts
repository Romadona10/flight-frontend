export interface BookingData {
  userId: string; // Ensure userId is part of the booking data
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  passengerLabel: string;
  flightCompany: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  selectedSeats: string[];
  totalPassengers: number;
}

 
  