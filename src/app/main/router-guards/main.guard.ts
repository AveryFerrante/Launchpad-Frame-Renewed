import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, first, map, mapTo, mergeMap, tap } from 'rxjs/operators';
import { RootActions, RootSelectors, RootState } from 'src/app/root-store';
import { User } from 'src/app/shared/models/firebase-collections/user';
import { URL_PATHS } from 'src/app/shared/models/urlPathConstants';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router, private store$: Store<RootState>) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.userIsSignedIn().pipe(
      mergeMap((isSignedIn: boolean) => {
        if (isSignedIn) {
          return this.ensureUserDataIsInStore();
        } else {
          return of(this.router.parseUrl(URL_PATHS.authentication));
        }
      })
    );
  }

  private ensureUserDataIsInStore() {
    const storedUser$ = this.store$.pipe(select(RootSelectors.SelectAuthenticationUser));
    return storedUser$.pipe(
      this.fetchUserIfNull(),
      filter((user: User) => user !== null),
      mapTo(true),
    );
  }

  private fetchUserIfNull() {
    return tap((user: User) => {
      if (user === null) { this.store$.dispatch(RootActions.GetUserAfterAuthentication.Request({ request: null })); }
    });
  }
}
