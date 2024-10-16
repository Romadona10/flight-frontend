import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flightsApp';
  searchQuery: string = '';

  sidebarOpen: boolean = false;
  isMobile: boolean = window.innerWidth <= 768;

  currentTime!: Observable<Date>;
  currentDate!: Observable<Date>;

  constructor(private authService: AuthService, private router: Router,
    private snackBar: MatSnackBar,
  ) {
   
  }

  ngOnInit(): void {
    // Hide the sidebar on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideSidebar();
      }
    });

    this.currentTime = interval(1000).pipe(
      map(() => new Date())
    );

    this.currentDate = interval(1000).pipe(
      map(() => new Date())
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.sidebarOpen = true; // Ensure the sidebar is open on larger screens
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  
    if (this.sidebarOpen) {
      console.log('Sidebar is now open.');
    } else {
      console.log('Sidebar is now closed.');
    }
  }
  

  hideSidebar(): void {
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      const trimmedQuery = this.searchQuery.trim().toLowerCase();
      
      // Define a mapping of routes based on possible search queries
      const routesMap: { [key: string]: string } = {
       'booking details': 'flight-booking/booking-details',
      'seats': 'flight-booking/seats',
      'flight details': 'flight-booking/flight-details',
      'search flights': 'flight-booking/searchflights',
      'passenger info': 'flight-booking/passenger-info',
      'payment':'flight-booking/payment',
      'about': 'About',
      'user-profile': 'user-profile',
        // Add other routes as needed
      };

      
      if (routesMap[trimmedQuery]) {
       
        this.router.navigate([routesMap[trimmedQuery]]);
      } else {
        this.snackBar.open('No matching route found for:', trimmedQuery);
       
      }
    }
  }
}