import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class UserLoginInGuard implements CanActivate {
  state: any;
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Specifies the condition for which a given route should be accessible.
   * @param route contains the information about a route associated with a component.
   * @param state represents the state of the router at a particular moment in time.
   * @returns true if the conditions are met else false
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']).then(r => {console.log("navigating to home page")});
      return false;
    }

    return true;
  }
}
