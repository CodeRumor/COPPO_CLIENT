import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";


import {Injectable, Injector} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor{
  currentRequest?: HttpRequest<any>;
  auth?: AuthService;

  constructor(private injector: Injector, private router: Router){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth = this.injector.get(AuthService);
    const token = (this.auth.isLoggedIn()) ? this.auth.getAuth()!.token : null;

    if(token){

      this.currentRequest = request;

      return next.handle(request)
        .pipe(tap((event: HttpEvent<any>) => {
          if(event instanceof  HttpResponse){
            console.log("The event is part of Http response");
          }}))
        .pipe(catchError(error => {
          return new Observable<any>(error);
        }));
    }
    else
    {
      return next.handle(request);
    }
  }


  handleError(err: any){
    if(err instanceof HttpErrorResponse) {
      if (err.status === 401) {


        console.log("Token has expired try refreshing.....")
        this.auth?.refreshToken()
          .subscribe(res => {
            if (res) {
              console.log("refresh token successful");

              const http = this.injector.get(HttpClient);
              http.request(this.currentRequest!).subscribe(
                result => {
                  console.log("resubmitting the request");
                },
                error => {
                  console.log(error)
                }
              )
            } else {
              console.log("refresh token failed");
              this.auth?.logout();
              this.router.navigate(["login"]);
            }
          }, error => {
            console.log(error)
          })
      }
    }
    return new Observable<any>(err);
  }
}
