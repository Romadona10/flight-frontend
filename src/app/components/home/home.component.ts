import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HomeauthService } from 'src/app/Services/homeauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  termsForm!: FormGroup;
  userId: string | null = null;

  constructor(private fb: FormBuilder,
     private router: Router,
     private route: ActivatedRoute,
     private homeauthService:HomeauthService) {    }
  ngOnInit(): void {
    this.termsForm = this.fb.group({
      agree1: [false, Validators.requiredTrue],
      agree2: [false, Validators.requiredTrue],
      agree3: [false, Validators.requiredTrue]
    });
    this.homeauthService.setForm(this.termsForm);
     // Get the userId from query params passed from login
     this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  proceed() {
    if (this.termsForm.valid) {
      this.router.navigate(['flight-booking/booking-details'], {
        queryParams: { userId: this.userId } // Passing userId as query param
      });
    }
   
  }
}

