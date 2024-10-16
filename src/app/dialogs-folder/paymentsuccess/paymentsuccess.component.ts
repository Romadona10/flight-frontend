import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlightbookingstoreService } from 'src/app/Services/flightbookingstore.service';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.scss']
})
export class PaymentsuccessComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PaymentsuccessComponent>,
    private flightbookingstore: FlightbookingstoreService,
    private snackBar: MatSnackBar,
   
  ) {}

  
    isAnimationFinished = false;
  
    ngOnInit(): void {
      // After the spin completes (2s), we add the `finished` class to show the checkmark
      setTimeout(() => {
        this.isAnimationFinished = true;
      }, 4000); // Matches the duration of the spin animation
    }

  // Method to close the dialog
  closeDialog(): void {
    
    this.dialogRef.close();
    this.snackBar.open('View booked flights on User-profile', 'Close', { duration: 2000 });
  }

 
}
