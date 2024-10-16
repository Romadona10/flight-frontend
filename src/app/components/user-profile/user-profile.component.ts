import { Component, OnInit } from '@angular/core';
import { FlightbookingstoreService } from 'src/app/Services/flightbookingstore.service';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  bookedFlights: any[] = [];  // Store the booked flights
  isLoading = true;  // State to control the progress bar

  constructor(
    private flightbookingstore: FlightbookingstoreService,
    private authservice: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const userId = this.authservice.getUserId();  // Check for valid userId
    console.log('User ID in UserProfileComponent:', userId);

    if (userId) {
      // Simulate data fetching with a 5-second delay for progress bar
      of(null).pipe(delay(5000)).subscribe(() => {
        this.flightbookingstore.getBookedFlights().subscribe(
          (data) => {
            this.bookedFlights = data;
            console.log("Bookings data:", this.bookedFlights);
            this.isLoading = false;  // Hide progress bar once data is fetched
          },
          (error) => {
            this.isLoading = false;  // Hide progress bar on error
            alert('An error occurred while fetching the bookings.');
            console.error("Error fetching bookings:", error);
          }
        );
      });
    } else {
      this.isLoading = false;  // Hide progress bar if no user ID found
      this.snackBar.open('User ID not found. Please log in.', 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
  }

  deleteFlight(flightId: string) {
    this.flightbookingstore.deleteFlight(flightId).subscribe(
      () => {
        this.bookedFlights = this.bookedFlights.filter(flight => flight._id !== flightId);
        this.snackBar.open('Booked-flight deleted successfully', 'undo', {
          duration: 6000
        });
      },
      (error) => {
        console.error("Error deleting flight:", error);
      }
    );
  }
}
