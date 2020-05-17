import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  // take only x (in this case 1) value of this observable and then automatically unsubscribe; we could also do not use pipe, and unsubscribe immediatly after subscribe
  // useful to get only one value
  // exhaustMap waits for the 1st observable to complete (when we get the user), thereafter, with this user data, return a new observable which replace the previous observable
  //in the observable chain
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userSubj.pipe(
      take(1),
      exhaustMap(user => {
        if(!user) { // we could also check url and only and Params to certain urls
          return next.handle(req);
        }
        const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.token)});
        return next.handle(modifiedRequest);

      }))
  }

}
