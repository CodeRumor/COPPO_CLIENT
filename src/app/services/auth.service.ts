import { HttpClient } from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import { Inject, Injectable, PLATFORM_ID} from "@angular/core";
import { TokenResponse } from "../interfaces/token.response";
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

export class AuthService{
  authKey: string = "auth";
  clientId: string = "Coppo";

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
  }

  // Sets authentication token to local storage.
  public setAuth(auth: TokenResponse | null){

    // if auth exists persist auth into localStorage or remove it if a NULL
    // argument is given.
    if(auth){
      localStorage.setItem( this.authKey, JSON.stringify(auth))
    }else{
      localStorage.removeItem(this.authKey);
    }

    return true;
  }

  public getAuthFromServer(url: string, data: any) : Observable<boolean>{
    return this.http.post<TokenResponse>(url, data)
      .pipe(map((res) => {

        let token = res && res.token;

        // if the token is there, login has been successful
        if (token) {
          // store username and jwt token
          this.setAuth(res);
          // successful login
          return true;
        }

        // failed login
        return false;
      }));
  }
}
