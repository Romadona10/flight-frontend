import { Component,Output,EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-airports-found',
  templateUrl: './no-airports-found.component.html',
  styleUrls: ['./no-airports-found.component.scss']
})
export class NoAirportsFoundComponent {

   @Output() clearInput = new EventEmitter<void>();
  constructor(public dialogRef: MatDialogRef<NoAirportsFoundComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
    this.clearInput.emit()
  }
}
