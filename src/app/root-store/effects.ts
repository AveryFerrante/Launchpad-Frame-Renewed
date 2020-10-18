import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import * as AuthenticationActions from './actions';
import { map, catchError, exhaustMap, switchMap, mapTo, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/firebase-collections/user';
import { of, pipe, OperatorFunction, Observable } from 'rxjs';
import { UsernameService } from '../shared/services/username/username.service';
import { NewUserRequest } from '../shared/models/requests/NewUserRequest';
import { BatchActionOrchestrator } from '../shared/models/batchActionOrchestrator';
import { SignInRequest } from '../shared/models/requests/signInRequest';

@Injectable()
export class RootEffects {
  constructor(private actions$: Actions,
              private authenticationService: AuthenticationService,
              private usernameService: UsernameService) { }

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
    map((action) => action.request),
    this.fetchUser(),
    this.handleFetchUserOutcomes()
  ));

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
      const userRecordsCreation$ = this.orchestrateCreationOfNewUserRecords(user).pipe(mapTo(user));
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
    return exhaustMap((request: SignInRequest) => this.authenticationService.signInWithEmail(request));
  }

  private handleSignInUserOutcomes() {
    return pipe(
      map((userCredential: firebase.auth.UserCredential) =>
        AuthenticationActions.SignInWithEmail.RequestSuccess({ successResponse: userCredential })),
      catchError((error: Error) => of(AuthenticationActions.SignInWithEmail.RequestFailure({ failureResponse: error.message })))
    );
  }

  private fetchUser() {
    return mergeMap((userCredential: firebase.auth.UserCredential) =>
        this.authenticationService.getUserDocumentById(userCredential.user.uid));
  }

  private handleFetchUserOutcomes() {
    return pipe(
      map((user: User) => AuthenticationActions.GetUserAfterAuthentication.RequestSuccess({ successResponse: user })),
      catchError((error: Error) => of(AuthenticationActions.GetUserAfterAuthentication.RequestFailure({ failureResponse: error.message })))
    );
  }
}
