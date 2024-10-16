import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoadingmodalComponent } from 'src/app/dialogs-folder/loadingmodal/loadingmodal.component';
import { PaymentsuccessComponent } from 'src/app/dialogs-folder/paymentsuccess/paymentsuccess.component';
import { FlightbookingstoreService } from 'src/app/Services/flightbookingstore.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { OtpmodalComponent } from 'src/app/dialogs-folder/otpmodal/otpmodal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  bookingData: any;

  userId = this.authservice.getUserId();
  countdown: number = 59;
  countdownValue: number = 100; // For the spinner
  paymentForm!: FormGroup;
  otpForm!: FormGroup;
  cardImage: string = '';
  otpGenerated: boolean = false;
  generatedOtp: string = '';
  otpModalVisible: boolean = false;
  otpCopied: boolean = false;
  showOtpForm: boolean = false;

  // Data passed from flight details
  totalPassengers: number = 0;
  selectedDepartureAirport: string = '';
  selectedArrivalAirport: string = '';
  flightCompany: string = '';  // To be passed from flight details
  selectedSeats: string[] = []; // Selected seats from seat-selection component
  departureTime: string = '';  // Actual flight departure time
  arrivalTime: string = '';    // Actual flight arrival time
  price: number = 0;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authservice: AuthService,
    private flightbookingstore: FlightbookingstoreService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // Fetch user ID from the auth service
    this.userId = this.authservice.getUserId() || '';

    // Subscribe to query parameters
    this.route.queryParams.subscribe(params => {
      this.totalPassengers = +params['totalPassengers'] || 0;
      this.selectedDepartureAirport = params['departureAirport'] || '';
      this.selectedArrivalAirport = params['arrivalAirport'] || '';
      this.flightCompany = params['flightCompany'] || '';
      this.price = +params['price'] || 0;
      this.departureTime = params['departureTime'] || ''; // Ensure proper format
      this.arrivalTime = params['arrivalTime'] || '';     // Ensure proper format
      this.selectedSeats = params['selectedSeats'] ? params['selectedSeats'].split(',') : [];
      this.bookingData = {
        totalPassengers: this.totalPassengers,
        selectedDepartureAirport: this.selectedDepartureAirport,
        selectedArrivalAirport: this.selectedArrivalAirport,
        flightCompany: this.flightCompany,
        price: this.price,
        departureTime: this.departureTime,
        arrivalTime: this.arrivalTime,
        selectedSeats: this.selectedSeats,
        userId: this.userId
      };
    });

    // Initialize the payment form
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      cardHolderName: ['', Validators.required],
      expirationDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\/?([0-9]{2})')]],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]]
    });

    // Initialize the OTP form
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('[0-9]{6}')]]
    });

    // Detect card type based on card number
    this.paymentForm.get('cardNumber')?.valueChanges.subscribe(value => {
      this.detectCardType(value);
    });

    // Auto-format expiration date
    this.paymentForm.get('expirationDate')?.valueChanges.subscribe(value => {
      this.formatExpirationDate(value);
    });

    // Ensure CVV has a max length of 3
    this.paymentForm.get('cvv')?.valueChanges.subscribe(value => {
      if (value.length > 3) {
        this.paymentForm.patchValue({ cvv: value.slice(0, 3) }, { emitEvent: false });
      }
    });
  }

  detectCardType(cardNumber: string): void {
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const masterCardPattern = /^5[1-5][0-9]{14}$/;

    if (visaPattern.test(cardNumber)) {
      this.cardImage = 'assets/visa.png';
    } else if (masterCardPattern.test(cardNumber)) {
      this.cardImage = 'assets/mastercard.png';
    } else {
      this.cardImage = '';
    }
  }

  formatExpirationDate(value: string): void {
    if (value && value.length === 2 && !value.includes('/')) {
      this.paymentForm.patchValue({ expirationDate: `${value}/` }, { emitEvent: false });
    }
  }

  onSubmit(): void {
    console.log('Payment form submitted');
    if (this.paymentForm.valid) {
      this.openOtpModal();
      this.otpGenerated = true;
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  openOtpModal(): void {
    const dialogRef = this.dialog.open(OtpmodalComponent, {
      disableClose: true,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.otpCopied) {
        this.generatedOtp = result.otp;
        this.showOtpForm = true; // Show OTP form after OTP copied or countdown finishes
      
      setTimeout(() => {
        dialogRef.close(); // Close the dialog
      }, 2000); // Wait for 2000 milliseconds (2 seconds)
    }
    });
  }

  onOtpSubmit(): void {
    console.log('OTP form submission, booking process initiated');
    this.otpForm.markAllAsTouched(); 
    if (this.otpForm.valid) {
      const enteredOtp = this.otpForm.get('otp')?.value;

      if (enteredOtp === this.generatedOtp) {
        console.log('OTP validated successfully.');

        // Store booking data
        this.processBooking();
      } else {
        console.log('OTP validation failed.');
        this.otpForm.get('otp')?.setErrors({ incorrect: true });
      }
    }
  }

  processBooking() {
    console.log('Attempting to store booking.');

    // Validate the time format (HH:mm)
   

   

    // Prepare the booking payload
    const bookingPayload = {
      flightCompany: this.flightCompany,
      departureAirport: this.selectedDepartureAirport,
      arrivalAirport: this.selectedArrivalAirport,
      departureTime: this.departureTime, // Send ISO formatted time
      arrivalTime: this.arrivalTime,     // Send ISO formatted time
      totalPassengers: this.totalPassengers,
      selectedSeats: this.selectedSeats,
      price: this.price,
      userId: this.authservice.getUserId()
    };

    // Call storeBooking with the new payload
    this.flightbookingstore.storeBooking(bookingPayload).subscribe({
      next: (response) => {
        console.log('Booking stored successfully:', response);
        this.openLoadingAndSuccessModal(); // Open modal after successful booking storage
      },
      error: (error) => {
        console.error('Error storing booking:', error);
        this.snackBar.open('Error storing booking: ','Are you sure you booked a flight?' + JSON.stringify(error));
        
      }
    });
  }

  openLoadingAndSuccessModal(): void {
    const loadingDialogRef = this.dialog.open(LoadingmodalComponent, {
      disableClose: true,
      panelClass: 'center-modal'
    });

    // Simulate loading process
    setTimeout(() => {
      loadingDialogRef.close();

      const successDialogRef = this.dialog.open(PaymentsuccessComponent, {
        disableClose: true,
        panelClass: 'center-modal'
      });

      successDialogRef.afterClosed().subscribe(() => {
        console.log('Paymentsuccess modal closed.');
      });

    }, 4000); // Simulate 4 seconds delay for loading
  }
}
