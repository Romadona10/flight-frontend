import { Component, OnInit, ElementRef, ViewChild,AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  displayedText: string = '';  // Holds the displayed typing effect text
  fullMessage: string = '';  // Full message to display
  currentCharIndex: number = 0;  // Track the index of the current letter
  typingInterval: any;
  selectedOption:string=''
  emergencyMessage: string = 'Dear valued customer, how can I be of help?';
  generalResponseMessage: string = 'RomadonaAir Services is currently addressing your concern. Please hold on...';  // General message
  Email: string='okekekingsley558@gmail.com'

  // For smooth scroll
  
  constructor(private dialogRef: MatDialogRef<BookingConfirmationComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {}

 

  closeMenu(): void {
    // Logic to close the menu (optional, if you're using Angular Material)
    // This method will just trigger a change detection to update the view.
    this.cdr.detectChanges(); 
  }

  handleOptionChange(option: string): void {
    this.selectedOption = option;

    if (option === 'emergency') {
      this.fullMessage = this.emergencyMessage;
      this.startTypingEffect();
    } else if (option === 'general') {
      this.displayedText = '';  // Clear the message for general options until user selects an issue
      clearInterval(this.typingInterval);
    } else {
      this.displayedText = '';
      clearInterval(this.typingInterval);
    }
  }

  handleGeneralIssue(issue: string): void {
    this.fullMessage = `Regarding "${issue}": ${this.generalResponseMessage}`;
    this.startTypingEffect();
  }

  startTypingEffect(): void {
    this.displayedText = '';
    this.currentCharIndex = 0;

    // Clear any existing typing intervals
    clearInterval(this.typingInterval);

    // Start typing effect
    this.typingInterval = setInterval(() => {
      if (this.currentCharIndex < this.fullMessage.length) {
        this.displayedText += this.fullMessage.charAt(this.currentCharIndex);
        this.currentCharIndex++;
        
        
      } else {
        clearInterval(this.typingInterval);
      }
    }, 100);  // Adjust typing speed by changing the interval duration (100ms)
  }



  closeModal(): void {
    this.dialogRef.close();
  }

}
