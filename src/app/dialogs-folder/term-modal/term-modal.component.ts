import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-term-modal',
  templateUrl: './term-modal.component.html',
  styleUrls: ['./term-modal.component.scss']
})
export class TermModalComponent {

  
  // @Output() clearInput = new EventEmitter<void>();
constructor(private dialogRef: MatDialogRef<TermModalComponent>,private router:Router){}


closeTermDialog(): void {
  this.dialogRef.close();
  this.router.navigate(['/home'])
  // this.clearInput.emit()
}

}
