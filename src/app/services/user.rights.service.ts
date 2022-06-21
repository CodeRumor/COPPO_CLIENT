import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { UserStateService } from './user.state.service';

@Injectable({ providedIn: 'root' })
export class UserRightsService {
  AUTH_URL: string = 'http://localhost:8080/api/v1.0/Users/me/';
  state: any;
  constructor(
    private http: HttpClient,
    private userstateService: UserStateService
  ) {}

  public setUserInfor() {
    this.getUserInfor()
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.state = {};
          this.state.userName = res.userName;
          this.state.type = res.type;
          this.userstateService.setState(this.state);
          console.log(this.state);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  public getUserInfor(): Observable<[string, string]> {
    let userData: [string, string];

    return this.triggerLoggedInUser().pipe(
      map((data) => {
        userData = [data.username, data.usertype];

        return data;
      }),
      catchError((error) => {
        console.log(error);
        return new Observable<any>(error);
      })
    );
  }

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
