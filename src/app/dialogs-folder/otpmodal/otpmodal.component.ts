import { Component,Inject,inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-otpmodal',
  templateUrl: './otpmodal.component.html',
  styleUrls: ['./otpmodal.component.scss']
})
export class OtpmodalComponent implements OnInit {

  countdown: number = 59;
  countdownValue: number = 100; // For the spinner percentage
  otp: string = '';
  otpGenerated: boolean = false;
  // otpCopied: boolean = false;
  copySuccess: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<OtpmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    const interval = setInterval(() => {
      this.countdown--;
      this.countdownValue = (this.countdown / 59) * 100;

      if (this.countdown === 0) {
        clearInterval(interval);
        if (!this.copySuccess) {
          this.copySuccess = true; // Mark OTP as "copied" if countdown ends
          this.dialogRef.close({ otpCopied: this.copyOtp, otp: this.otp });
        }
      }

      // Simulate OTP appearance randomly within 59 seconds
      if (!this.otpGenerated && this.countdown <= Math.floor(Math.random() * 59)) {
        this.otp = this.generateOtp();
        this.otpGenerated = true;
      }
    }, 1000);
  }

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  copyOtp(): void {
    if (this.otp) {
      navigator.clipboard.writeText(this.otp).then(() => {
        this.copySuccess = true;
        // Pass OTP back to Payment Component before closing
        this.dialogRef.close({ otpCopied: true, otp: this.otp }); // Pass OTP as data when closing
      });
    }
  }


}
