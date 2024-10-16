import { CanActivate,Router } from '@angular/router';
import { HomeauthService } from '../Services/homeauth.service';
import { TermModalComponent } from '../dialogs-folder/term-modal/term-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

export class AuthGuard implements CanActivate {


  constructor(private homeauthService: HomeauthService, private router: Router, private dialog: MatDialog) {}

  canActivate(): boolean {
    if (this.homeauthService.isFormValid()) { 
      return true;
    } else {
      // Open the modal if the form is not valid
      this.dialog.open(TermModalComponent);
      return false;
    }
  }

 
}