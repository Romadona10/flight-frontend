// flightbookingstore.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class FlightbookingstoreService {

  private apiUrl = 'https://flight-backend-oabf.onrender.com/api/flights'; // Your API URL

  constructor(private http:HttpClient,
  private authService: AuthService) {}



  getBookedFlights(): Observable<any> {
    const userId = this.authService.getUserId(); // Get userId from AuthService
    console.log('Fetching booked flights for userId:', userId);
    if (!userId) {
      return throwError(() => new Error('User ID is not available.'));
    }
    return this.http.get(`${this.apiUrl}/bookings/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching bookings:', error);
        return throwError(() => new Error('Failed to retrieve bookings'));
      })
    );
  }

 
 
  

  // Store the booking after payment
 
storeBooking(bookingData: any): Observable<any> {
  console.log("Attempting to store booking:", bookingData); 
  return this.http.post(`${this.apiUrl}/book`, bookingData).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error storing booking:', error.message, error); 
      return throwError(() => new Error('Failed to store booking'));
    })
  );
}


  // Delete a flight booking by its document ID
  deleteFlight(flightId: string): Observable<any> {
    console.log('delete captured');
    
    return this.http.delete(`${this.apiUrl}/book/${flightId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting booking:', error);
        return throwError(() => new Error('Failed to delete booking'));
      })
    );
  }
}
