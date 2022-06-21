import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenResponse } from '../interfaces/token.response';
import { map } from 'rxjs/operators';
import { UserRightsService } from './user.rights.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authKey: string = 'auth';
  clientId: string = 'Coppo';
  state: any;

  AUTH_URL: string = 'http://localhost:8080/api/v1.0/Tokens/Auth/';

  constructor(
    private http: HttpClient,
    private userRightsService: UserRightsService
  ) {}

  /**
   * Sets authentication token to local storage.
   * if auth exists persist auth into localStorage or remove it if a NULL
   * argument is given.
   */
  setAuth(auth: TokenResponse | null) {
    if (auth) {
      localStorage.setItem(this.authKey, JSON.stringify(auth));
      this.userRightsService.setUserInfor();
    } else {
      localStorage.removeItem(this.authKey);
    }
    return true;
  }

  /**
   * Get the authentication token that exist inside localStorage
   * Return null if no token exits.
   */
  getAuth(): TokenResponse | null {
    const i = localStorage.getItem(this.authKey);
    if (i) {
      return JSON.parse(i);
    } else {
      return null;
    }
  }

  /**
   * Retrieve the access token from the server
   * If the token exists then the login has been successful so return true.
   * If the token doesn't not exist then the login has not been successful hence throw an error
   */
  getAuthFromServer(url: string, data: any): Observable<boolean> {
    return this.http.post<TokenResponse>(url, data).pipe(
      map((res) => {
        let token = res && res.token;
        if (token) {
          this.setAuth(res);
          return true;
        }

        return new Error('Unauthorized');
      }),

      catchError((error) => {
        console.log(error);
        return new Observable<any>(error);
      })
    );
  }

  /**
   * Log the user to the application by passing user name and password.
   */
  login(username: string, password: string): Observable<boolean> {
    return this.getAuthFromServer(this.AUTH_URL, {
      grantType: 'password',
      clientId: this.clientId,
      clientSecret: this.clientId,
      username: username,
      password: password,
      refreshToken: 'this.getAuth()!.token',
    });
  }

  /**
   * Determine if the user has been logged in return true if the user is logged in
   * else return false.
   */
  isLoggedIn(): boolean {
    return localStorage.getItem(this.authKey) != null;
  }

  /**
   * Log the user out of the application by setting the auth token value to null
   * Return true if the process is successful.
   */
  logout(): boolean {
    this.setAuth(null);
    return true;
  }

  /**
   * Create a refresh token based on the client information.
   */
  refreshToken(): Observable<boolean> {
    return this.getAuthFromServer(this.AUTH_URL, {
      client_id: this.clientId,
      grant_type: 'refresh_token',
      refresh_token: this.getAuth()!.refresh_token,
      scope: 'offline_access profile email',
    });
  }
}
