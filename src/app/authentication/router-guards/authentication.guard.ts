import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { URL_PATHS } from 'src/app/shared/models/urlPathConstants';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.userIsSignedIn().pipe(
      this.resolveAccessibility()
    );
  }

  private resolveAccessibility() {
    return map((isSignedIn: boolean) => {
      if (isSignedIn) {
        return this.routeToHomePage();
      } else {
        return true;
      }
    });
  }

  private routeToHomePage() {
    return this.router.parseUrl(URL_PATHS.home);
  }
}
