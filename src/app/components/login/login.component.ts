import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { RegisterService } from 'src/app/Services/register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private backgroundImages: string[] = [
    '../assets/plane1.webp',
    '../assets/plane4.webp',
    '../assets/plane5.jpg',
    '../assets/plane6.jpg',
    '../assets/plane8.jpg'
  ];

  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  countries: any[] = [];
  hidePassword: boolean = true;
  private currentIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      nationality: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loadCountries();
    this.changeBackground()
  }

  changeBackground() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.backgroundImages.length;
      const loginWrapper = document.querySelector('.login-wrapper') as HTMLElement;
      if (loginWrapper) {
        loginWrapper.style.backgroundImage = `url(${this.backgroundImages[this.currentIndex]})`;
      }
    }, 3000); // Change image every 3 seconds
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  loadCountries(): void {
    this.registerService.getCountries().subscribe(
      (data: any[]) => {
        this.countries = data;
      },
      error => {
        console.log('Unable to fetch country data', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      setTimeout(() => {
      this.authService.login(email, password).subscribe(
        response => {
          this.isLoading = false;
          console.log('Response:', response); // Debugging line
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.snackBar.open('Login Successful', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['/home'],{ queryParams: { userId: response.userId } });
          } else if  (response.message === 'User not registered') {
            this.snackBar.open('You are not registered yet, switch to register', 'Close', {
              duration: 8000,
              panelClass: ['error-snackbar']
            });
          } else  {
            this.snackBar.open('Invalid credentials', 'Retry', {
              duration: 8000,
              panelClass: ['error-snackbar']
            });
          }
        },
        error => {
          this.isLoading = false;
          this.snackBar.open('An error occurred', 'Retry', {
            duration: 8000,
            panelClass: ['error-snackbar']
          });
        }
      );
    }, 4000);
    }
  }
  

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  register(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { fullName, nationality, email, password } = this.registerForm.value;
      
      setTimeout(() => {
        this.authService.register(fullName, nationality, email, password).subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open('Registration Successful', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.toggleMode(); // Switch to login mode after successful registration
          },
          error => {
            this.isLoading = false;
            if (error.status === 400 && error.error.message === 'Email already in use') {
              this.snackBar.open('Email already in use. Please try a different email.', 'Close', {
                duration: 8000,
                panelClass: ['error-snackbar']
              });
            } else {
              this.snackBar.open('Registration failed. Please try again.', 'Retry', {
                duration: 8000,
                panelClass: ['error-snackbar']
              });
            }
          }
        );
      }, 4000);
    }
  }
  
}
