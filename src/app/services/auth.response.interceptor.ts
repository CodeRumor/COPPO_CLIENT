import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthResponseInterceptor implements HttpInterceptor {
  currentRequest?: HttpRequest<any>;
  auth?: AuthService;

  constructor(private injector: Injector, private router: Router) {}

  /**
   * Check if a token a exist and do nothing if it does
   */
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.auth = this.injector.get(AuthService);
    const token = this.auth.isLoggedIn() ? this.auth.getAuth()!.token : null;

    if (token) {
      this.currentRequest = request;

      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('The event is part of Http response');
          }
        }),

        catchError((error) => {
          return this.handleError(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }

  /**
   * Check to make sure the error matches HttpError response with status code of 401
   * If the error matches refresh the token using the refreshToken method.
   * If successful we resubmit the request that triggered the response error which we saw.
   * If it is not successful we perform a logout and clear al the expired tokens from the local storage.
   * then redirect the user back to the login page.
   */
  private handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        console.log('Token has expired try refreshing.....');
        this.auth!.refreshToken().subscribe({
          next: this.getNext(),
          error: this.getError(),
        });
      }
    }
    return new Observable<any>(err);
  }

  /**
   * Log any errors that occur.
   */
  private getError() {
    return (error: any) => {
      console.log(error);
    };
  }

  /**
   * Attempt to resubmit the request if that fails then log failed and return
   * to the login page.
   */
  private getNext(): any {
    return (res: any) => {
      if (res) {
        console.log('refresh token successful');

        const http = this.injector.get(HttpClient);
        http.request(this.currentRequest!).subscribe({
          next: () => {
            console.log('resubmitting the request');
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        console.log('refresh token failed');
        this.auth!.logout();
        this.router.navigate(['login']);
      }
    };
  }
}
