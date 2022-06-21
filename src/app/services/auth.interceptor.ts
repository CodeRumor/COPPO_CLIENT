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

  intercept(
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
