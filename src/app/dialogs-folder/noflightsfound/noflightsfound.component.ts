import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-noflightsfound',
  templateUrl: './noflightsfound.component.html',
  styleUrls: ['./noflightsfound.component.scss']
})
export class NoflightsfoundComponent {

  constructor(public dialogRef: MatDialogRef<NoflightsfoundComponent>) {}




  closeDialog(){
    this.dialogRef.close();
  }

}
