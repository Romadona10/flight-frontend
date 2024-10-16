import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.scss']
})
export class PassengerInfoComponent implements OnInit {

  passengerForm!: FormGroup;
  userId = this.authservice.getUserId(); // Retrieve userId directly from the AuthService

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const totalPassengers = +params['totalPassengers'] || 0;
      
      if (totalPassengers > 0) {
        this.initializeForm(totalPassengers);
      } else {
        // Handle case when totalPassengers is not provided or invalid
        console.error('Invalid number of passengers');
        this.snackBar.open('Invalid number of passengers. Please start the booking process again.', 'Close', {
          duration: 5000
        });
        this.router.navigate(['/flight-booking/booking-details']);
      }
    });

    // Always update userId from AuthService
    this.userId = this.authservice.getUserId();
  }

  private initializeForm(totalPassengers: number): void {
    this.passengerForm = this.fb.group({
      passengers: this.fb.array([])
    });

    this.generatePassengerForms(totalPassengers);
  }

  get passengers(): FormArray {
    return this.passengerForm.get('passengers') as FormArray;
  }

  private generatePassengerForms(totalPassengers: number): void {
    for (let i = 0; i < totalPassengers; i++) {
      this.passengers.push(this.createPassengerFormGroup(i));
    }
  }

  private createPassengerFormGroup(index: number): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      Gender: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      surName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      dateOfBirth: ['', Validators.required],
      passportNumber: ['', [Validators.required, Validators.pattern('[A-Z0-9]+')]],
      nationality: ['', Validators.required],
      callCode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(?:\+234|0)[789]\d{9}$/)]],
    });
  }

  getPassengerFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  onSubmit(): void {
    if (this.passengerForm.valid) {
      const totalPassengers = this.passengers.length;
      // Get necessary flight details from query params
      const flightDetails = this.route.snapshot.queryParams;
      
      // Retrieve userId from AuthService
      this.userId = this.authservice.getUserId();
      
      // Proceed to seat selection component
      this.router.navigate(['flight-booking/seats'], {
        queryParams: {
          totalPassengers: totalPassengers,
          departureAirportName: flightDetails['departureAirportName'],
          arrivalAirportName: flightDetails['arrivalAirportName'],
          flightCompany: flightDetails['flightCompany'],
          price: flightDetails['price'],
          departureTime: flightDetails['departureTime'],
          arrivalTime: flightDetails['arrivalTime'],
          userId: this.userId // Always use userId from AuthService
        }
      });
    } else {
      this.passengerForm.markAllAsTouched();
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', { duration: 3000 });
    }
  }
}
