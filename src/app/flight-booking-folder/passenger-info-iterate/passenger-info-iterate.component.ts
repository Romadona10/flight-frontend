import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-passenger-info-iterate',
  templateUrl: './passenger-info-iterate.component.html',
  styleUrls: ['./passenger-info-iterate.component.scss']
})
export class PassengerInfoIterateComponent implements OnInit {

  @Input() passengerFormGroup!: FormGroup;
  @Input() index!: number;

  titles: string[] = ['Mr', 'Ms', 'Mrs', 'Dr'];
  Gender: string[] = ['Male', 'Female'];
  countries: any[] = [];
  callCodes: string[] = [];

  constructor(private fb: FormBuilder, private registerService: RegisterService) {}

  ngOnInit(): void {
    console.log('Passenger Form Group Initialized:', this.passengerFormGroup);
  
    if (!this.passengerFormGroup) {
      this.passengerFormGroup = this.fb.group({
        title: ['', Validators.required],
        Gender: ['', Validators.required],
        firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
        surName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
        dateOfBirth: ['', Validators.required],
        passportNumber: ['', [Validators.required, Validators.pattern('[A-Z0-9]+')]],
        nationality: ['', Validators.required],
        callCode: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [
          Validators.required,
          Validators.pattern(/^(?:\+234|0)[789]\d{9}$/)
        ]],
      });
      
    } 

    this.loadCountries();
    this.getCallCodes();
  }
  
  

  loadCountries(): void {
    this.registerService.getCountries().subscribe(
      (data: any[]) => {
        this.countries = data;
  
        // Set Nigeria as the default country
        const nigeria = this.countries.find(country => country.name.common === 'Nigeria');
        if (nigeria) {
          this.passengerFormGroup.patchValue({ nationality: nigeria.name.common });
        }
      },
      error => {
        console.log('Unable to fetch country data', error);
      }
    );
  }

  getCallCodes() {
    this.registerService.getCountryCallCodes().subscribe((data: any[]) => {
      this.callCodes = data
        .filter(country => country.idd?.root && country.idd?.suffixes)
        .map(country => `${country.idd.root}${country.idd.suffixes[0]}`);

      // Set Nigeria's call code (+234) as the default
      const nigeriaCode = this.callCodes.find(code => code === '+234');
      this.passengerFormGroup.patchValue({ callCode: nigeriaCode || '' });
    });
  }
}
