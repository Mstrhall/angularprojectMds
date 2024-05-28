import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private currentUserService: CurrentUserService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.currentUserService.isAdmin()) {

      return true;

    } else {

      this.router.navigate(['/login']);
      return false;
    }
  }
}
