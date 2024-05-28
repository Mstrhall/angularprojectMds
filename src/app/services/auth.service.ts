import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'http://localhost:8080';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router, private currentUserService: CurrentUserService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth`, { username, password }).pipe(
      tap(response => {

        const token = response.id_token;
        if (token) {
          localStorage.setItem(this.tokenKey, token);

        } else {
          console.error('Token is undefined in the API response.');
        }
      }),
      switchMap(() => this.currentUserService.fetchUserInfo())
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);

  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);

    return token;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
