import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatwarningComponent } from 'src/app/dialogs-folder/seatwarning/seatwarning.component';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  seats: any[] = [];
  selectedSeats: any[] = [];
  rows: number = 10;
  columns: number = 6;
  totalPassengers: number = 1;
  userId = this.authservice.getUserId(); // Retrieve from authservice directly

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get totalPassengers from queryParams
    this.route.queryParams.subscribe(params => {
      this.totalPassengers = +params['totalPassengers'] || 1;
    });
    this.initializeSeats();
  }

  initializeSeats(): void {
    let seatNumber = 1;
    for (let i = 0; i < this.rows; i++) {
      this.seats[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.seats[i][j] = {
          row: seatNumber++,  // Sequential seat numbering
          column: this.getColumnLabel(j),  // Column letter (A, B, C...)
          isSelected: false,
          isAvailable: Math.random() > 0.2 // Randomly mark some seats unavailable
        };
      }
    }
  }

  getColumnLabel(columnIndex: number): string {
    return String.fromCharCode(65 + columnIndex); // A, B, C, etc.
  }

  getSeatImage(seat: any): string {
    // Return appropriate seat image based on availability and selection
    if (!seat.isAvailable) {
      return 'assets/seat-unavailable.png';
    } else if (seat.isSelected) {
      return 'assets/selected-seats.png';
    } else {
      return 'assets/available-seats.png';
    }
  }

  toggleSeatSelection(seat: any): void {
    if (!seat.isAvailable) {
      this.snackBar.open('Seat is not available', 'Close', { duration: 2000 });
      return;
    }

    if (seat.isSelected) {
      seat.isSelected = false;
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      if (this.selectedSeats.length < this.totalPassengers) {
        seat.isSelected = true;
        this.selectedSeats.push(seat);
      } else {
        this.snackBar.open(`You can only select up to ${this.totalPassengers} seats`, 'Close', { duration: 2000 });
      }
    }
  }

  confirmSelection(): void {
    if (this.selectedSeats.length === this.totalPassengers) {
      // Collect all necessary details from queryParams
      const flightDetails = this.route.snapshot.queryParams;
      const selectedSeatNumbers = this.selectedSeats
        .map(seat => `${seat.row}${seat.column}`) // Removed dash between seat number and column
        .join(',');

      // Navigate to payment route with selected seats and other details
      this.router.navigate(['flight-booking/payment'], {
        queryParams: {
          totalPassengers: this.totalPassengers,
          departureAirport: flightDetails['departureAirportName'],
          arrivalAirport: flightDetails['arrivalAirportName'],
          flightCompany: flightDetails['flightCompany'],
          price: flightDetails['price'],
          departureTime: flightDetails['departureTime'],
          arrivalTime: flightDetails['arrivalTime'],
          selectedSeats: selectedSeatNumbers,
          userId: this.userId // Using authservice userId
        }
      });
    } else {
      this.showSeatCountWarning(`Please select ${this.totalPassengers} seats before proceeding.`);
    }
  }

  showSeatCountWarning(message: string): void {
    this.dialog.open(SeatwarningComponent, {
      data: { message }, // Pass the message to the modal
      disableClose: true
    });
  }
}
