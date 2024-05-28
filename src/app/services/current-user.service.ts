import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private apiUrl = 'http://localhost:8080/api/user';
  private userInfo: any;

  constructor(private http: HttpClient) { }

  fetchUserInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(user => {
        this.userInfo = user;

      })
    );
  }

  getUserInfo(): any {
    return this.userInfo;
  }

  getUserRole(): string {
    return this.userInfo?.authorities[0]?.authority || '';
  }

  isAdmin(): boolean {

    return this.getUserRole() === 'ROLE_ADMIN';
  }
}
