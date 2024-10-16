import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private verifiedUserId: string | null = null;

  private apiUrl = 'https://facotrader-backend.onrender.com/api';

  constructor(private router: Router, private http: HttpClient) { }

  register(fullname: string, nationality: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { fullname, nationality, email, password });
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        if (response && response.token) {
          console.log('Login response:', response);
          const token = response.token;
          localStorage.setItem('token', token);
          
          // Decode the token to extract the userId
          const userId = this.getUserIdFromToken(token);
          if (userId) {
            console.log('Extracted userId:', userId);
            localStorage.setItem('userId', userId);
          }

          this.isAuthenticated = true;
        }
        return response;
      }),
      catchError(error => {
        if (error.status === 404) {
          return of({ message: 'User not registered' });
        }
        return of({ message: 'Invalid credentials' });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Helper method to decode JWT token and extract userId
  private getUserIdFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || null;  // Assuming the userId is in the JWT payload
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  verifyUserId(userId: string): boolean {
    // Replace this logic with actual verification logic
    const expectedUserId = 'Romadona 10';
    if (userId.toLocaleLowerCase() === expectedUserId.toLocaleLowerCase()) {
      this.verifiedUserId = userId;
      return true;
    }
    return false;
  }

  isUserIdVerified(): boolean {
    return this.verifiedUserId !== null;
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
