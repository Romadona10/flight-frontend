import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HomeauthService } from '../Services/homeauth.service';
import { TermModalComponent } from '../dialogs-folder/term-modal/term-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private homeauthService:HomeauthService,
     private router: Router,
    private dialog: MatDialog,){}


    // navigateTo(route: string) {
    //   if (this.homeauthService.isFormValid()) {
    //     this.router.navigate([route]);
    //   } else {
    //     this.dialog.open(TermModalComponent);
    //   }
    // }

    // navigateTo(route: string) {
    //   if (this.homeauthService.isFormValid()) {
    //     this.router.navigate([route]);
    //   } else {
    //     this.dialog.open(TermModalComponent, {
    //       width: '300px',
    //       data: { message: 'Please accept our terms to proceed.' }
    //     });
    //   }
    // }

    navigateTo(route: string) {
      if (this.homeauthService.isFormValid()) {
        this.router.navigate([route]);
      } else {
        this.openTermsModal(); // Ensure this function opens the TermModalComponent
      }
    }
    
    openTermsModal() {
      this.dialog.open(TermModalComponent, { disableClose: true });
    }

}
