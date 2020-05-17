import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | Promise<boolean |  UrlTree> | Observable<boolean | UrlTree>  {
    return this.authService.userSubj.pipe(
      // use take 1 to make sure we subscribe the latest value and then unsubscribe,
      //because we dont care unless we run the guard again
      take(1),
      map(user => {
      // !!user converts a truthy/falsy value to a boolean (true in case of truthy, false in case of falsy)
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }),
    //isAuth because map returns if user is logged ou not; to avoid multiple redirects that may interfere with each other
    //use url tree instead
    /* tap(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/auth']);
      }
    }) */
    );
  }
}
