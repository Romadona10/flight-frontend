import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seatwarning',
  templateUrl: './seatwarning.component.html',
  styleUrls: ['./seatwarning.component.scss']
})
export class SeatwarningComponent {
  constructor(
    public dialogRef: MatDialogRef<SeatwarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
