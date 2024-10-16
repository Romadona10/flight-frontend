import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  private apiUrl = 'http://localhost:5000/api/searchFlights';

  constructor(private http:HttpClient) { }

  SearchFlights(departureCity: string, arrivalCity: string, departureDate: string):Observable <any>{
     return this.http.post<any>(this.apiUrl,{departureCity,arrivalCity,departureDate})
  }

    // Book a flight
    bookFlight(bookingData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/bookFlight`, bookingData);
    }
  
    // Make a payment
    makePayment(paymentData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/makePayment`, paymentData);
    }
  
    // Get booking and payment details
    getBookingDetails(bookingId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/getBookingDetails/${bookingId}`);
    }
}
