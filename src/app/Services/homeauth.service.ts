import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HomeauthService {

  private termsForm!: FormGroup
  // !private formValid: boolean = false;

  constructor( ) { }

 

  setForm(form: FormGroup) {
    this.termsForm = form;
  }

  isFormValid(): boolean {
    return this.termsForm?.valid ?? false;
  }
 
}

