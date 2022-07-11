import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenResponse } from '../interfaces/token.response';
import { map } from 'rxjs/operators';
import { UserInforService } from './user.info.service';
import { COMMON } from '../common';
import { SettingService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authKey: string = 'auth';
  clientId: string = 'Coppo';
  state: any;

  AUTH_URL: string = this.settings.getTokenUrl() + '/Auth';

  constructor(
    private http: HttpClient,
    private userInforService: UserInforService,
    private settings: SettingService
  ) {}

  /**
   * Get the authentication token that exist inside localStorage
   * Return null if no token exits.
   */
  public getAuth(): TokenResponse | null {
    const i = localStorage.getItem(this.authKey);
    if (i) {
      return JSON.parse(i);
    } else {
      return null;
    }
  }

  /**
   * Log the user to the application by passing user name and password.
   * @param username the user name for the user begin logged in.
   * @param password the password for the user begin logged in
   * @returns true if successfull else false.
   */
  public login(username: string, password: string): Observable<boolean> {
    return this.getAuthFromServer(this.AUTH_URL, {
      grantType: COMMON.GRANT_TYPE_LOGIN,
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
  public isLoggedIn(): boolean {
    return localStorage.getItem(this.authKey) != null;
  }

  /**
   * Determine if the user that has logged in is an admin user.
   * @returns true if the user that has logged in is an admin else false
   */
  public isLoggedInAsAdmin(): boolean {
    return this.userInforService.getUserDetail().type == COMMON.AdminUser;
  }

  /**
   * Log the user out of the application by setting the auth token value to null
   * Return true if the process is successful.
   */
  public logout(): boolean {
    this.setAuth(null);
    return true;
  }

  /**
   * Create a refresh token based on the client information.
   */
  public refreshToken(): Observable<boolean> {
    return this.getAuthFromServer(this.AUTH_URL, {
      client_id: this.clientId,
      grant_type: COMMON.GRANT_TYPE_REFRESH,
      refresh_token: this.getAuth()!.refresh_token,
      scope: 'offline_access profile email',
    });
  }

  /**
   * Sets authentication token to local storage.
   * if auth exists persist auth into localStorage or remove it if a NULL
   * argument is given.
   * @param auth the token response being set.
   * @returns
   */
  private setAuth(auth: TokenResponse | null) {
    if (auth) {
      localStorage.setItem(this.authKey, JSON.stringify(auth));
      this.userInforService.setCurrentUser();
    } else {
      localStorage.removeItem(this.authKey);
    }
    return true;
  }

  /**
   * Retrieve the access token from the server
   * If the token exists then the login has been successful so return true.
   * If the token doesn't not exist then the login has not been successful hence throw an error
   * @param url the URL for which Auth is begin obtain
   * @param data
   * @returns
   */
  private getAuthFromServer(url: string, data: any): Observable<boolean> {
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
}
