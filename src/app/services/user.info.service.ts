import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { COMMON } from '../common';
import { UserDetails } from '../interfaces/user.details';

@Injectable({ providedIn: 'root' })
export class UserInforService {
  AUTH_URL: string = 'http://localhost:8080/api/v1.0/Users/me/';
  state: any;
  constructor(private http: HttpClient) {}

  /**
   * Set user information into the state service to be accessed across the entire application.
   */
  public setCurrentUser() {
    this.getUserInfor()
      .pipe()
      .subscribe({
        next: (res: UserDetails) => {
          localStorage.setItem(COMMON.CURRENT_USER, JSON.stringify(res));
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  /**
   * get user information from the api.
   * @returns user information.
   */
  private getUserInfor(): Observable<UserDetails> {
    return this.triggerLoggedInUser().pipe(
      map((data: UserDetails) => {
        return { userName: data.userName, type: data.type };
      }),
      catchError((error) => {
        console.log(error);
        return new Observable<any>(error);
      })
    );
  }

  /**
   * Allows us to have access to the current user that has been logged into the application.
   * @returns the user information obtained from the api.
   */
  private triggerLoggedInUser(): Observable<any> {
    return this.http.get(this.AUTH_URL).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        console.log(error);
        return new Observable<any>(error);
      })
    );
  }
}
