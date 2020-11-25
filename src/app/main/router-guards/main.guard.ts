import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { first, map, mapTo, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { RootActions, RootSelectors, RootState } from 'src/app/root-store';
import { User } from 'src/app/shared/models/firebase-collections/user';
import { URL_PATHS } from 'src/app/shared/models/constants/urlPathConstants';
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
    const loginError$ = this.store$.pipe(select(RootSelectors.SelectLoginErrorMessage));
    return combineLatest(storedUser$, loginError$).pipe(
      this.fetchUserIfNull(),
      first(([user, errorMessage]: [User, string]) => (user !== null || errorMessage !== '')),
      mapTo(true)
    );
  }

  private fetchUserIfNull() {
    return tap(([user, errorMessage]: [User, string]) => {
      if (user === null && errorMessage === '') {
        this.store$.dispatch(RootActions.GetUserDataFromSignedInUser.Request({ request: null }));
      }
    });
  }
}
