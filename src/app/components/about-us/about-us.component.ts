import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingConfirmationComponent } from '../booking-confirmation/booking-confirmation.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  constructor(private dialog: MatDialog) {}

  openCustomerSupport(): void {
    this.dialog.open(BookingConfirmationComponent, {
      // width: '400px'
    });
  }

}
