import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import {
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  /**
   * The aim of this method is to change the outgoing request to include the token that we have just obtain
   * and pass this token along side the authorization header.
   * @param request to be modified and include a token to.
   * @param next to be used a way to pass controll to the next interceptor in the chain if there is any.
   * @returns controll to the next interceptor in the chain if there is any.
   */
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    const token = auth.isLoggedIn() ? auth.getAuth()!.token : null;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
