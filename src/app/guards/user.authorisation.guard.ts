import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStateService } from '../services/user.state.service';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class UserAuthorisationGuard implements CanActivate {
  state: any;
  constructor(
    private userState: UserStateService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn() == false) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
