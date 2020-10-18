import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import * as AuthenticationActions from './actions';
import { map, catchError, exhaustMap, mapTo, mergeMap, filter, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/firebase-collections/user';
import { of, pipe, OperatorFunction, Observable } from 'rxjs';
import { UsernameService } from '../shared/services/username/username.service';
import { NewUserRequest } from '../shared/models/requests/NewUserRequest';
import { BatchActionOrchestrator } from '../shared/models/batchActionOrchestrator';
import { SignInRequest } from '../shared/models/requests/signInRequest';
import { Router } from '@angular/router';
import { URL_PATHS } from '../shared/models/urlPathConstants';

@Injectable()
export class RootEffects {
  constructor(private actions$: Actions,
              private authenticationService: AuthenticationService,
              private usernameService: UsernameService,
              private router: Router) { }

  signInWithEmail$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticationActions.SignInWithEmail.Request),
    map((action) => action.request),
    this.signInUser(),
    this.handleSignInUserOutcomes()
  ));

  createEmailUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticationActions.CreateEmailUser.Request),
    map((action) => action.request),
    this.createNewEmailUserFlow(),
    this.handleNewEmailUserFlowOutcomes()
  ));

  getUserAfterAuthentication$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticationActions.GetUserAfterAuthentication.Request),
    mergeMap(() => this.authenticationService.getCurrentSignedInUser()),
    this.fetchUser(),
    this.handleFetchUserOutcomes()
  ));

  navigateAfterAuthenticationComplete$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticationActions.CreateEmailUser.RequestSuccess, AuthenticationActions.SignInWithEmail.RequestSuccess),
    tap(() => this.router.navigateByUrl(URL_PATHS.home))
  ), { dispatch: false });

  private handleNewEmailUserFlowOutcomes() {
    return pipe(
      map((user: User) => AuthenticationActions.CreateEmailUser.RequestSuccess({ successResponse: user })),
      catchError((error: Error) => of(AuthenticationActions.CreateEmailUser.RequestFailure({ failureResponse: error.message })))
    );
  }

  private createNewEmailUserFlow() {
    return pipe(
      this.createNewUserFromEmail(),
      this.initializeNewUserRecords()
    );
  }

  private createNewUserFromEmail() {
    return exhaustMap((request: NewUserRequest) => this.authenticationService.createEmailUser(request));
  }

  private initializeNewUserRecords(): OperatorFunction<User, User> {
    return mergeMap((user: User) => {
      const userRecordsCreation$ = this.orchestrateCreationOfNewUserRecords(user);
      return this.mapObservableTo<User>(userRecordsCreation$, user);
    });
  }

  private orchestrateCreationOfNewUserRecords(user: User) {
    const batchOrchestrator = new BatchActionOrchestrator();
    batchOrchestrator.appendSetAction(this.authenticationService.getUserDocumentSetBatchAction(user));
    batchOrchestrator.appendSetAction(this.usernameService.getUsernameDocumentSetBatchAction(user.id, user.username));
    return batchOrchestrator.executeActions();
  }

  private mapObservableTo<T>(observable: Observable<any>, mapToValue: T) {
    return observable.pipe(mapTo(mapToValue));
  }

  private signInUser() {
    return exhaustMap((request: SignInRequest) => this.authenticationService.signInWithEmail(request).pipe(
      mergeMap(() => this.authenticationService.getCurrentSignedInUser().pipe(
        this.fetchUser()
      ))
    ));
  }

  private handleSignInUserOutcomes() {
    return pipe(
      map((user: User) =>
        AuthenticationActions.SignInWithEmail.RequestSuccess({ successResponse: user })),
      catchError((error: Error) => of(AuthenticationActions.SignInWithEmail.RequestFailure({ failureResponse: error.message })))
    );
  }

  private fetchUser() {
    return mergeMap((signedInUser: firebase.User) =>
        this.authenticationService.getUserDocumentById(signedInUser.uid));
  }

  private handleFetchUserOutcomes() {
    return pipe(
      map((user: User) => AuthenticationActions.GetUserAfterAuthentication.RequestSuccess({ successResponse: user })),
      catchError((error: Error) => of(AuthenticationActions.GetUserAfterAuthentication.RequestFailure({ failureResponse: error.message })))
    );
  }
}
