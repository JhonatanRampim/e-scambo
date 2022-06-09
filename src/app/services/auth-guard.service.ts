import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    if (!user) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
    this.authService.check().subscribe((res) => true,
      (error) => {
        if (error) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return false;
        }
      });
    return true;
  }
}
